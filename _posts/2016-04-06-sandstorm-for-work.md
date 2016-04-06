---
layout: post
title: "Sandstorm for Work Beta: LDAP, SAML, organization management"
author: Kenton Varda
authorUrl: https://github.com/kentonv
imageUrl: https://sandstorm.io/news/images/business.png
---

Sandstorm is a great way to run open source collaborative productivity apps like document editors, task managers, chat rooms, file sharing, and more (54 apps and growing), all in one place. Lots of people -- including us -- use Sandstorm every day as part of doing their jobs. For example, right now I am composing this blog post in [Dillinger](https://apps.sandstorm.io/app/fq057t4ek3yt96xsfje6c1wv61pkjkqm9hs1539x4jqxjwzdp7fh) running on [Sandstorm Oasis](https://oasis.sandstorm.io) (our hosting service), but many people choose to self-host Sandstorm on their own machines.

<img style="float: right; width: 283px; height: 221px;" src="/images/business-ldap.png">

Sandstorm for Work makes self-hosted Sandstorm easier to integrate into a corporate environment. That means you can:

* Integrate with LDAP (including Active Directory) or SAML for single-sign-on.
* Manage user groups and domains as whole units rather than inviting each user individually.
* Specify organization-wide access control policies, like "no sharing outside of the organization".
* [And more...](https://sandstorm.io/business)

We're in beta now, so not all features are ready yet, but once you've installed Sandstorm you'll automatically receive updates as they become available.

To get started now, install Sandstorm and choose "Sandstorm for Work" during setup (or if you already have a server, look for the "for Work" tab in the admin settings). Sandstorm for Work is priced at $15/user/month, and currently we're offering a 90-day free trial. (It's still open source! More on that in a bit.)

<a href="https://sandstorm.io/install" class="linkbutton">Install Sandstorm »</a>

### Productivity Apps Large and Small

With Sandstorm for Work, you can run apps similar to popular SaaS products, but keep your data in-house. For example, you can run [Etherpad](https://apps.sandstorm.io/app/h37dm17aa89yrd8zuqpdn36p6zntumtv08fjpu8a8zrte7q1cn60) and [Ethercalc](https://apps.sandstorm.io/app/a0n6hwm32zjsrzes8gnjg734dh6jwt7x83xdgytspe761pe2asw0) instead of Google Docs, [Wekan](https://apps.sandstorm.io/app/m86q05rdvj14yvn78ghaxynqz7u2svw6rnttptxx49g1785cdv1h) instead of Trello, [Rocket.Chat](https://apps.sandstorm.io/app/vfnwptfn02ty21w715snyyczw0nqxkv3jvawcah10c6z7hj1hnu0) instead of Slack, and [Davros](https://apps.sandstorm.io/app/8aspz4sfjnp8u89000mh2v1xrdyx97ytn8hq71mdzv4p4d8n0n3h) instead of Dropbox. Once you have Sandstorm running, you can install each new app with a click -- no need to create a new account on a new service, and no worry about whether that service is sufficiently private and secure. With Sandstorm, running apps in-house is actually **easier** than using SaaS.

But even more interestingly, you can run apps on Sandstorm that aren't available anywhere else, like Simon Vansintjan's [Annotate](https://apps.sandstorm.io/app/c6zfftftrra9d4pdyuc1psew65ukqrjujvk20fac4zke1uasxv10). The idea behind Annotate is simple: upload an image, then annotate it with comments. We at Sandstorm use it to discuss UI and illustration mockups. Here's me using it to comment on a slide deck we're working on:

<p style="max-width: 500px; margin: 1em auto;"><a href="/news/images/annotate.png"><img src="/news/images/annotate-small.png"></a></p>

What I love about Annotate is its simplicity: Simon wrote the whole thing in a couple weekends. And yet, it's enough to be useful to design teams anywhere. No matter what Simon decides to do in the future, this app will never disappear, and you don't have to trust Simon because your data stays on your server.

Annotate is just one of [54 apps and growing](https://apps.sandstorm.io) on our app market. By installing Sandstorm at your workplace, you get access to all of these at once, under a single login, and without giving up control of your data.

### Security Behind the Firewall

<img style="float: right; width: 236px; height: 188px;" src="https://sandstorm.io/images/why-finegrained.svg">

Of course, if you want to run apps on your own infrastructure, behind your firewall, you need to think about security. A malicious app -- or a buggy app that gets hacked -- can compromise your whole network.

Fortunately, Sandstorm protects you. Sandstorm is the only container engine that implements [fine-grained isolation](https://sandstorm.io/how-it-works), locking every document in its own container. By doing so, it prevents any app from compromising the server or network, and indeed [it renders 95% of app security vulnerabilities moot](https://docs.sandstorm.io/en/latest/using/security-non-events/).

### Developing for Enterprise

Are you a developer of a web app aimed at enterprise? Do you ever get requests for an on-prem version, but find it hard to fulfill this request given the myriad environments and infrastructure you'd need to support? Perhaps we can help. If you target Sandstorm, then these logistics become our job. If your app works on one Sandstorm server, it will work everywhere. If you are interested in learning more, [check out our developer features](https://sandstorm.io/developer) and [e-mail us](mailto:community@sandstorm.io).

### Is it Open Source?

Yes! Sandstorm for Work features are part of the same codebase as the rest of Sandstorm and under the same Apcahe 2.0 license. However, in order to unlock Sandstorm for Work features, we ask that you buy a "feature key" from us.

So how does that work? Can't anyone just remove the feature key check? In fact, yes, you can. However, if you did that, you would not be able to take advantage of our automatic updater, which ensures that your server is updated to the latest version within 24 hours of any release with no effort on your part. Automatic updates are important to keep your server secure and to make sure you can always run the latest apps.

Purchasing a feature key also entitles you to priority support. However, we don't want to be a company who primarily sells support, because we think that creates a perverse incentive for us to make our product hard to use. Indeed, it is our goal that no one should ever need to contact support at all, but under a support model, we'd be putting ourselves out of business! Under the feature key model, we are selling features, and promising support if there are problems. This way, we are incentivized to make sure there are no problems, because then we don't have to answer support tickets.

### The Future

We like to release features early and often -- we push a new release almost every week. What we are announcing today is only the beginning of what we have in store for Sandstorm for Work. Over the coming months, we'll be adding features like group management (to make it easier to share documents with your team), audit logging (keep track of who has been accessing what, for security and compliance purposes), customizable access control policies, and much more.

If you install Sandstorm today, **you'll automatically get these features as they become available** -- your server will automatically update after every weekly release with no action needed on your part. So why not install now and see what you think? Feel free to [file a bug](https://github.com/sandstorm-io/sandstorm/issues) to tell us what you want to see next.

<p style="text-align: center"><a style="display: inline-block; width: 250px; margin: 4px 0;" href="https://demo.sandstorm.io" class="linkbutton">Try a demo »</a> <a style="display: inline-block; width: 250px; margin: 4px 0;" href="/install" class="linkbutton">Install Sandstorm »</a></p>
