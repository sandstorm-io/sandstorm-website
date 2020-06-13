---
layout: post
title: "Let's Encrypt support for Sandstorm and Sandcats"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Sandstorm now has built-in support for fetching certificates from Let's Encrypt. This applies both to Sandcats and to custom domains.

## Let's Encrypt with Sandcats

### Backstory

[Sandcats.io](https://sandcats.io) is Sandstorm's free dynamic DNS and TLS (aka SSL) certificate service. Since 2015, Sandcats has been making it easier to set up self-hosted Sandstorm servers, by letting anyone claim a subdomain of `sandcats.io` on which to host their server, automatically configuring DNS and HTTPS.

[Sandstorm requires a wildcard host](https://docs.sandstorm.io/en/latest/administering/wildcard/) so that it can create sandboxes by assigning random hostnames. So, the certificates issued by Sandcats.io have always been wildcard certs. Back in 2015, that was a challenge: at the time, Let's Encrypt did not yet offer wildcard certs, so the only way to get one was to pay for it. Unfortunately, many CAs considered wildcards to be an "enterprise feature" and charged excessive amounts of money for them, often hundreds or even thousands of dollars.

So how were we able to offer wildcard certificates for free? Well, we negotiated a deal with GlobalSign. Recognizing that subdomains of Sandcats.io were unlikely to be enterprise customers, and recognizing a growth opportunity if Sandstorm took off, GlobalSign offered us a deal that worked. Sandstorm was a funded startup at the time, and we were happy to pay a few bucks per certificate-year and call it "customer acquisition cost". We paid for thousands of certificate-years upfront, anticipating growth.

But, the growth we hoped for didn't happen, and we only ever had about 500 self-hosted servers using Sandcats. In 2017, [Sandstorm failed as a startup and reverted to being just an open source project](https://sandstorm.io/news/2017-02-06-sandstorm-returning-to-community-roots). Having never seen the growth we were hoping for, we hadn't even come close to using up the first block of certificates we had paid for from GlobalSign. Since we had already paid, we left the system running, happily issuing certificates.

Fast forward to 2020. Finally, our contract is running out. In fact, it did run out, in early March -- embarrassingly, I had miscounted how much time we had left. However, GlobalSign was nice enough to give us a small extension, giving us time to migrate our users without disruption. And it turns out that, these days, Let's Encrypt supports wildcards. So, moving to them is the obvious choice.

### What's New

Starting a few days ago, all Sandstorm servers using Sandcats.io are in the process of switching to Let's Encrypt for future certificates. The process is designed to happen slowly so that we can address any problems that arise, but so far everything has been smooth. All servers should be transitioned by the end of the month.

If you'd like your server to start using Let's Encrypt immediately, visit the TLS certificates admin page at `/admin/certificates` on your server, click the button to create an ACME account (you will be prompted to agree to Let's Encrypt's Terms of Service), and then click "Fetch Certificate Now".

Note that at present, we have not yet updated the install flow, so newly-installed Sandstorm servers will still use a GlobalSign certificate initially and then will switch to Let's Encrypt later. We'll be updating the installer soon, and then we will decommission the GlobalSign flow.

## Let's Encrypt with non-Sandcats domains

To implement Let's Encrypt support for Sandcats.io, it made sense for your self-hosted Sandstorm server to directly talk to Let's Encrypt via the ACME protocol. This differs from the old GlobalSign flow, in which Sandstorm would talk to a central Sandcats.io server, which then talked to the GlobalSign API on your behalf. This was necessary for GlobalSign since Sandstorm the company was paying for the certificates, so our credentials were needed when talking to the API. But for Let's Encrypt, the Sandcats.io central server only needs to set some DNS records to pass an ACME DNS-01 challenge; everything else happens on your own server.

Given this implementation, it was straightforward to support domains other than sandcats.io. I chose to use the [ACME.js library](https://git.rootprojects.org/root/acme.js.git) to implement the ACME protocol, and it turns out this library already had a suite of plugins to support a variety of popular DNS providers. If your domain uses any of the DNS providers supported by ACME.js, then Sandstorm can now automatically obtain TLS certificates for your domain from Let's Encrypt.

However, at present, initial setup is difficult, because of the chicken-and-egg problem: How do you access the admin UI to configure certificates, without a certificate? And than brings me to...

### Help make it better!

Currently, there are two major problems with setting up Sandstorm TLS on your own domain:

1. The UI is very bad. I am a terrible designer, and I didn't have much time to work on it. Especially bad is the fact that to configure any DNS plugin, currently, you need to enter a JSON blob into a textarea, where the JSON blob's format is different for every plugin and documented in their respective READMEs as a JavaScript method parameter (not even JSON)... Only experienced programmers could possibly understand what to do. We should make the UI better. [See issue #3300.](https://github.com/sandstorm-io/sandstorm/issues/3300)
2. There is a chicken-and-egg problem at install time, as the current UI to configure TLS is accessed over HTTP -- which implies that you already need a TLS certificate for it to be secure. We need a CLI configuration option as an alternative. [See issue #3367.](https://github.com/sandstorm-io/sandstorm/issues/3367)

If you'd like to help implement either of these, click on the issue links above and comment!

