---
layout: post
title: "Sandstorm's security track record, and what it means for self-hosting"
author: Asheesh Laroia
authorUrl: https://github.com/paulproteus
---

Today I want to share the results of our own [analysis of security issues of web apps available on
the Sandstorm app market](https://docs.sandstorm.io/en/latest/using/security-non-events/).

### 95% of security issues automatically mitigated, before they were discovered

Sandstorm automatically protects users from a huge fraction of the publicly disclosed security
vulnerabilities discovered in apps on the Sandstorm app market, before the vulnerabilities were even
disclosed. Of the issues we examined, 95% were wholly or partly mitigated. You can read the [full
report here in our
documentation](https://docs.sandstorm.io/en/latest/using/security-non-events/). The analysis covers
publicly-disclosed vulnerabilities in Etherpad, WordPress, Roundcube, ShareLaTeX, and Tiny Tiny
RSS. In WordPress, we limited our analysis to security issues of severity score 6 or higher, due to
the large number of issues. We also mitigated 21 CVEs in the Linux kernel to prevent sandbox
breakout.

We built Sandstorm to create a [viable ecosystem for indie and open source web
apps](https://sandstorm.io/news/2014-07-21-open-source-web-apps-require-federated-hosting). When
server apps are as safe to run as apps on a phone, people will feel free to choose whatever software
they like. Consider that some Sandstorm apps, like
[Giftr](https://sandstorm.io/news/2016-02-25-giftr), are small and don't have as many people
checking the code for bugs. Sandstorm protects you when you use those apps, too.

We know that security is risk-management, not binary. No software, Sandstorm included, will ever
protect all user data from all bugs in all programs. However, raising barriers to a successful
attack means fewer successful attacks will occur.

### Self-hosted apps can be as secure as a centralized web app

With Sandstorm, you get an experience as easy to use as software-as-a-service, and you retain the
privacy benefits of self-hosting. One of our key security strategies is to isolate each grain
(typically, one document) separately, so that a buggy or malicious app has a hard time ruining your
day. That degree of isolation is enabled by our various [security
practices](https://sandstorm.io/how-it-works).

I hope you'll [read the full
analysis](https://docs.sandstorm.io/en/latest/using/security-practices/), prepared by myself and
Kenton Varda. <a href="https://groups.google.com/forum/#!forum/sandstorm-dev">Let us know</a> what
you think!

### When self-hosting is secure, users are free to choose

Security enables freedom of choice. If you use a Sandstorm server, you can choose productivity tools
that fit your needs, even if the server is maintained by someone else.

Want to chat with colleagues? Install
[Rocket.Chat](https://apps.sandstorm.io/app/vfnwptfn02ty21w715snyyczw0nqxkv3jvawcah10c6z7hj1hnu0) or
[Let's
Chat](https://apps.sandstorm.io/app/qkgkaxfqhgsff8zgx2f4nf1a8xvmpte6wa19egmfkk06mzt7e8dh). Want to
track tasks and stay organized? Install
[WeKan](https://apps.sandstorm.io/app/m86q05rdvj14yvn78ghaxynqz7u2svw6rnttptxx49g1785cdv1h) or
[Simple
Todos](https://apps.sandstorm.io/app/0dp7n6ehj8r5ttfc0fj0au6gxkuy1nhw2kx70wussfa1mqj8tf80). Want to
organize a gift exchange? Install
[Giftr](https://apps.sandstorm.io/app/tr3w5p7ajsf61nf2e6dkfv8tdjes0qsm5w6ew0frd4qwnacwur90). Want to
share files quickly with friends? Install
[FileDrop](https://apps.sandstorm.io/app/nn7axgy3y8kvd0m1mtk3cwca34t916p5d7m4j1j2e874nuz3t8y0) or
[Davros](https://apps.sandstorm.io/app/8aspz4sfjnp8u89000mh2v1xrdyx97ytn8hq71mdzv4p4d8n0n3h).

If you prefer managed hosting, you can [make an account on Oasis](https://oasis.sandstorm.io/) and
enjoy any of these apps or upload your own.

Or you can run your own Sandstorm install. Over the past six months, we've integrated [free SSL
certificates](https://sandstorm.io/news/2015-10-01-free-ssl-certificates) and
[cryptographically-verified automatic
updates](https://sandstorm.io/news/2015-09-24-is-curl-bash-insecure-pgp-verified-install) into
self-hosted Sandstorm. As soon as someone installs Sandstorm for an organization, they can safely
allow colleagues to choose their own tools. If you install Sandstorm for yourself, you can use the
best indie web apps and let the platform handle security for you.  Get started on the [Sandstorm
install page](https://sandstorm.io/install).
