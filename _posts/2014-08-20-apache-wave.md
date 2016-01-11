---
layout: post
title: "Apache Wave on Sandstorm"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

In an unspeakable act of technical necromancy, we've revived what was once [Google Wave](http://wave.google.com) and placed it on the [Sandstorm app list](https://sandstorm.io/apps/). You can install it now -- on your own Sandstorm server, or using [our demo](https://demo.sandstorm.io) -- and use it to... um... whatever it is that Wave is for. We're still trying to figure that out too. We're pretty sure it's amazing, though!

OK, joking aside&#8230;

Put simply, Wave is a collaborative document editor with inline, nestable comment threads. What do you use it for? Well, one thing I think it's great for is design discussions. Your root Wave is your design proposal. People can comment on individual parts, you can reply to those comments, and so on. It's easier to keep threads organized than in an e-mail discussion. For example, here's what a recent design discussion I had with security guru Jas Nagra might have looked like as a Wave:

<img src="https://sandstorm.io/apps/wave-big.png" alt="Wave screenshot" style="width: 800px;">

As you may recall, Google released Wave back in 2009 to great fanfare only to pull the plug on it just a year later, citing lackluster user growth. Whether that was the fault of the product itself or of a botched rollout and bad messaging is hard to say. In any case, Google was kind enough to release their code, and since then the folks over at Apache have been keeping development going as [Apache Wave](http://incubator.apache.org/wave/).

Apache has made sure that Wave keeps progressing. But, how exactly does one use Wave today? Well, a few people maintain [demo servers](http://incubator.apache.org/wave/demo-servers.html), but these are not meant for real use and have no reliability guarantees. Instead, if you really want to use Wave, you are supposed to set up your own server.

Now there's an easier option: Install it on Sandstorm.

Moreover, with our port, it's easier than ever to actually share a Wave with your friends. Normally with Apache Wave today, you must convince your friends to first create accounts on your Wave server so that you can then share with them. For our Sandstorm port, we've adapted Wave to rely on Sandstorm for sharing. What that means right now is that to share a wave with anyone, all you have to do is send them the URL. They don't even need to have a Sandstorm account. Sandstorm's sharing model will become more sophisticated in the future, but we consider it critical that sharing with anyone -- whether they have an account or not -- be as frictionless as possible.

We see companies shutting down useful apps all the time. Often, they offer users the opportunity to download their data as massive zip files full of useless XML. Wouldn't it be great if these companies could give you not just your data, but also the app, in a format that you could easily keep using? We hope that in the future, developers will decide that it makes more sense to convert their failed SaaS offerings into Sandstorm apps. This way, companies can cut their costs without leaving users out in the cold.

_If you want to see Sandstorm succeed, there are 12 days left to [contribute to the campaign](http://igg.me/at/sandstorm)._
