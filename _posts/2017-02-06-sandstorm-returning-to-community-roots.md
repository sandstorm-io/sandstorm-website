---
layout: post
title: "Sandstorm is returning to its community roots"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Most people know Sandstorm as an open source, community-driven project aiming to enable self-hosting of cloud services and to make it possible for open source web apps to compete with today's cloud services.

Many people also know that Sandstorm is a for-profit startup, with a business model centered on charging for enterprise-oriented features, such as LDAP and SAML single-sign-on integration, organizational access control policies, and the like. This product was called "Sandstorm for Work"; it was still open source, but official builds hid the features behind a paywall. Additionally, we planned eventually to release a scalable version of Sandstorm for big enterprise users, based on the same tech that powers Sandstorm Oasis, our managed hosting service.

As an open source project, Sandstorm has been successful: We have a thriving community of contributors, many developers building and packaging apps, and thousands of self-hosted servers running in the wild. This will continue.

However, our business has not succeeded. To date, almost no one has purchased Sandstorm for Work, despite hundreds of trials and lots of interest expressed. Only a tiny fraction of Sandstorm Oasis users choose to pay for the service -- enough to cover costs, but not much more.

We attribute this failure to two main problems:

* As a product, Sandstorm is still alpha-quality. As you may know, Sandstorm is pioneering a paradigm shift in the way servers operate, which we call fine-grained containerization. [The benefits of this technology are huge](https://sandstorm.io/how-it-works), but a lot of engineering work is needed to make it work smoothly. Although we've built a working product that many people -- including ourselves -- use for real work every day, many limitations still exist that make Sandstorm feel rough and incomplete compared to alternatives. We know how to fix these problems, but we need more time to do so.

* We underestimated, in classic fashion, the challenge of enterprise sales. As a company of engineers and geeks, we knew that enterprise sales would be outside of our comfort zone, but we didn't realize just how much work it would be to learn, and how much time we needed to be successful at it. By the end, we were only scratching the surface of how to generate leads and get in the door at big companies; we never managed to do a "real" sales call. In retrospect, we should have hired a business development expert much earlier on. We also should have raised more money and planned for a longer runway.

We plan to publish a more complete postmortem in a subsequent blog post.

Unfortunately, Sandstorm the business has now run out of money, and we have been unable to raise more.

**The Project Lives On**

Although it will no longer be our full-time job, Sandstorm will continue as an open source project. We still strongly believe in Sandstorm's long-term vision and cannot abandon it. I personally will continue to lead Sandstorm's technical development: reviewing and merging pull requests, pushing releases, and developing new features. We will continue to operate Sandstorm Oasis -- your data there is safe. Meanwhile, we will make it easier for our extended community to be involved in core development and decision-making. Jade will be in contact with individual community members to appoint community leaders and grant them the authority to handle a variety of community organizing functions, from App Market approval to organizing meetups.

Ironically, the pace of development may not even be hurt much. Over the past year, the Sandstorm team has spent a great deal of our time on enabling our business, e.g. building a payment mechanism, processing customers, marketing, and the like. I personally have spent far too much time on fundraising, sales, and other deal-making rather than on coding. With this shift in direction, we can now focus strictly on building out the core platform, getting more done with less time.

**Immediate Action Items**

As a result of this change, the following has happened today:

* We have pushed a release which removes the Sandstorm for Work paywall. Sandstorm for Work features (like LDAP/SAML integration) are now available to all self-hosted Sandstorm servers at no cost. The product name "Sandstorm for Work" has been retired; there is now only Sandstorm. (Your server should already have received the update. If not, SSH in and type `sudo sandstorm update`. Don't have a server yet? [Install Sandstorm now.](https://sandstorm.io/install))

* We have [open sourced Blackrock](https://github.com/sandstorm-io/blackrock), an alternate back-end for Sandstorm which is able to scale out across a cluster of machines. We have long used this technology to power Sandstorm Oasis, but had hesitated to release it for fear that it would harm our business model. We no longer have a business model to protect, so the code can now be set free.

* We have added the [Sandstorm Technology Roadmap](https://github.com/sandstorm-io/sandstorm/tree/master/roadmap) to the Sandstorm repo, where you can learn about everything Sandstorm has built and plans to build. The roadmap is full of projects and features marked "TODO", so you can see what needs to be built.

* We've written a new [contributing guide with a list of projects you can work on](https://github.com/sandstorm-io/sandstorm/blob/master/CONTRIBUTING.md). See if there's anything that interests you!

* No changes are expected to [Sandstorm Oasis](https://oasis.sandstorm.io) nor [Sandcats.io](https://docs.sandstorm.io/en/latest/administering/sandcats/). Both services will continue to operate going forward.

**How you can help**

Want to see Sandstorm succeed? Then, contribute!

* If you'd like to help build Sandstorm, sign up on [the sandstorm-dev mailing list](https://groups.google.com/group/sandstorm-dev) and join us on IRC at #sandstorm on Freenode. There is lots to do, from hardcore systems hacking to community organizing to tasks that require nothing but enthusiasm. For ideas on how you can help, check out the [community page](https://sandstorm.io/community) and the [contributing guide](https://github.com/sandstorm-io/sandstorm/blob/master/CONTRIBUTING.md).

* If you have more money than time and would like to support the project financially, the best way to do it is to sign up for a paid account on [Oasis](https://oasis.sandstorm.io).

