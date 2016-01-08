---
layout: post
title: How Sandstorm works on mobile; plus app updates
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Today we have a few announcements regarding Sandstorm and mobile.

First, we've updated Sandstorm's web interface to be mobile-friendly. Whereas
before the UI was mostly unusable on mobile, now you should be able to get
around reasonably well. Not all of our apps are optimized for mobile, but at
least now that the Sandstorm shell works well, apps can follow.

<div style="background-color: #ddd; padding: 10px;"><img src="https://sandstorm.io/mobile1.png" style="width: 48%">&nbsp;<img src="https://sandstorm.io/mobile2.png" style="width: 48%; float:right;"></div>

Second, we've implement the ability for applications to export HTTP-based APIs,
which among other things can be used to allow a mobile client application to
access a Sandstorm-based server. To learn how to make your own application
export an API, check out [the documentation](https://github.com/sandstorm-io/sandstorm/wiki/Exporting-HTTP-APIs).

### TinyTinyRSS Android app

As an example of the new functionality, we've updated our port of TinyTinyRSS
to support an Android client. Install the latest version of the TinyTinyRSS app
and check out the preferences to learn more!

### Telescope

We've ported [Telescope](http://telesc.pe) -- a Reddit / Hacker News clone --
to Sandstorm; find it in the Sandstorm app list now. Being a Meteor app,
Telescope was, of course, easy to port using
[meteor-spk](https://github.com/sandstorm-io/meteor-spk).

We are using Telescope to power the Sandstorm app committee voting app, where
those people who purchased seats on the app committee during our Indiegogo
campaign have been voting on the next apps for us to port. So far, they have
chosen Gitlab and Diaspora.

<img src="https://sandstorm.io/gitlab-diaspora.png" style="width: 100%">

Want to follow the action? Visit the
[app committee group](https://groups.google.com/group/sandstorm-app-committee).

### Groovebasin Update

We've updated the Groovebasin app to allow batch uploads of multiple songs.
(This was previously disabled due to a limitation in Sandstorm, which we've
now fixed.) Re-install Groovebasin from the Sandstorm app list to get the
update. Now you can upload your whole music library more easily!
