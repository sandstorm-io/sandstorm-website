---
layout: post
title: "Sandstorm Oasis hosting open beta and App Market launch"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

<a href="https://apps.sandstorm.io"><img src="/news/images/newui.png" width="600"></a>

<a class="linkbutton" href="https://apps.sandstorm.io">Try The App Market Now &#187;</a>

As you know, Sandstorm's mission is [to bring open source and indie web apps to a wider audience](/news/2014-07-21-open-source-web-apps-require-federated-hosting.html). To run open source web apps, you need your own server -- the developers aren't a big corporation with resources to run servers for you. And for everyone to run open source web apps, _everyone_ needs control of their own server. That means that running your own server and installing apps on it needs to be so easy that everyone can do it. Most people do not have the time or expertise to edit config files or use SSH, so we need to eliminate the need. Installing apps on Sandstorm needs to be as easy as installing them on your phone -- and it needs to be [secure by default](https://docs.sandstorm.io/en/latest/developing/security-practices/).

We've made a lot of progress on these fronts -- [try our online demo](https://demo.sandstorm.io) to see for yourself. However, up until now, to use Sandstorm, you still had to have a Linux machine to install it on. For many people, that's great -- running on your own machine provides the ultimate in privacy. But running a physical machine is still a burden no matter how easy the software may be, and a lot of people don't want to do it. That falls short of our goal: if we want everyone to be able to use open source apps, we need to give them another option.

## Managed Hosting

Sandstorm Oasis is a managed hosting service for Sandstorm. For $6/mo. (but free during the beta), we will give you a web-accessible Sandstorm server on which you can install any apps you want. Choose from the apps on our [app market](https://apps.sandstorm.io) or package and upload your own. Or better yet, package your apps and submit them to the app market for everyone to use.

When paying $6/mo for Oasis, you get a much better experience than you would installing Sandstorm on a $6/mo virtual machine elsewhere. In addition to the ease of use, Oasis knows how to give your apps resources when you are actually using them while not wasting any resources when you aren't. In contrast, a personal VM will typically reserve a constant amount of RAM for the entire month while sitting idle most of the time. This means that on Oasis, you get the effect of having a server with many times more RAM for the same price.

Some might ask: Doesn't managed hosting go against Sandstorm's goal of decentralization? We don't think so: the most difficult part of decentralization is separating the developers from the hosts. Once you are using Sandstorm apps, you can easily move your data between managed hosting and your own personal server, because the same apps are available everywhere. Sandstorm will always be available to run on your own machine as open source software, so the choice is yours. Moreover, we expect that some day there will be many competing Sandstorm hosting services located in many countries.

## Updates for Self-hosters

Today's launch includes a HUGE update to our user interface. So much has changed that it would be futile to try to describe it; you should [just try it](https://demo.sandstorm.io). We have, of course, pushed all these changes to our self-hosted users too. Some of you have even been following our [Github repo](https://github.com/sandstorm-io/sandstorm) and IRC and helping us test these features early -- thanks! For everyone else, run `sudo sandstorm update` to update now, or wait for the auto-update by the end of today. Don't have a server yet? [Install Sandstorm on Linux now &#187;](https://sandstorm.io/install)

## Also New: The App Market

Along with today's launch, we have deployed our new [App Market](https://apps.sandstorm.io), full of Free and Open Source apps, to replace our old ad-hoc app list. You can now browse apps more easily, complete with ratings and reviews. More importantly, submitting your own apps is now more streamlined: you can upload your package directly from the command-line using the `spk publish` command.

<a href="https://apps.sandstorm.io"><img src="/news/images/market.png" width="600"></a>

## Our Terms and Privacy Policy

People don't usually talk about Terms of Service and Privacy Policies. It's always the same story: a wall of inscrutable legalese that inevitably gives the service provider free reign to do whatever they want, which most users don't even bother to read.

We wanted Oasis to be a little different. We wanted our terms to address a number of shortcomings we see in "cloud services" today, in each case protecting you, not us. And we wanted to make sure that normal people can read and understand how our terms protect them.

In particular:

- We prohibit ourselves from looking at your data except under very specific, unusual circumstances (such as court orders).
- We promise to notify you if your data is the target of a court order (if we legally can do so).
- We think that protecting your data is the most important thing we do, and we will not delete it against your wishes unless we have no choice. In contrast, many cloud services are known for deleting people's data on a whim when they violate obscure rules they may not have even known about.
- We do not tolerate harassment. Luckily, Sandstorm's sharing model provides an elegant way to deal with it, without deleting your data.
- Unlike [some people](http://arstechnica.com/information-technology/2015/08/oracle-security-chief-to-customers-stop-checking-our-code-for-vulnerabilities/), we explicitly permit white hat security research, so long as no one is harmed and bugs are responsibly disclosed.
- We have zero interest in "tracking" you to learn your interests and build a personal advertising profile, therefore our privacy policy prohibits us from doing so.

Check out the full [Terms of Service](https://oasis.sandstorm.io/terms) and [Privacy Policy](https://oasis.sandstorm.io/privacy) for details -- and if you see anything wrong, feel free to [file a bug](https://github.com/sandstorm-io/tos-pp)!

## Free During Beta

Oasis is not done yet -- we have lots to do. We anticipate it will remain in "beta" for several months -- and during that time, the service is completely free. To get started with Oasis, head over to [oasis.sandstorm.io](https://oasis.sandstorm.io).

## PS: The Name

A couple months back, we asked you on Twitter what our managed hosting service should be called. Nearly everyone who replied -- and there were a lot of you -- had the same answer: "Oasis". So, thank you for making the decision easy!
