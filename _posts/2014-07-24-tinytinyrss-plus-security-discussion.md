---
layout: post
title: We now have an RSS reader; plus let's talk about security
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Have you ever wished for an RSS reader that won't simply [disappear](http://reader.google.com) if the developers get tired of it?

Today, we're releasing our port of [TinyTinyRSS](http://tt-rss.org/) to Sandstorm. Go install it on your Sandstorm server now, or [try the Sandstorm demo](https://demo.sandstorm.io).

Unlike traditional web apps, Sandstorm apps can never "disappear", because they run on _your_ server rather than on the developer's. Even if the developer stops supporting the app, you still have a copy that will keep working.

You might say: "But what about security updates?" Good question! Let's talk about security.

### What happens if an app has security bugs?

It turns out Sandstorm apps are automatically much more secure than on traditional servers. Much of your security is handled by the platform, without the app's involvement. In many cases, even an app that has known security flaws is perfectly safe to run in Sandstorm.

For starters, Sandstorm handles login and authentication, so automatically one of the biggest potential vulnerabilities is gone. There is no way someone can exploit a vulnerability in the app to "log in" to your account, and the app never has access to your password or session keys and therefore cannot leak them.

Moreover, attacks in which the attacker "tricks" your browser into performing some action on an app (with your credentials) are largely mitigated as well, because the attacker has no way to know your app's address. Sandstorm assigns apps to hostnames on a temporary, per-session basis. When you don't have your app open, it doesn't even have a hostname. These hostnames are not displayed to the user, and we're working on a change to make them cryptographically unguessable. If the attacker does not know your app's hostname, they cannot launch CSRF attacks and many kinds of XSS attacks are thwarted as well.

The only remaining way to attack your app is by getting data into it by some other means. What this means depends on the app.

Imagine a document editor like Etherpad. This app never talks to the outside world at all. The only way an attacker can even talk to it (the first step in exploiting it) is by convincing you to explicitly share the document with them.

For an app like TinyTinyRSS, there's another opening: the app requests RSS feeds from the internet and parses them. Hypothetically, a bug in the feed parser or in the way feeds are rendered in the UI could make the app vulnerable. In order to exploit such a vulnerability, an attacker would have to trick you into signing up for their malicious RSS feed.

But even in the worst case in these two examples, the damage is small, because Sandstorm itself isolates each app in a separate sandbox. Even if an app is exploited, the attacker only gets access to that app -- and only the particular _instance_ of that app.

In the case of Etherpad, we create a separate sandbox for every document. So, if an attacker exploits a document, they only get access to that document. And as mentioned above, there's no way for an attacker to exploit Etherpad without first receiving a share from the document owner. And if the document has already been shared with the attacker, they already have the whole contents, so what's left to exploit? They can't use that exploit to get access to any _other_ document, because each document is in its own sandbox.

In the case of TinyTinyRSS, if an attacker exploited an RSS parsing bug, they might get access to the TinyTinyRSS instance. This means they'd be able to see your other feeds, and could perhaps change your subscriptions. That's it. For most people this is probably not a big deal. It's a problem, but it's nothing like having your password stolen or e-mail erased. And if you actually have a super-secret feed that you want no one to know about, you can protect yourself by having two separate TinyTinyRSS instances: one for your common feeds and one for the sensitive-but-trusted ones. If you accidentally sign up for an evil feed, you'll probably put it in the first instance, and thus the sensitive instance is still protected. (Again, this is all hypothetical; we know of no such vulnerability.)

This is what we call the "principle of least authority": Each app only has the "authority" to do its job, and thus a vulnerability in one app can only do as much damage as the app's authority allows. On traditional desktop systems with no sandboxing, a security bug in one app could completely expose your entire system to hackers. On the web today, a security vulnerability in one app might expose your password, thus giving attackers access to any other app where you use that password. On Sandstorm, a security bug in one app only harms that app and things to which it is connected.

Of course, the above discussion is about apps. A bug in Sandstorm itself could be much more devastating. But that's a smaller attack surface, and we have multiple security experts working with us. Security bugs are always possible in any code, but the less code you rely on not to have bugs, the less likely it is that one will harm you.