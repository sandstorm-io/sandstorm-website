---
layout: post
title: "Sandstorm Oasis is Shutting Down"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

On December 31st, 2019, Sandstorm's paid hosting service, Sandstorm Oasis, will begin winding down.

- Only Oasis is affected. Other Sandstorm services, such as Sandcats.io, the app market, and automatic updates for self-hosted Sandstorm, will continue to operate.
- No new monthly payments will be accepted starting January 1st, 2020. Users will be able to finish out their last billing period paid in December and ending in January. Once your subscription ends, your apps will not be able to start up.
- Grain owners will continue to be able to download their data or transfer it to another Sandstorm server for at least another six months, until June 30, 2020. After that, data may become permanently unavailable.

## It's time to go Self-Hosted

If you're an Oasis user, fear not! You can keep using Sandstorm [on your own server](https://sandstorm.io/install), and you can easily [transfer all your Oasis data](https://oasis.sandstorm.io/transfers) to it.

Indeed, today, there's almost no reason to prefer Oasis over a self-hosted Sandstorm server. Consider:

- A similarly-priced server on Digital Ocean running Sandstorm will load apps much faster than Oasis does, while giving you 5x the storage space.
- Users in Europe (of which Oasis has disproportionately many, even though we never really intended Oasis to be suitable for them) would be better-served by a European hosting provider, providing lower latency, and governed by European laws. Oasis is located in the United States.
- Oasis is currently operated by one person (me). I do my best, but should something happen to me, Oasis could disappear suddenly. In contrast, your self-hosted server will never disappear no matter what I do.
- Once Sandstorm is installed on your server, it's almost entirely self-managing. Updates are installed automatically. TLS certificates are renewed automatically (with Sandcats.io). Modern VM hosts (like Digital Ocean) can perform automatic backups.

In order to make it extra-easy to transfer your data to a new server, I have added a new "Mass transfers" feature to Sandstorm. Find it by clicking the button at the top of your Grains list:

![Screenshot showing the mass transfer button, located at the top of the Grains list between the "Restore backup..." button and the "View trash" button.](/news/images/mass-transfer.png)

Then follow the on-screen directions to specify a destination server, review the list of grains to transfer, and then execute the transfer.

To recap:

