---
layout: post
title: New team members; security improvements; backup/restore
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

We have a bunch of updates for you today.

### Lots of apps coming!

We've ported a number of interesting apps to Sandstorm and will begin releasing
them within the next few days. First up will be
<a href="https://www.mailpile.is">Mailpile</a> -- yes, e-mail in Sandstorm!
Expect a full announcement on Monday, and other app announcements over the
following days and weeks.

### Team updates

The Sandstorm team is no longer just me. I'd like to introduce all the new
faces that you now see on our front page:

* [**Jason Paryani**](https://github.com/jparyani), the author of Cap'n Proto's
  [Python port](https://github.com/jparyani/pycapnp), has been working
  on features like backup/restore, e-mail, improved sharing/permissions, and
  porting a number of exciting apps.
* [**David Renshaw**](https://github.com/dwrensha), the author of the
  [Rust](https://github.com/dwrensha/capnproto-rust)
  and [Java](https://github.com/dwrensha/capnproto-java) ports of Cap'n Proto, is
  now joining the team as well. He's written a couple games that you can find on
  the app list (Duolodo and Acronymy) and is working on ports of
  [ShareLaTeX](https://www.sharelatex.com/) and other apps.
* [**Jade Wang**](https://github.com/jadeqwang) has been working part-time on
  developer outreach and operations. She organized our recent app hackathon
  and other things you'll be hearing about soon.

We also have a couple of key advisors. These guys are contributing advice, resouces,
and the occasional patch in their spare time; Sandstorm is not affiliated with
their respective employers.

* [**Andy Lutomirski**](https://github.com/amluto) is a Linux kernel developer
  and has been helping us take better advantage of the kernel's sandboxing features.
* [**Brian Swetland**](https://github.com/swetland) spent nine years as
  Android's Systems Engineering lead and has been advising us on platform design.

### Backup / Restore functionality

Jason has implemented the ability to back up
and restore grains (app instances) from you Sandstorm server. Just click the
new download icon on the top bar when viewing a grain. You will get a zip file
containing the grain's storage, which you can re-upload to the server (or to a
different server) later on.

### Security: No need for root

Sandstorm can now be installed and run without root privileges or setuid
binaries. To accomplish this, we use Linux's "UID namespaces" feature, which
essentially allows other sandboxing features to be accessed by an unprivileged user.

Unfortunately, if you are developing Sandstorm apps, it is still necessary to
install Sandstorm with root privileges because the dev tools rely on FUSE and
FUSE filesystems cannot currently be mounted inside UID namespaces. We hope the
Linux kernel will eventually add this feature.

Due to the use of UID namespaces, Sandstorm now requires Linux kernel version
3.13 or better. The installer will verify that you are ready to run Sandstorm.

Thanks to Andy for contributing much of the work on this.

### Seccomp-BPF Sandboxing

We've now enabled a basic seccomp filter to disable some dangerous system calls.
Seccomp is a Linux feature that makes sandboxing more secure by disabling system
calls (OS features) that apps don't need. A typical web server uses only a tiny
fraction of Linux's system calls. By disabling the rest, we make sure that if a
kernel exploit is found in one of them, it won't allow an app to escape its
sandbox.

For now, we've disabled a few calls that provide complicated functionality that
has been the subjects of vulnerabilities in the past, and that no web server
rightly needs. We plan to expand on this in the future, eventually implementing
a small whitelist and probably moving many system calls to userspace. All of
this will be totally transparent to apps.

Again, thanks to Andy for getting this started.

### LWN Coverage

Linux Weekly News [wrote about Sandstorm](http://lwn.net/Articles/603485/) last week!
