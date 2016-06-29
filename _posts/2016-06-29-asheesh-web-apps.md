---
layout: post
title: "Upcoming Event: Web app packaging in Sandstorm: It's not LAMP"
author: Nena Nguyen
authorUrl: https://github.com/neynah
---

On July 19th, Sandstorm core dev [Asheesh Larioa](https://github.com/paulproteus) will be giving a talk about web packaging at our South Bay Sandstorm meetup.

<img src="/news/images/asheesh-profile.jpg">

**Talk details**

This talk covers how web app packaging works for Sandstorm.io. Asheesh will compare and contrast Sandstorm packaging against the typical install process on a Linux/Apache/MySQL/PHP system. This talk was featured at [Debconf16](https://debconf16.debconf.org/talks/84/), the yearly Debian conference.

He will outline how Sandstorm's packaging tools do a few strange things to allow unprivileged users to install apps with one click:

• Every app package is a tiny Debian derivative, often as small as 20MB.

• Apps have no Internet connectivity to the outside world.

• Sandstorm uses a FUSE filesystem to identify which files are needed to run the app.

• An app bundles all its needed services, as well as files, resulting in one MySQL service per app.

• Users click and run one instance of an app like Etherpad per document, which is all handled transparently via a web app, a strategy that has neutralized 95% of 0-day web app vulnerabilities, based on our analysis.

• Developers on Mac OS and Windows can create packages for Sandstorm, even though Sandstorm is Linux-only, due to an emphasis on Linux VMs in our development tools.

Somehow we manage to make this scale reasonably well. Additionally, it is popular with upstream authors: of the >58 web apps packaged for Sandstorm, about 1/3 are maintained by their upstreams.

This talk focuses on how the Sandstorm packaging tools work, with community insights as well as technical ones, with the hopes of showing Debian how to more effectively package web apps for end users.

Come for the opportunity to meet others in the Sandstorm community, and work on your project with guidance from our core devs. This event will be held at RethinkDB in Mountain View on July 19. RSVP [here](http://www.meetup.com/Sandstorm-SF-Bay-Area/events/231954146/).