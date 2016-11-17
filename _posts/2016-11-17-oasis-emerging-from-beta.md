---
layout: post
title: "Sandstorm Oasis emerging from beta"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Sandstorm is about making it easy to run a personal server. But we also offer [Sandstorm Oasis](https://oasis.sandstorm.io), a service which runs your Sandstorm server for you.

Contradiction?

Actually, no: Even if you run your own server, Oasis benefits you. Oasis is important because it makes it possible for anyone to use [Sandstorm's library of open source apps](https://apps.sandstorm.io), even if they really don't want to run their own server. A larger audience means that more and better apps will become available. Indeed, after we launched Oasis last year, the rate of new apps becoming available on Sandstorm spiked.

That benefits self-hosters, because those same apps can be used on your private server, too.

In fact, we at Sandstorm don't necessarily think "the cloud" is a bad idea. What we believe is that you should have the freedom to choose what makes sense for you. But that choice is moot if the particular app you need to use is only available in the cloud -- we need the same apps to be available everywhere.

Oasis has now been running reliably for over a year. The Sandstorm team uses Oasis every day to get our own work done. I am composing this blog post in [Etherpad](https://oasis.sandstorm.io/appdemo/h37dm17aa89yrd8zuqpdn36p6zntumtv08fjpu8a8zrte7q1cn60), while organizing my task list in [Wekan](https://oasis.sandstorm.io/appdemo/m86q05rdvj14yvn78ghaxynqz7u2svw6rnttptxx49g1785cdv1h), chatting with teammates in [Rocket.Chat](https://oasis.sandstorm.io/appdemo/vfnwptfn02ty21w715snyyczw0nqxkv3jvawcah10c6z7hj1hnu0), and syncing files with [Davros](https://oasis.sandstorm.io/appdemo/8aspz4sfjnp8u89000mh2v1xrdyx97ytn8hq71mdzv4p4d8n0n3h).

Here are just some of the things we've changed since Oasis was launched:

* Implemented automatic updates for apps.
* Added cryptographic verification of app author identity.
* Added unified notifications and activity indicators, so you can find out when apps need attention without opening them to find out.
* Added collections, allowing you to share a group of grains as one unit.
* Added the ability to share grains through other apps, e.g. sharing a document to a Rocket.Chat channel, without generating a magic link.
* Added a "trash" mechanism to make it harder to accidentally delete an important grain.
* Added the ability to delete your own account.
* Added support for apps to export WebDAV APIs.
* Made it easier for Sandstorm apps to connect with mobile client apps.
* Made Sandstorm's UI mobile-friendly.
* Made it so that our most-used apps are pre-installed for new users.
* Made sharing easier and more secure by adding contact auto-complete and "request access" UIs.
* Added the ability to attach multiple credentials to one account, so that one login provider being unresponsive won't prevent you from accessing Sandstorm.
* Made the left sidebar collapseable for more screen space.
* With the help of our developer community, doubled the number of apps available on Sandstorm.
* Improved onboarding for new users with tutorial hints.
* Performance, scalability, and stability improvements.
* [Much more.](https://github.com/sandstorm-io/sandstorm/blob/master/CHANGELOG.md)

We've so far kept Oasis labeled "beta", mostly because, as engineers, we always feel like there's so much more to do. But, that will always be true -- no good software project is ever "done". With Oasis being used for so much real work, the time has come to remove the "beta" label.

Oasis will officially emerge from beta on November 27. We wanted to give advance notice of this change because it affects our paying users: we will no longer be waiving your subscription fee as we have during the beta period. For backers of our Indiegogo campaign who opted for free hosting as a perk, the timer on your service will start now (hey, you got an extra free year!). For the rest, your next monthly invoice will be charged from your credit card. Your subscription payments help support further development of Sandstorm and packaging more apps. Thank you for your support!

<a class="linkbutton" href="https://oasis.sandstorm.io/demo">Demo Oasis now &raquo;<span style="font-size:60%"><br>(no sign-in required)</span></a>
