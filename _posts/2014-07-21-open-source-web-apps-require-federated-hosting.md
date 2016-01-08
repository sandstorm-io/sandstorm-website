---
layout: post
title: Open Source Web Apps Aren't Viable; Let's Fix That
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

### The Motivation for Sandstorm

We talk a lot about the need for privacy, security, and control of your cloud data. Let me let you in on a secret: These aren't the reason for Sandstorm. They are pleasant side effects.

The real motivation for Sandstorm is, and always has been, making it possible for open source and indie developers to build successful web apps.

In today's popular software-as-a-service model, indie development simply is not viable. People [do it anyway](http://indiewebcamp.com/), but their software is not accessible to the masses. In order for low-budget software to succeed, and in order for open source to make any sense at all, users must be able to run their own instances of the software, at no cost to the developer. We've always had that on desktop and mobile. When it comes to server-side apps, **hosting must be decentralized**.

But today, personal hosting is only accessible to those with the time, money, and expertise necessary to maintain a server. Even most techies don't bother, because it's a pain. Sandstorm exists to fix that, making personal hosting easily accessible to everyone.

<blockquote>"The only solution is to make sure everyone has a server where they can install any software they want."</blockquote>

### Open Source has worked on the desktop and mobile.

On my desktop, I run Debian Linux. My system is composed of several thousand packages. I have browsers, text editors, IDEs, chat clients, office suites, development tools, photo editors, and media players. Remarkably, every single one of these is open source. Even more remarkably, I can't remember the last time I felt any need to use a non-open-source desktop app.

I'm no zealot. I don't impose open source on myself, nor would I do so on others. I'll use proprietary software when it gets the job done, and I have spent plenty of time as a Windows user and as a Mac user in my past, but these days I'm simply happiest on a Linux system. That's my personal preference and it's not for everyone, but the fact that this choice is available to me and that I can run an all-open-source desktop without pain is pretty amazing considering how things looked fifteen years ago.

Even Windows and Mac users these days use lots of open source software. By some measures, a majority of people now use an open source browser. VLC, BitTorrent, and other "indie" open source desktop apps are widely used even among non-technical people. Mobile seems even more full of open source and low-budget indie apps, as the various mobile app stores make it extremely easy for small developers to reach large audiences.

Yet, somehow, the web today is nearly completely devoid of open source software. Every day I use apps like GMail, Facebook, Twitter, Feedly, and others. None of these are open source. Granted, these apps often run on open source _infrastructure_, but that's different. Most proprietary desktop apps use open source components and tools as well. But web _apps_, as the users see them, are almost invariably proprietary.

### Why are all my web apps proprietary?

Open source web apps exist. For example, webmail apps like SquirrelMail and RoundCube have been around for a while. If you look hard enough, you can find open source online document editors, RSS readers, and even a few social networks. But even among techies, hardly anyone seems to use these, probably because they all require running your own server, and few people have the time, patience, and expertise for that.

There are a few success stories. Wordpress is open source and widely-used for blogging. But this seems to be the exception rather than the rule. And it's questionable at that: most people who use Wordpress are not actually able to edit the code, because they are using it through a Wordpress hosting service and can only use the version of Wordpress that that host provides. Naturally, all hosts will likely only use the "official" version. So in practice, it's almost not really "open source" but "visible source" -- you can see the code and request changes, but you only get to use your changes if they're officially adopted.

### Why does no one use "indie" web apps?

Even on Windows, people commonly install little open source apps to get things done. Need to tag some mp3s? Want to connect to multiple chat networks with one client? Need to unpack a weird archive format? You'll probably use an open source app. Sometimes it's hard to build a business case around a niche purpose, yet little apps written by random people in their spare time are abundant. But on the web, it doesn't seem to work this way. Any significant service with a server-side component can really only be run by a funded corporation.

Let me describe a case in point: I know a certain prolific coder by the name of [Brad Fitzpatrick](http://en.wikipedia.org/wiki/Brad_Fitzpatrick). You may know him as the author of LiveJournal, Camlistore, memcache, OpenID, and other things. But I want to talk about a project of his you probably haven't heard of.

[scanningcabinet](https://github.com/bradfitz/scanningcabinet) is a little web app that helps you organize your paper mail. You drop your mail into your scanner, and the app scans it and uploads it to "the cloud", where you can access, label, and search it later. Brad wrote this on a weekend several years ago and threw the code up on github.

This app could be useful to just about anyone. But sadly, no one can really use it. To set it up, you have to configure a server (App Engine, in this case) and deploy the code to it. Even for someone like me, who knows how to do that, it's not something I really want to do.

By today's model, if Brad wanted to make this app accessible to the masses, he'd have to run it as a service. He'd have to build in multi-user support, make sure it's secure, deploy it, and monitor it. Worse, he'd have to pay for it, which means he'd have to monetize it, which probably means he'd have to start analyzing people's mail to build advertising profiles, or set up billing. Brad obviously doesn't want to do any of that.

And even if he did, who would use it? Do you want to upload your paper mail to servers run by some guy on the internet? I'm certainly not going to trust my personal data to any service that isn't at least backed by an identifiable organization with something to lose if it screws up.

### The problem is hosting.

By this point the problem is becoming clear: for open source software to make sense, the user has to be running their own instance. Software-as-a-Service and open source just don't make sense together. It's not really open source if you can't run modified code, and the high barrier to entry shuts out hobby projects or anything unwilling to be monetized.

The only solution is to make sure everyone has a server where they can install any software they want. They don't necessarily have to _administer_ that server -- it could be run by a friend, or a service -- but each user _must_ be able to install arbitrary software. And that software must be securely sandboxed to prevent buggy or malicious software from harming the rest of the server.

Today, this doesn't exist in any practical form. Servers require time and technical expertise to set up, while turnkey hosting services only allow you to run a fixed set of software.

**There is no place for open source web apps to run.**

### We're making decentralized hosting viable

Sandstorm is a web app hosting platform that enables non-technical end users to install and run arbitrary software. Apps may be downloaded from an app store and installed with one click, like installing apps on your phone. Each app server runs in a secure sandbox, where it cannot interfere with other apps without permission.

We talk a lot about privacy, security, and control, but to me these have always been pleasant side-effects of Sandstorm's model. My main motivation for starting this project has always been to enable open source software, hobby projects, niche applications, and indie developers. Even if each individual app in this category ultimately has a small impact compared to GMail or Facebook, the collective value lost by not giving these apps a platform is enormous. We need open source software to fill the niches that big companies aren't interested in, and to push the boundaries they find too risky. We need software that can be tweaked without permission to try new things without starting from scratch. It honestly seems absurd to me that we don't really have this on the web today.

### Help us get there

We've already come a long way. [We have a demo](https://demo.sandstorm.io/demo) that does most of what we're talking about already. But we're coming up on the limits of what we can self-fund. We can get Sandstorm into production, but we need your help.

Please check out our campaign on Indiegogo, and spread the word.

<a class="crowdfunding" href="http://igg.me/at/sandstorm">Fund us on Indiegogo &#187;</a>
