---
layout: post
title: "Announcing the release of vagrant-spk 1.0"
author: Jacob Weisz
authorUrl: https://github.com/ocdtrekkie
---

Hello! I'm Jacob Weisz, a member of the Sandstorm community, a long-time contributor, and the new maintainer of the vagrant-spk tool. I'm thrilled to announce the [1.0 release of vagrant-spk][1].

## What's vagrant-spk?

vagrant-spk is the premier tool for packaging Sandstorm apps. Unlike the spk tool built into Sandstorm, vagrant-spk creates a virtual environment within which to build your app. This provides a reasonable measure of reproducibility and maintainability, along with default templates (or "stacks") of common configurations apps likely need to run.

## What's new?

- All vagrant-spk stacks now work correctly with the Debian Stretch box we've currently standardized on. Most recently this includes reworked support for Node.
- A new `upgradevm` feature has been added to make it easy to move to the latest Vagrantfile and global-setup file supported by vagrant-spk. Along with this we've improved detection for broken configurations.
- We've changed vagrant-spk to use port 6090 so that it no longer conflicts with local Sandstorm installs using default ports. You can use `upgradevm` to switch your package to this.
- The enter-grain feature, which has been broken for a long time, has now been fixed thanks to Adam Bliss and Ian Denhardt.

## Why go to 1.0 now?

Historically, vagrant-spk was frequently released alongside Sandstorm releases and was regularly dependent on those Sandstorm releases for functionality. At the time, the convention was to release vagrant-spk with versioning complimentary to Sandstorm releases. 

However, times have changed. vagrant-spk improvements are rarely strongly correlated with Sandstorm releases, and of course, both Sandstorm and vagrant-spk releases are less frequent in nature. 

vagrant-spk is also now a mature tool, having been used to package a large portion of Sandstorm apps. The natural progression at this time is to move from 0.236 to 1.0. This release is fairly small because the priority for 1.0 is to deliver a polished, stable release that we can then iterate upon. 

## The future of vagrant-spk

We have a list of improvements and features we are beginning to think about for vagrant-spk's future. As part of renewed community efforts to [revive the Sandstorm project][2], we are planning a regular cadence of releases for vagrant-spk. We have already begun designating goals for [vagrant-spk 1.1][3], which we'd like to deliver later this year.

[1]: https://github.com/sandstorm-io/vagrant-spk/releases/tag/v1.0
[2]: https://sandstorm.io/news/2020-02-03-reviving-sandstorm
[3]: https://github.com/sandstorm-io/vagrant-spk/milestone/4
