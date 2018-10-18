---
layout: post
title: "Oasis free plan will be discontinued October 14"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

**Update:** This change has now taken effect. Looking for help downloading your data from Oasis? [See our latest blog post »](2018-10-18-how-to-download-oasis-data)

Starting October 14, 2018, Sandstorm Oasis's "free" plan will be discontinued. Users will still be able to log in for free to access apps and grains owned by other, paying users, but free users will not be able to install their own apps nor create grains. Existing grains owned by free users will remain available for download via the "download backup" function, allowing you to transfer the data to a self-hosted Sandstorm server or manually extract it. However, the grains will no longer be able to start on Oasis unless you upgrade to a paid account.

### Why do this?

Unfortunately, Oasis does not make enough money to support itself.

As of this writing, Oasis hosts 2642 monthly active users. This number is actually up in the last few months, despite Sandstorm having put no effort at all into user growth since [we changed gears in early 2017](/news/2017-02-06-sandstorm-returning-to-community-roots).

However, only 88 of those users have a paid subscription, generating a total of $828 in monthly revenue. Unfortunately, the bare cost of operating Oasis currently comes to about $960 per month, mostly to pay for servers. Additionally, to keep Sandstorm the corporation in existence as a vehicle to operate Oasis costs around an additional $600 per month (for things like taxes, tax preparation, banking fees, etc.). Although these fees don't technically go to keeping the service running, dissolving Sandstorm the company would almost certainly require shutting down Oasis, and so to keep Oasis running we must pay these fees.

All told, this means Oasis is running a deficit of $700 per month, which I personally pay out-of-pocket.

I do not want to shut down Oasis, because I know a lot of people depend on it and use it every day. But, it doesn't make sense for me personally to pay for compute for every person who signs up. I need each user to pay their share.

### What are the options for existing users?

If you currently have a free account with data on Sandstorm Oasis, you will need to do one of the following:

* Upgrade to a paid plan on Oasis.
* [Switch to a self-hosted Sandstorm server.](https://sandstorm.io/install) You can transfer your grains from Oasis to the new server by downloading a backup of each grain (down-arrow icon in the top bar when the grain is open) and uploading it to the new server. You won't need to pay Sandstorm anything in this case, but by moving your grains off Oasis, you can help us shut down some servers to save money.
* Download your data and extract it manually. Sandstorm grain backups are simple zip files containing all of the data the app stored. The format is different from each app -- it may be a JSON file, a SQLite database, a MongoDB, etc. You may need special tools and knowledge to extract the data, but it's all there.
* Do nothing. Your data will remain intact and can be downloaded at any time. If you aren't actively using your Oasis account, then you need not take action at this time.

### FAQ

#### Have you considered a crowdfunding campaign?

Crowdfunding campaigns are harder than they look. Sandstorm ran one early in its life, successfully raising about $60,000. During that time, I had to spend every day for a month and a half going out and selling people on it. We lined up press articles. We had two paid employees pumping out apps. We got on Hacker News several times.

These days, I have a day job leading development of [Cloudflare Workers](https://blog.cloudflare.com/cloudflare-workers-unleashed/) and related projects. Workers is taking off quickly and there's tons to do to make it better. Alas, I just don't have time to coordinate another crowdfunding campaign for Sandstorm on the side.

#### Can I donate to Sandstorm via Patreon or something?

The best way to "donate" to Sandstorm is to sign up for a paid Oasis account. This is already set up, and the payment processing fees we pay to Stripe are much lower than what Patreon and the like would charge. All revenue from Oasis goes directly to paying for operation costs.

#### Will Oasis shut down eventually?

If Oasis remains non-profitable after this change, we'll eventually have to shut it down. If it pays for itself, I'd like to keep it running, but I cannot make any guarantees. I will, of course, provide plenty of advance warning before shutting it down entirely.



