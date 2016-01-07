---
layout: post
title: "ShareLaTeX: Collaborative scientific typesetting"
author: David Renshaw
authorUrl: https://github.com/dwrensha
---

Today we are releasing our port of [ShareLaTeX](http://www.sharelatex.com), a real-time collaborative editor for typesetting scientific documents.

You can install it on your Sandstorm server now, or try it on [our demo server](https://demo.sandstorm.io).

LaTeX has long been a standard tool in the world of academic publishing, and we think that ShareLaTeX does a great job at making it more accessible and useful.

<p><a href="{{site.baseurl}}sharelatex-screenshot-big.png"><img src="{{site.baseurl}}sharelatex-screenshot.png"></a><br><span class="caption">Using ShareLaTeX in Sandstorm to typeset <a href="http://www.cs.cmu.edu/~rjsimmon/">Rob Simmons</a>'s <a href="https://github.com/robsimmons/thesis">PhD thesis</a>.</span></p>

We also think that, as an open source web app, ShareLaTeX makes a fascinating case study.

On the one hand, it's hard to imagine any of the giant internet corporations ever offering anything like it, as its potential user base is probably not large enough to merit their attention. On the other hand, within its niche ShareLaTeX addresses a very real need -- a need that's certainly large enough to merit the attention of small teams of indie developers.

ShareLaTeX illustrates some of the barriers faced by such developers. Its core functionality consists of an in-browser editor and a server-side compiler, but to be a viable product it has had to do a fair bit more than that. ShareLaTeX also implements a secure login system, an interface for managing multiple projects, and a sharing model. Moreover, there is the question of hosting.

The striking thing about our port of ShareLaTeX is that it simply bypasses this non-core functionality. Sandstorm already handles login, already has a file selection and organization interface for managing multiple projects, and already implements sharing. The main changes we made to the ShareLaTeX code -- and we did not in fact change very much at all --  were to remove these features and delegate their responsibilities to Sandstorm instead. 

Sandstorm, of course, also resolves the hosting question, making it easy for users to deploy ShareLaTeX to servers they control.

We take all of this as evidence that Sandstorm can eliminate many of the less-interesting and potentially costly parts of developing web apps. We hope that Sandstorm will enable developers to create many more apps like ShareLaTeX, catering to audiences of all sizes.