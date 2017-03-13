---
layout: post
title: "The Sandstorm Team is joining Cloudflare"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Recently, we announced that [Sandstorm is returning to its community roots](https://sandstorm.io/news/2017-02-06-sandstorm-returning-to-community-roots), transitioning away from being a for-profit startup and towards being a community-effort, open source project. The Sandstorm team is committed to keep building Sandstorm in collaboration with our amazing community, and we will keep operating Sandstorm Oasis as a service. But, Sandstorm will no longer be our full-time jobs.

So, what will be?

Starting today, most of the Sandstorm team -- including Jade and myself -- now work for Cloudflare.

Sandstorm has actually been a user of Cloudflare since the beginning. Our web site and static parts of Oasis are served through them. I've long been a fan of Cloudflare's focus on security. A few years back, I enjoyed their [Heartbleed Challenge](https://blog.cloudflare.com/answering-the-critical-question-can-you-get-private-ssl-keys-using-heartbleed/) which proved conclusively that, yes, private keys can be leaked by Heartbleed. Although Cloudflare recently suffered from [a widely-reported security incident](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/), their response was impressively fast and transparent.

But a bigger reason I'm excited about joining Cloudflare is that they are big users -- perhaps the biggest users -- of [Cap'n Proto](https://capnproto.org), the serialization and RPC framework developed by Sandstorm. Cloudflare actually [developed the Lua bindings for Cap'n Proto](https://blog.cloudflare.com/introducing-lua-capnproto-better-serialization-in-lua/) and has [spoken publicly about using Cap'n Proto in their logging pipeline](http://www.thedotpost.com/2015/06/john-graham-cumming-i-got-10-trillion-problems-but-logging-aint-one).

Sandstorm, for its part, remains an independent entity, and I won't be working on it during my day job at Cloudflare. However, I will be working on Cap'n Proto. This should be good news for Cap'n Proto fans who have been disappointed by the lack of releases lately. Although Sandstorm uses Cap'n Proto extensively, in our scramble to build Sandstorm we tended to commit changes only to git master while neglecting to build (and test) formal releases. With a larger corporate backer, we can now afford to be more professional, doing more frequent releases, and putting effort into supporting more languages and platforms.

I will also be working on building some fascinating new infrastructure at Cloudflare. As a member of the edge platform team, I'll be coming up with new ways to utilize Cloudflare's machines located in over a hundred data centers around the world. Jade, meanwhile, will be working on building out Cloudflare's community and developer advocacy program.

The Sandstorm community can expect to see me merging pull requests and pushing releases on weekends, with new releases at least every three weeks. There has been a flurry of activity lately around mobilizing community contributions. Join the discussion on [the sandstorm-dev mailing list](https://groups.google.com/forum/#!forum/sandstorm-dev) or on [IRC (#sandstorm on Freenode)](https://kiwiirc.com/client/irc.freenode.net/?channel=#sandstorm)!
