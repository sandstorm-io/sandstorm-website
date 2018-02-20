---
layout: post
title: "HTTP proxy rewrite and other updates"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Development of Sandstorm continues! Despite now having a day job, I still spent a lot of my free
time working on Sandstorm.

This past weekend, [I deleted some of the oldest code in Sandstorm](https://github.com/sandstorm-io/sandstorm/pull/3038). This is the culmination of a few months of work: ever since early September, I have been working to transition the Sandstorm HTTP proxy from JavaScript to C++. This is the code which receives incoming HTTP requests, authenticates them, and forwards them to the appropriate grain (application instance). This low-level, performance-critical systems code.

Historically, HTTP proxying was a duty of Sandstorm's "Shell" server. The Sandstorm Shell is Sandstorm's user interface, an application written on [Meteor](https://meteor.com) and [Node](https://nodejs.org), and is responsible for most of Sandstorm's business logic. Historically, the other major component of Sandstorm has been the "back end", written in C++, responsible for running application containers and managing storage. HTTP proxying was done in the shell mostly because this was the most convenient place, building on Node.js's HTTP library. However, performance (both CPU and memory usage) has been disappointing at best, and [a debugging nightmare at worst](https://sandstorm.io/news/2016-09-30-fiber-bomb-debugging-story).

Sandstorm now has a third component: the "Gateway". This component receives all incoming HTTP traffic and forwards it to the appropriate destination. Requests related to Sandstorm's UI are forwarded on as HTTP to the Shell over an internal Unix domain socket. Requests intended for apps are converted by the Gateway into Cap'n Proto requests and routed to the appropriate app. The Gateway also performs TLS termination (e.g. for users of our [free TLS certificates under sandcats.io](https://docs.sandstorm.io/en/latest/administering/sandcats/)).

The Gateway is written in C++, using the [KJ HTTP Library](https://github.com/capnproto/capnproto/blob/master/c++/src/kj/compat/http.h). KJ is the C++ toolkit library originally built as part of the [Cap'n Proto](https://capnproto.org) project (itself a sub-project of Sandstorm), but which is beginning to take on a life of its own. KJ HTTP is a low-level yet easy-to-use HTTP client and server library, built on top of the KJ asynchronous framework (think Promises but in C++), all authored by yours truly. KJ HTTP is also used in the implementation of [Cloudflare Workers](https://blog.cloudflare.com/introducing-cloudflare-workers/) (the project I lead in my day job), where it has already handled billions of requests.

We can see the performance improvement for Sandstorm Oasis, our hosting service which runs [a special cluster-scalable version of Sandstorm](https://github.com/sandstorm-io/blackrock). Oasis runs instances of the Sandstorm Shell on dedicated machines, with the ability to add more replicas as needed to handle traffic. Here's the recent CPU usage history of one such replica:

![Graph of shell CPU usage across Gateway deployment.](/images/http-gateway-cpu-improvement.png)

As you can see, introducing the gateway more than halved the CPU usage of the Sandstorm shell. Rather than reduce the number of replicas, I decided to cut the instance size in half. Either way, switching to the C++ Gateway saved money.

What about the Gateway itself? Where does it run, and how much CPU does it add? Well, historically, Oasis used an nginx instance for ingress, to provide TLS termination and load balancing. With the Gateway introduced, we were able to eliminate nginx from our stack: the Gateway is perfectly capable of handling TLS termination itself, and is able to implement session-affinity load-balancing much more effectively than nginx could due to the Gateway's intimate knowledge of Sansdtorm internals. Thus, introducing the Gateway did not add any new VM instances to our system: it simply replaced the existing nginx instance. The Gateway's CPU usage is negligible, using only a few percent of a CPU core. It appears to be on par with nginx, although when the numbers are this low it's hard to really tell. I did ultimately decide to reduce the Gateway instance from a full CPU core to a half core to save some more cash.

These changes will roll out in full to self-hosted Sandstorm users on March 11 (the code is in git now, but I won't have time to roll a release until then). Adventurous users can set `EXPERIMENTAL_GATEWAY=true` in their `/opt/sandstorm/sandstorm.conf` today, although note that this will give you the implementation as of the previous release two weeks ago, which still uses the old proxy for some things.

### Other updates

[Lauri Ojansivu](https://github.com/xet7) has translated the Sandstorm UI to Finnish, and [Benoit Renault](https://github.com/Xia0ben) and [Thierry Pasquier](https://github.com/jeau) have translated the Sandstorm UI to French. This means, along with English, Chinese, and Dutch, Sandstorm now supports five languages. [Learn how to help translate Sandstorm here.](https://github.com/sandstorm-io/sandstorm/blob/master/CONTRIBUTING.md#internationalization-i18n)

### Next up

Here's some things I want to work on next:

* Improving how app updates work. Today, you receive a notification when an app has been updated, and must explicitly accept the update. This unfortunately means that big Sandstorm servers with lots of users tend to get stuck storing every single historical version of every app forever, since there's always someone who never updated after some version. I'd like to make updates fully automatic, but this requires some story for users who want to pin an older version, and some way to roll back to and older version in case of breakage.
* Integrating with Let's Encrypt, [once they support wildcard certificates](https://letsencrypt.org/2017/07/06/wildcard-certificates-coming-jan-2018.html). Hopefully, this will finally make it easy to run a secure Sandstorm server on your own domain. However, issuing a certificate requires completing a DNS challenge, and Sandstorm currently does not act as a DNS server. So, some manual intervention will likely still be required.
* Really supporting e-mail. Today, Sandstorm has some limited ability to accept e-mail, but can't really act as a standalone e-mail server. I'd like to fix this, with the goal of migrating my own personal e-mail off of GMail and onto Sandstorm.
* Really supporting development workflows, centered around git. I want to be able to host a git repository, code review tools, a reasonable issue tracker, and a CI, all on Sandstorm, and all as separate apps.
* Making the top bar less ugly. People complain that Sandstorm's UI is suffocating, especially the black bar across the top. However, Sandstorm's security model requires that we have a place to hang trusted UI bits -- such as the sharing dialog -- that is separate from the app proper. Many apps, though, also have their own top bar with app-specific features, creating a double-top-bar effect. What I'd like to do instead is have a single top bar rendered by Sandstorm, but which can be customized by the app to include app-specific controls as well and to look visually consistent with the rest of the app.
* Many other things!

Want to get involved? [Join the sandstorm-dev mailing list.](https://groups.google.com/group/sandstorm-dev) and [check out ways to contribute](https://github.com/sandstorm-io/sandstorm/blob/master/CONTRIBUTING.md).
