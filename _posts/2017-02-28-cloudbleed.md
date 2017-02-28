---
layout: post
title: "Impact of Cloudflare security advisory on Sandstorm Oasis"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

A few days ago, Cloudflare [disclosed a security bug](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/) in their services which may have leaked secrets from sites which use Cloudflare. Sandstorm uses Cloudflare as a cache in front of our web site and Sandstorm Oasis, and so some of our users have asked if this problem affects them.

**TL;DR:** If you uploaded or downloaded a grain backup (zip file) between September 22, 2016 and February 18, 2017 (more so between Feb 13 to Feb 18), there is a very remote chance that some portion of the content of your backup could have been leaked to a third party, due to a bug in Cloudflare. We suspect, but cannot say for sure, that no such leakage occurred. We believe that no data other than grain backups could have leaked.

### Details

We believe that Sandstorm services are mostly unaffected (with the exception of grain backups, described below). We intentionally divide our services such that public, static content is served from different hosts from dynamic/private content. We only enable Cloudflare in front of the public, static content (to provide caching and faster delivery). Moreover, the public, static hosts avoid storing sensitive credentials in cookies.

Specifically, we have Cloudflare enabled on the following hosts:

* **sandstorm.io**, which serves our public web site. There are no secrets here.
* **docs.sandstorm.io**, which serves our public documentation. There are no secrets here.
* **dl.sandstorm.io**, from which Sandstorm install packages and updates are served. There are no secrets here.
* **oasis.sandstorm.io**, which serves the static HTML, Javascript, CSS, and images for Sandstorm Oasis. Dynamic content in the Sandstorm UI is delivered -- and user actions are communicated -- via a WebSocket on ddp.oasis.sandstorm.io, which does not use Cloudflare. The user's authentication token is stored in localStorage rather than a cookie and is only ever transmitted over the WebSocket. Sandstorm apps are served from randomly-generated subdomains of oasis.sandstorm.io, which are not served through Cloudflare. However, grain backup uploads and downloads occur on the main host and could be affected -- see below.
* **app-index.sandstorm.io**, which serves public Sandstorm app packages and metadata for use by the app market and for implementing automatic updates. There are no secrets here.
* **apps.sandstorm.io**, which serves the static HTML, Javascript, CSS, and images for our app market. As with Oasis, dynamic content and interaction (mainly, reading/posting reviews) happens via a WebSocket on apps-ddp.sandstorm.io and credentials are stored in localStorage.
* Various internal testing hosts and hosts that only redirect to other hosts.

We chose this design because we rely on Cloudflare only for caching purposes. Since dynamic data cannot be cached anyway, it made sense to form direct connections for that data rather than pass through a proxy, both to reduce our TCB and to improve performance. On the other hand, this means we cannot fully take advantage of Cloudflare's security features such as its Web Application Firewall and DDoS protection, but we felt comfortable with this trade-off.

That said, we've identified one notable exception to our design: When you download a backup of a grain via the Sandstorm Oasis UI, or upload a backup to be restored, the zip file is transmitted through the main Oasis host, proxied through Cloudflare. This seems to be an oversight; it would make sense for these requests to go through the DDP host. These transfers are authorized via short-lived tokens, so there's no risk of Oasis credentials being leaked. However, the contents of a .zip file could possibly have been leaked by Cloudflare.

Cloudflare reports that the bug existed between 2016-09-22 and 2017-02-18, with the greatest potential impact being in the last four days of that period. If you uploaded or downloaded a grain backup in that time, it could have been leaked. However, Cloudflare reports that the incidence of such leaks was extremely small, and each instance would have leaked data from an essentially random website served by Cloudflare, of which there are many (Cloudflare handles some 10% of all internet traffic). Given the probabilities, it is likely that no Sandstorm grain backup data was actually leaked. There is also so far no evidence that anyone was actively exploiting this bug.

With all that said, if you are worried about the possibility that your data was leaked, the proper course of action depends on the app and grain involved. Sandstorm is explicitly designed to keep credentials out of the hands of apps, so usually the only sensitive information in a grain backup is information that you gave to it yourself. For example, if you had an Etherpad document where you kept a list of passwords (and you downloaded a backup of that document recently), you may want to change those passwords. Otherwise, there is nothing to do.

### Editorial

Bugs like this probably exist in a lot of software. The Cloudflare bug is notable because:

1. It was discovered. (Most bugs aren't.)
2. Cloudflare handles some 10% of all internet traffic, meaning that basically everyone on the internet is possibly affected.

It's important to keep in mind that security is not binary. Security is about risk management. The Cloudflare bug did not change anyone's security level from "secure" to "insecure" -- instead, it increased the likelihood of any particular person becoming the victim of a real attack from, say, 5.26% to 5.28% (numbers made up to illustrate point). Had Cloudflare been slow to respond once the vulnerability was found, this risk may have shot up. Fortunately, though, they were anything but.

Now, consider the use of password-based authentication. Nearly every service on the web uses it. However, it is demonstrably horribly insecure: Not only do people regularly use bad passwords or reuse the same password across sites, but passwords stored in a database (even if hashed) make it much easier for attackers to escalate a read-only database snapshot into full access privileges (possibly even to sites other than the one attacked). By requiring the user to receive an authentication code by e-mail each time they log in from a new location, a service can hugely reduce their users' risk of compromise -- probably by an order of magnitude! By this measure, bare password-based authentication should be considered a vulnerability, and a much more serious one than Cloudflare's bug.

And yet, people accept passwords because they are more convenient than other mechanisms. _(Well, many people do. Sandstorm does not implement passwords.)_ So, we admit that security is not absolute, but rather a trade-off which needs to be judged against other factors. We need to weigh the risks of our infrastructure being insecure against the value that infrastructure brings -- and Cloudflare certainly brings a lot of value. That said, with good design, it's often possible to reduce and contain risks without sacrificing too much utility. This is one of the core goals of Sandstorm -- to introduce an [infrastructure model](https://sandstorm.io/how-it-works) and [security practices](https://docs.sandstorm.io/en/latest/using/security-practices/) which [mitigate risks](https://docs.sandstorm.io/en/latest/using/security-non-events/).
