---
layout: post
title: Easy Install; New Apps
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

It's been nearly a month since Sandstorm launched, and we've been busy.  Here's
what's new!

### Easily run your own instance

When Sandstorm launched, some people thought it odd that our message of freedom
from other people's servers was followed by an invitation to use ours.  To
clear the air a bit, we've now made it ridiculously easy to install your own
Sandstorm server on your very own Linux machine:

    curl https://install.sandstorm.io | bash

Follow the on-screen directions and you'll be up and running in seconds.  No
need to build code nor edit config files.  In fact, your Sandstorm installation
will even (if you choose) automatically keep itself updated, so you never
have to deal with it again.  (Of course, you can still get the
[full source code on Github](https://github.com/kentonv/sandstorm) if you prefer.)

Of course, not everybody has a Linux server lying around, or wants their cloud
apps hosted off their home internet connection, or wants to pay the typical
$50/mo for a cloud VM instance powerful enough to run Sandstorm well.  That's
why we also want to offer managed instances that don't require any of that.

To be clear: when you use our server, **you are still in control**.  You can
upload any app you want.  We do not serve ads, and we will not mine your data.
We let you move your data from our servers to your own at any time.  It's like
having your own VM on AWS except without the config files and the updating and
the security issues.

Eventually, we plan to charge a small fee for managed instances as a way to
cover our upstream hosting costs and fund development.  But, for our early
alpha testers, the service is free.

### Invites rolling out

Speaking of using our servers&hellip;

Despite the limited scope of our initial announcement, we ended up with an
order of magnitude more people on our waiting list than we anticipated.  If you
signed up and haven't received an invite -- alas, that's most of you -- I
apologize!

We have not yet implemented the ability for Sandstorm to scale to multiple
machines.  However, we recently increased the capacity of our main machine
such that we should be able to invite a lot more people, and we'll get to work
on multi-machine scaling soon.  Be sure to
[get on the mailing list](https://sandstorm.io/#signup-form) if you want an
invite -- or just want to stay updated.

### New Apps

Some awesome contributors have written/ported a few new Sandstorm apps:

* [Jason Paryani](https://github.com/jparyani) ported the
  [IPython Notebook](http://ipython.org/notebook.html), a powerful app that
  lets you execute Python code from your browser, render equations and charts,
  and more.
* [David Renshaw](https://github.com/dwrensha) has written a little original
  game called Acronymy. Interestingly, he wrote
  [his code](https://github.com/dwrensha/acronymy) in pure
  [Rust](http://www.rust-lang.org/), using Sandstorm's low-level
  [Cap'n Proto](https://capnproto.org)-based
  API directly, thus avoiding the need for an HTTP server.
* [Sing Li](https://github.com/Sing-Li) is working on a port of
  [Ghost](http://ghost.org), the beautifully-designed open source blogging
  platform.  It's not quite ready for public consumption, but the test version
  I tried is looking pretty good.

Install these and other apps to your Sandstorm instance from
[the app list](https://sandstorm.io/apps).

Porting apps is still a somewhat weird and ad hoc process. Usually the code
doesn't need to change much, but figuring out the app's dependencies for
packaging purposes takes some sleuthing. We're working on better tools which
will make this process much easier; stay tuned.