1. [Set up your own self-hosted Sandstorm server now »](https://sandstorm.io/install)
2. [Transfer your grains from Oasis »](https://oasis.sandstorm.io/transfers)

## Why shut down Oasis?

### The story of the last few years

Sandstorm, as a company, [mostly shut down two years ago](https://sandstorm.io/news/2017-02-06-sandstorm-returning-to-community-roots). The company had run out of investor money while having achieved essentially no revenue, and no hard evidence that we'd ever achieve any. While Sandstorm was popular on Hacker News, that popularity never really converted into paying users. Meanwhile, in the market where we imagined we'd find real profits -- enterprise software -- we'd made no real progress whatsoever. In this state, we were unable to attract new investors, and we were unable to find a company to acquire the business.

The Sandstorm team was forced to look for new jobs. [Most of us were hired by Cloudflare](https://sandstorm.io/news/2017-03-13-joining-cloudflare), though some chose to go elsewhere. Personally, I chose Cloudflare because I had always liked the technical culture I saw in their blog posts, and because I was interested in the project they wanted me to work on.

Originally, my plan had been to keep developing Sandstorm as an open source project. I felt -- and still feel -- that if only some rough edges could be smoothed out and some key missing features filled in, Sandstorm could really be a plausible replacement for the set of web services people use every day. I set a goal of getting myself off of Google services by replacing the key bits with Sandstorm apps -- especially email. I thought that if I could really get that working, maybe we'd be in a position to relaunch the company.

I made some progress. On nights and weekends, I managed to clean up one of the hairiest rough edges of Sandstorm, [fixing the identity system](https://sandstorm.io/news/2017-05-08-refactoring-identities). I also [rewrote the basics of how Sandstorm handles HTTP traffic](https://sandstorm.io/news/2018-02-19-http-rewrite-and-more), making it much faster and cleaner and removing JavaScript from a part of the system where it had no business being.

For a while, Oasis was costing far more to operate than it was taking in in revenue, with me making up the difference out-of-pocket. But, between the HTTP rewrite (which saved several machines), and [discontinuing the Oasis free plan](https://sandstorm.io/news/2018-08-27-discontinuing-free-plan), I was able to bring things to the point where [Oasis is mildly profitable](https://sandstorm.io/news/2018-10-28-results-of-ending-free-plan), earning a few hundred dollars a month.

But, meanwhile, at my new job at Cloudflare, I am the lead engineer / architect of a project called [Cloudflare Workers](https://workers.cloudflare.com/), a "serverless" platform that simultaneously deploys your code to 193 (and growing) locations around the world. Starting from scratch when I joined, I built a first prototype in a few months, had a [public demo](https://blog.cloudflare.com/introducing-cloudflare-workers/) and beta customers shortly thereafter, and [launched it to the world](https://blog.cloudflare.com/cloudflare-workers-unleashed/) exactly (by coincidence!) a year after joining. Today, Cloudflare Workers handles something like a million times the traffic Sandstorm ever did. Meanwhile, the team has grown from just me to a literal bus-load of people. And we're really just getting started.

As much as I love Sandstorm, it's hard to come home from my successful day job to work on an unsuccessful side project. And so, I have been spending less and less time on Sandstorm. I still push updates every month to keep the dependencies fresh, but hadn't worked on any new features in about a year and a half before adding mass transfers recently.

Meanwhile, without leadership, the community has mostly disbanded. The only app that gets regular updates anymore is Wekan, thanks to its maintainer Lauri "xet7" Ojansivu. Jake Weisz heroically continues to carry the Sandstorm flag, reviewing app submissions (mostly from Lauri), replying to questions and bug reports, and advocating Sandstorm around the internet. A couple others lurk on the mailing list and IRC. Most people have moved on.

### Why not leave Oasis running?

Oasis is mildly profitable: it brings in about $1800 in revenue each month, while costing around $1400 each month between infrastructure, services, fees, and business upkeep (e.g. tax prep). Almost 200 people are paying for it and it appears most of them are in fact using it. As long as it isn't losing money, why not let it be?

First, the obvious reason: It still takes time to operate. Once a month I have to spend my Saturday afternoon testing and pushing an update. Several times, changes in dependencies have broken things, requiring debugging time. In fact, Oasis's cluster management and storage back-end (known as "Blackrock") is still running a build from October 2018! For reasons I've been unable to determine, newer builds after that point start crashing under moderate load. I'm unable to reproduce such load in a test environment, so the only way to test potential fixes is to push out a full release, watch it fail, and roll it back. After several tries, I've mostly given up. Luckily, this component of Oasis has had no major changes and does not have any directly-exposed attack surface, so pinning the old version is mostly fine… but it's a fragile position to be in.

On a related note, I am on call 24/7 for Oasis. It rarely breaks, but when it does, I have trouble fixing it in a timely fashion. For one example, in January, [an unexplained Google Cloud hiccup forced me to transfer Oasis to another zone](https://twitter.com/SandstormIO/status/1089664116925427712), which it wasn't designed for (whoops, yeah, it's not multi-homed, we never got that far). It was down for hours. Luckily it was a weekend and I was at home, or it could have been days. In another incident, I discovered that GMail had been routing all my monitoring alerts (and e-mail to support@, security@, contact@, etc.) directly to spam for months.

But, more important than the time burden on me is that I no longer feel good about charging money for this product. Almost all the app packages are from 2015-2016; many of those apps have had significant updates in their standalone versions since then which are missing on Sandstorm. Apps load super-slowly on Oasis. Many have significant missing features vs. their stand-alone versions, due to not having adapted to Sandstorm's security model. And the Sandstorm UI itself remains woefully incomplete and janky. I constantly worry that most of the people paying for Oasis signed up by mistake and never noticed it on their credit card statements -- that may sound far-fetched, but in fact I have had at least a few complaints from people who did just that (which I then refunded). I worry that it seems like we have European customers and I wonder if they realize Sandstorm is located in the US and may not comply with relevant European regulations. I feel embarrassed that people who haven't read the blog assume the product is supported by full-time staff. Would Oasis still be profitable if it were only used by people who fully understand the state of the company? I'm not sure.

Finally, Oasis today provides almost no advantages over self-hosting. The price of virtual servers has come down to the point where self-hosting Sandstorm on an equivalently-priced server will give you a much better experience than Oasis can. Sandstorm was always supposed to be about owning your own server anyway. In fact, in retrospect, I think we never should have created Oasis, but should instead have focused entirely on self-hosting all along.

### What's next?

Sandstorm will continue to exist as an open source project. I personally plan to transfer my Oasis grains to a self-hosted server, and keep using it. I have to admit, building the mass transfer feature was kind of fun -- I'd forgotten how little time it takes to build significant features in Meteor. And I'm still interested in self-hosting my email, if I can cobble together a decent UX. Maybe I'll be inspired to build something on Sandstorm… we'll see.

However, after the shutdown of Oasis, the project should be understood to be a hobby project, not a business. People should no longer rely on me, working in my spare time, to safeguard your data or keep it accessible.

