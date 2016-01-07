---
layout: post
title: "Remotely send Chrome and Node.js into infinite loops via this one weird OSX kernel bug"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

A few months ago I discovered a security bug in the Darwin kernel used by most Apple products. The bug could allow an attacker to trivially remotely DoS a variety of network services and apps, from Node.js to Chrome. Today, [Apple released a patch](https://support.apple.com/en-us/HT204659) (look for CVE-2015-1105), so now I can tell you about it.

Now, just to be clear, I'm no [Adam Langley](https://www.imperialviolet.org/). This bug is "just" a DoS, nothing like a Heartbleed or a Shellshock. The worst it can do is allow an attacker to cause a temporary service disruption. But I think all security bugs deserve a writeup so that we can learn from them, and Apple's terse description of the problem doesn't accomplish this. Also, it's a fun story.

I discovered the problem while doing research on the different interfaces that various operating systems provide for doing event-driven I/O -- that is, how you tell the platform: "Here are all my open connections; wake me up when one of them receives a message." It turns out that every OS does this differently. Linux has `epoll`. BSD has `kqueue`. Windows has... well, about five different mechanisms that cover differing subsets of usecases and you can only choose one. In any case, I was trying to build an abstraction layer over these for [Cap'n Proto](https://capnproto.org), so I wanted to make sure I understood them all.

I noticed a curious thing: some man pages discussed an event called "out-of-band data" while others didn't. "Out-of-band data" (OOB), also known as "urgent data", is a little-used feature of TCP connections that essentially allows you to send a byte that "jumps the queue" so that the receiving app can receive it before receiving other data sent before it. You probably didn't know about this, because basically no one uses this feature -- except for Telnet, which needs a way to signal that you pressed "ctrl+C" when the destination app is not otherwise processing input.

With almost all event notification APIs, regular data and OOB data raise different kinds of events. For example, `poll()` (and its successor on Linux, `epoll`) has `POLLIN` for regular data and `POLLPRI` for OOB. This way, if your app does not expect to receive OOB data, it simply doesn't ask to be notified about that type of event, and the kernel happily discards it for you (or maybe inserts it into the regular stream, which is fine).

Curiously, the BSD `kqueue` docs are unclear on how OOB data is handled. [FreeBSD's `kqueue`](https://www.freebsd.org/cgi/man.cgi?query=kqueue&sektion=2) makes no mention of it, and as far as I've been able to determine it simply doesn't support notification of OOB events at all. [DragonflyBSD's `kqueue`](http://leaf.dragonflybsd.org/cgi/web-man?command=kqueue&section=2) defines an `EVFILT_EXCEPT` event type.

[Darwin's (OSX/iOS) `kqueue`](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man2/kqueue.2.html) also doesn't mention OOB data, but some Googling revealed an undocumented "feature": on OOB data, Darwin will raise a regular `EVFILT_READ` event (which normally indicates that regular in-band data was received) but set the special flag `EV_OOBAND` on the event structure.

Of course, if you aren't _expecting_ OOB data, you're not going to check for that flag. So when you receive `EVFILT_READ`, you're going to believe you've received regular data. And you're going to do a `recv()` call to read that data, and there isn't going to be any. And then you're going to say "oh well" and return to the event loop. But if you are using `kqueue()` in level-triggered mode (as most people do, because it's easier), then the operating system is going to see that the OOB data is still there, and is going to give you _the exact same event again_.

So you go into an infinite loop.

**Wait, doesn't that mean almost all event-driven OSX network apps will go into an infinite loop if they receive a single TCP packet with the urgent bit set?**

I didn't think that could possibly be true at first, so I fired up a Mac machine to try it. Sure enough:

* When Google Chrome visited an HTTP server that sent back an OOB byte, the whole app (not just the tab, but everything) locked up and had to be force-quit. It turns out Chrome does all networking from the main process, so the per-tab process separation did not help. ([Chromium issue 437642](https://code.google.com/p/chromium/issues/detail?id=437642) -- currently still locked down as a security issue)

* When a [Node.js](https://nodejs.org) server received an OOB byte from a client, the server would go into an infinite loop and stop handling other connections. ([fixed in this commit](https://github.com/libuv/libuv/commit/e19089f7b14800d3f9bd74d9699e841e4b61a36d))

On the other hand, my third test case -- [nginx](http://nginx.org) -- was not affected, because it uses kqueue in edge-triggered mode, and therefore it only receives the unexpected event when new data arrives rather than any time data is available -- i.e. once rather than infinity times. But two of three is a pretty worrisome hit rate, especially when these are some very big names.

Arguably the worst / most interesting part of this problem is that it was a problem inherent in the API. Technically it was not that the kernel was buggy, but that the interface was confusing (and underdocumented) in a way that caused the same bug to manifest in several different apps. Fixing the problem either required fixing every app (and being ever-vigilant in the future), or changing the API and _breaking_ any existing app that depended on the behavior (of which there appears to be a few).

To Apple's credit, they did what I think is the right thing: they changed the interface so that it no longer reports `EVFILT_READ` events on TCP OOB data. I do not quite understand their description of this problem as a "state inconsistency issue", but my tests confirm that OOB data is now ignored.

The moral of the story? **Confusing APIs are a security problem. If many users of your API get it wrong in a way that introduces a security bug, that's a bug in your API, not their code.**
