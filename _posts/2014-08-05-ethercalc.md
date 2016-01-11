---
layout: post
title: "EtherCalc: Online spreadsheets"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Today's release is a pleasant surprise even to us. Last week, a Sandstorm
fan, [Jake Weisz](https://plus.google.com/+JakeWeisz), e-mailed me out of the
blue to tell me he had ported [EtherCalc](http://ethercalc.net), an online
collaborative spreadsheet editor, to Sandstorm.

I hadn't heard of EtherCalc before, but Jake included a link to a spreadsheet
running on our own alpha server, so I was able to try it out immediately, and
I was impressed. Sure enough, it's a spreadsheet editor, it does the things
you expect spreadsheets to do, it supports real-time collaboration, and it's
Free Software.

![screenshot](https://sandstorm.io/apps/ethercalc.png)

Jake professes to have had no idea what he was doing. "I have never even seen
Node.js before, I don't even know JavaScript, and I have only a passing
familiarity with using Linux." Yet, by just following the
[porting guide](https://github.com/sandstorm-io/sandstorm/wiki/Porting-Guide),
he managed to port an app. Jake attributes this to EtherCalc's simple and
elegant design: "The way it was already designed, it was incredibly easy to
port to Sandstorm. I think I changed three or four lines of code tops to
get it working."

Speaking of EtherCalc's design, developer [Audrey Tang](http://en.wikipedia.org/wiki/Audrey_Tang)
has written a long and fascinating history of EtherCalc (and its previous
iterations, WikiCalc and SocialCalc) for the book series
[_The Architecture of Open Source Applications_](http://aosabook.org/). These
chapters have also been reproduced on [EtherCalc's web site](http://ethercalc.net/).
Check it out!

Meanwhile, Jake's port is on the Sandstorm app list now. As always, you can
install it on your Sansdtorm server, or [try the demo](https://demo.sandstorm.io).