---
layout: post
title: "Free, automated SSL certificates for Sandstorm self-hosters"
author: Asheesh Laroia
authorUrl: https://github.com/paulproteus
---

***TL;DR:** If you [install Sandstorm](https://sandstorm.io/install/) and choose to use a subdomain of our dynamic DNS service sandcats.io, we'll automatically set you up with an HTTPS certificate from GlobalSign. The private key never leaves your machine and is automatically rotated every week.*

People who run their own servers often do it for privacy. Many of them use our open source Sandstorm software to easily run apps like [document editors](https://apps.sandstorm.io/app/h37dm17aa89yrd8zuqpdn36p6zntumtv08fjpu8a8zrte7q1cn60), [group chat apps](https://apps.sandstorm.io/app/vfnwptfn02ty21w715snyyczw0nqxkv3jvawcah10c6z7hj1hnu0), [task management](https://apps.sandstorm.io/app/m86q05rdvj14yvn78ghaxynqz7u2svw6rnttptxx49g1785cdv1h), and [more](https://apps.sandstorm.io). 

But a private server is not really private if you're communicating with it in plaintext. So, starting today, if you [install Sandstorm](https://sandstorm.io/install/) on your own Linux server, and you choose to host at a subdomain of our free dynamic DNS service sandcats.io, you will have free, automatically-renewing HTTPS certificates by default. That means you get privacy on the network without any hassle.

For companies and individuals who run their own Sandstorm servers, it's now easy to secure yourself with HTTPS. Here are the steps.

1. Download and run the [Sandstorm install script](https://sandstorm.io/install/).

2. Choose a subdomain of `sandcats.io` you want to register (and tell us how to contact you to recover the domain).

3. Visit your server's new web dashboard by clicking the URL printed out by the install script.

Sandstorm automatically enables HTTPS as part of step 2. There's no setting up reverse proxies, no creating certificate signing requests, no waiting on a CA. Your private key is on your machine and never leaves.

### Why you need HTTPS

HTTPS (also commonly but incorrectly called "SSL") is important because the web's original protocol, HTTP, is insecure -- anyone in a coffee shop near you can see what you're browsing or modify your traffic. This is a real threat; here's a [video of someone stealing HTTP traffic](https://www.youtube.com/watch?v=my4oZqBU5zE) that was made as a school project.

Over the past five years, web companies like [Google](http://googleblog.blogspot.com/2011/10/making-search-more-secure.html), [Facebook](https://www.facebook.com/notes/facebook-engineering/secure-browsing-by-default/10151590414803920), and [Twitter](https://blog.twitter.com/2012/securing-your-twitter-experience-with-https) have been switching their sites to require HTTPS. Sandstorm.io and all of its subdomains have always required HTTPS. The Chrome team is planning to [show a broken padlock](https://www.chromium.org/Home/chromium-security/marking-http-as-non-secure) for plain HTTP sites. Companies that are responsible for a lot of user data have been making time to secure their sites with HTTPS.

### Our search for a certificate vendor

Providing automatic HTTPS is more than just a technical problem. To be trusted, the certificates must come from a Certificate Authority that is already trusted by your browser. To deliver certificates to you, we needed to work with such an authority.

So, earlier this year, I began to talk to people at CAs. But there was a complication: Sandstorm [requires a wildcard certificate](https://docs.sandstorm.io/en/latest/administering/wildcard/) to achieve some of its security properties. That is, if your server is `example.sandcats.io`, all subdomains `*.example.sandcats.io` must be covered as well. Wildcard certificates are usually expensive -- an order of magnitude more so than normal certificates. And when I talked to the inspiring folks at [Let's Encrypt](https://letsencrypt.org/), I discovered that they weren't ready to issue wildcard certificates.

I was lucky enough to find Michael Trotta at [GlobalSign](https://www.globalsign.com/). He believed in our mission of making servers safe and easy for more people to run. Working together, we were able to set up a deal allowing us to offer free wildcard certificates under sandcats.io. Contracts were signed, and then it was time to write some code.

### Defending against the next Heartbleed: Weekly key rotation

We want Sandstorm to require as little maintenance as possible, so that there's no reason not to run your own server. We especially want security problems to be solved with no action on your part.

One of the biggest headaches for server admins in recent memory was [Heartbleed](http://heartbleed.com/), a bug in the popular OpenSSL library which could have revealed people's private encryption keys to attackers.

Patching the bug is the easy part: If you have automatic updates enabled, your Sandstorm will be updated within 24 hours of any release without any action on your part.

What made Heartbleed so bad, though, was not just that systems had to be updated, but that all HTTPS keys and certificates had to be revoked and regenerated, in case they had already been stolen. This was a huge pain for sysadmins, and a huge pain for the certificate revocation infrastructure, which was not designed for everyone in the world to revoke certificates simultaneously.

To solve this, Sandcats issues certificates valid for only seven days. Your server will automatically generate a new key and receive a new certificate every week. So, any compromise of your private key "fixes itself" over time. Granted, a week is a long time to live with the possibility of an active MITM attack, but realistically it took much longer than that for most revocations to take effect after Heartbleed (if they ever took effect at all).

### The result: Every Sandstorm app is secure for self-hosters

Because Sandstorm handles HTTPS, rather than the app or the system administrator, the [Etherpad package](https://apps.sandstorm.io/app/h37dm17aa89yrd8zuqpdn36p6zntumtv08fjpu8a8zrte7q1cn60) in Sandstorm doesn't need to have any kind of special integration, nor does the [Rocket.Chat package](https://apps.sandstorm.io/app/vfnwptfn02ty21w715snyyczw0nqxkv3jvawcah10c6z7hj1hnu0), nor does the [Brainstorm package](https://apps.sandstorm.io/app/sptx6z162fp1w8rwe92vc8tzm76v0mk0wwc9yafze2vpghjs48j0), nor any other.

So take a moment and [install Sandstorm now](https://sandstorm.io/install/) to securely enjoy these kinds of apps, or at least [try the online demo](https://demo.sandstorm.io).

And if you already have a Sandcats-enabled install of Sandstorm from before today, check out the [documentation](https://docs.sandstorm.io/en/latest/administering/ssl/) to enable HTTPS!
