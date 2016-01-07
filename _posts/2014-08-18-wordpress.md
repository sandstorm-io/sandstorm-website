---
layout: post
title: "WordPress on Sandstorm"
author: David Renshaw
authorUrl: https://github.com/dwrensha
---

WordPress is the world's [most](http://trends.builtwith.com/cms) [popular](http://w3techs.com/technologies/overview/content_management/all/) web publishing platform, and we are excited to announce today that we've ported it to Sandstorm.

You can try it now in the [demo](https://demo.sandstorm.io) or on your personal Sandstorm server.

Like the existing [HackerCMS](/news/2014-06-04-self-service-web-publishing.html) and [Ghost](/news/2014-07-22-ghost.html) apps, WordPress on Sandstorm lets you publish content to a custom domain. You can use it to create all kinds of web sites, including blogs, magazines, and webcomics. WordPress has an enormous ecosystem of themes and plugins, and our port grants you the power to install any of them and to modify them through the built-in editor.

Moreover, the app's integration with Sandstorm's login system makes it easy to collaborate with multiple authors; you can add new authors simply by sharing a link.

<a href="https://sandstorm.io/apps/wordpress1-big.png"><img alt="WordPress Screenshot" src="https://sandstorm.io/apps/wordpress1.png"></a>

<a href="https://sandstorm.io/apps/wordpress2-big.png"><img alt="WordPress Screenshot" src="https://sandstorm.io/apps/wordpress2.png"></a>

A few features of WordPress require us to make more progress on Sandstorm before we can support them. We would like to allow the app to make remote HTTP requests -- a feature that would simplify the process of installing add-ons and importing media content -- but we also want to tightly control that capability, so that an evil plugin can't leak data. This will require the Powerbox. We would also like to integrate WordPress's comment system with SandStorm's web publishing, but before that's possible Sandstorm apps need to be able to export public HTTP APIs.

Fortunately, these are things we'd like to add to Sandstorm anyway. And, of course, the more help we get from you in our [crowdfunding campaign](http://igg.me/at/sandstorm), the sooner we will be able to add them.

In any case, we think that among WordPress hosting options, WordPress on Sandstorm offers a uniquely high degree of convenience, freedom, and [security](/news/2014-07-24-tinytinyrss-plus-security-discussion.html).
