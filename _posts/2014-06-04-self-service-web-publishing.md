---
layout: post
title: Host Your Web Site
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Sandstorm now supports apps that publish content to your personal web domain,
such as blogging apps and content management systems.

While we already had an app that claimed to do this (the "Hacker CMS" app), it
previously required manual configuration of nginx to actually serve the content.
Users of alpha.sandstorm.io actually had to ask me to manually set things up.
But as of build 0.20, you can host your site in a completely self-service way.

To try it out, install the latest version of Hacker CMS from the
[app list](https://sandstorm.io/apps) and click the "Setup DNS" button. (If you
already have the app installed, install it again to get the latest version;
we're still working on automatic updates.)

Hacker CMS is still mostly a tech demo, and we'd like to replace it with ports
of some better-known blogging platforms. That said, our own blog at
blog.sandstorm.io is actually hosted using Hacker CMS.

Want to write your own app that does web publishing? Check out
[the wiki page](https://github.com/kentonv/sandstorm/wiki/Publishing-to-the-user's-domain)
to see how.

### Tool Improvements

We've been hard at work improving Sandstorm's developer experience. Some
highlights include:

* Your app's stdout/stderr output is now accessible via the web UI. Just click
  the wrench icon.
* A file size indicator is now shown in the top bar, so you can see if your app
  is using unreasonable disk space (*cough* MongoDB *cough*).
* [Jason Paryani](https://github.com/jparyani) has built preliminary support
  for e-mail, which he'll talk more about in a future update (once an app is ready).
* Many other small tweaks have been made to the `spk` tool.

### All Invites Sent

Everyone who was on the <a href="https://sandstorm.io/#signup-form">mailing list</a>
as of yesterday should have received an invite to alpha.sandstorm.io by now. Please
let me know if you are on the list but didn't receive one. Sorry it took so long!
We will continue sending invites to new sign-ups as long as we can handle the
server load.

### Follow Sandstorm on Twitter and Google+!

We are [@SandstormIO on Twitter](http://twitter.com/SandstormIO)
and [Sandstorm.io on Google+](https://plus.google.com/u/0/107599969974415778560/posts).
We want to keep the mailing list non-spammy, so follow us there for more frequent updates!