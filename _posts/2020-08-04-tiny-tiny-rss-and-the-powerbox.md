---
layout: post
title: "Updating Tiny Tiny RSS, Moving Sandstorm's Security Model Forward."
author: Ian Denhardt
authorUrl: https://github.com/zenhack
---

This past week I updated the Sandstorm package for Tiny Tiny RSS. In
addition to updating to the latest upstream code, I've also made some
improvements to the package's integration with Sandstorm. In particular:

- The package now uses Sandstorm's scheduling API (merged earlier this
  year) to check for updates periodically even when the user isn't
  actively using the app. This was a major pain point for some users,
  as it meant that if they didn't check their feeds often enough, they
  could miss articles.
- I've migrated the package away from using Sandstorm's deprecated
  HackSession interface for fetching feeds, and over to using the
  Powerbox.

The latter of these is important to enable Sandstorm's goal of full
network-isolation for applications. It has always been the intent that
apps running on a Sandstorm server should not be able to phone home or
otherwise access the network without the user's consent, but early on
the team implemented some temporary hacks that apps could make use of
until Sandstorm's Powerbox API was actually available. Now it is, so
it's time to migrate existing code away from these legacy APIs. Once
we've done that, we can remove the holes, and finally deliver on
Sandstorm's security promise of network isolation for server code.

In order to make this happen, I wrote [a daemon][1] that runs inside of
the grain, intercepting HTTP traffic and making powerbox requests for
access to the relevant hosts on-demand. The daemon is re-usable and
could be used as a quick way to port other existing apps that have
legitimate need to access a variety of different hosts at runtime,
which are not known in advance.

The daemon is exciting in that it can make basic porting of apps not
designed for Sandstorm much quicker, but the integration is imperfect: as
it stands, the user will see an extra prompt (or two) when first
subscribing to a feed. Maintaining security while avoiding annoying extra
prompts like this [is one of the design goals][2] of sandstorm's powerbox,
but to fully take advantage of it will require more invasive changes to
TTRSS; rather than prompting the user for a feed URL and then trying
to fetch it (causing the daemon to request access), it should just
ask Sandstorm for a feed directly. If you're an enterprising PHP
hacker and want to help make this happen, get in touch on the mailing
list or IRC.

[1]: https://github.com/zenhack/powerbox-http-proxy
[2]: https://sandstorm.io/news/2015-06-10-network-access-permission-android-vs-sandstorm
