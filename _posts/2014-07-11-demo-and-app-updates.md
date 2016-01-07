---
layout: post
title: Demo box; App updates
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

A few quick updates today.

### New Demo server

It's now possible to try out Sandstorm without an invite, and without installing
it locally. Just go to [demo.sandstorm.io](https://demo.sandstorm.io/demo).

On the demo server, anyone can create a one-hour trial account. We hope that
this will make it much easier for people to understand what Sandstorm does,
before they install it or wait in line for an invite. If a picture
is worth a thousand words, a demo is worth ten thousand.

### App updates

We've posted updates to several apps with bug fixes and other improvements.
Currently, in order to update an app, you must re-install it from the
[app list](https://sandstorm.io/apps). (Push updates for apps are on our
todo list.) So, if you've installed any of the following, install them again.

* **Mailpile:** Fixed bug where sent mail sometimes wasn't saved.
* **IPython Notebook:** Added numpy and plotting packages, so you can now plot graphs.
* **Etherpad:** Minor UI tweaks.

### New features and fixes

* We've added a "reset" button to the top bar, which lets you restart an app
  if it somehow gets wedged. This is rare, but otherwise really annoying when
  it happens.
* Apps now receive the user's display name and a unique stable identifier,
  which are useful for collaborative apps meant to be used by more than one
  user.
* We fixed a crash that happened when updating a Sandstorm instance that runs
  as non-root, and tightened some security knobs in this mode.

### License is now Apache 2.0

Several people told us they were not comfortable contributing to Sandstorm
when licensed under the GNU AGPL, or that their employers were hesitant to
allow them to contribute. We think this is entirely understandable. We have
always intended to switch to Apache 2.0 after gaining some momentum (which is
why we have asked contributors to sign a CLA allowing us to make this change).
So, we've gone ahead and made the switch now.
