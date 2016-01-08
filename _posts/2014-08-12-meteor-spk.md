---
layout: post
title: "Porting Meteor apps to Sandstorm in three minutes"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

As you know, Sandstorm apps can be written using any tech stack that runs on Linux. We have apps written in PHP, Python, Node.js, C++, Go, and even Rust.

But if you're starting from scratch and need to choose, the easiest way to write a Sandstorm app today is using [Meteor](https://www.meteor.com). Meteor is a modern open source web framework that makes it ridiculously easy to build high-quality, low-latency, real-time web apps quickly. Sandstorm's own front-end is built on Meteor.

I recently gave a lightning talk at [Meteor Devshop](https://devshop.meteor.com) where I demonstrated porting a Meteor app to Sandstorm. The app I chose was written by independent developers with no intent to target our platform. As you'll see, it took me under three minutes to port live on stage:

*Note: The video shows the process for older versions of Meteor, in which packages had to be installed with the separate tool Meteorite (`mrt`). This blog post has since been updated for Meteor 0.9.x, which has its own built-in package repository.*

<div><iframe class="youtube" src="//www.youtube.com/embed/mJpYHhqByUo" frameborder="0" allowfullscreen="true"> </iframe></div>

When it comes to writing a Sandstorm app, Meteor works particularly well as a platform because it tends to produce self-contained apps. Meteor's tools already know how to construct a "bundle" containing all of the app's dependencies. From there, we just need to add Node and Mongo, and we have ourselves a Sandstorm package. We don't even need to use [our trick to automatically detect dependencies](2014-05-12-easy-port.html).

To make this even easier, we've written a tool called [`meteor-spk`](https://sandstorm.io/meteor-spk) which automates this. We've also published a Meteor package [`kenton:accounts-sandstorm`](https://atmospherejs.com/kenton/accounts-sandstorm) which integrates Meteor's accounts system with Sandstorm's unified login. Together, these mean that porting a Meteor app to Sandstorm usually involves three commands:

    meteor add kenton:accounts-sandstorm
    meteor-spk init
    meteor-spk pack myapp.spk

Our intrepid fan [Jake Weisz](https://plus.google.com/+JakeWeisz) -- who previously [contributed a port of EtherCalc](2014-08-05-ethercalc.html) -- has used this tool to port [Meteor Blocks](https://github.com/stubailo/meteor-blocks), a simple voxel-based model editor written using Meteor. You can find it on the Sandstorm app list now -- [try the demo](https://demo.sandstorm.io) if you don't already have your own server.

![Meteor-blocks screenshot](https://sandstorm.io/apps/meteor-blocks.png)

We hope to see tools like this developed for other frameworks in the future. `meteor-spk` is just a simple bash script wrapping Sandstorm's `spk` tool and providing a dependency bundle to merge into the package. If you'd like to contribute a similar script for your own favorite framework, [let us know](https://groups.google.com/group/sandstorm-dev)!

*Disclosure: Jade Wang, a member of the Sandstorm project, also works for Meteor, but Sandstorm and Meteor are not affiliated.*
