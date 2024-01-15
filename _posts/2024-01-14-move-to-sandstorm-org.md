---
layout: post
title: "Sandstorm now belongs to Sandstorm.org"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

**TL;DR:** Primary maintainership of the Sandstorm project has changed, and a along with that, the project has moved to [sandstorm.org](https://sandstorm.org).

### The "New" Sandstorm Project

I'll start with the point: I, Kenton Varda, am no longer the maintainer of the Sandstorm project. In fact, I haven't really been for quite some time. Instead, a group of avid Sandstorm users, led by [Jacob "ocdtrekkie" Weisz](https://github.com/ocdtrekkie), have been doing a lot more work than me. Many have been involved for quite a few years now.

Yet until recently I have continued to hold the role of gatekeeper: I was the one who could push releases, merge changes, approve blog posts, etc., but was failing to do so. That doesn't make sense.

So, I'm relinquishing that control. Sandstorm now belongs to [the Sandstorm Community under Open Source Collective](https://opencollective.com/sandstormcommunity).

However, Jake and I agree that this change should be very explicit. People coming to the Sandstorm web site today are often confused about Sandstorm's status, even thinking it is backed by a company -- we need to make things clear. And, it doesn't necessarily make sense for for people who who opted into auto-updates back when Sandstorm _was_ a company to keep getting them from the community. Not only because those users may not be comfortable with it, but also because the community itself may not be. Sandstorm's users included (and may still include -- there's no way for us to tell) companies, newspapers, educational institutions, research laboratories, and even government agencies. An auto-update that, say, breaks SAML login could do a lot of damage overnight. For the community to make progress, the stakes need to be a little lower.

To that end, the new project is going to live under a new domain, [sandstorm.org](https://sandstorm.org). Hopefully, the .org TLD, along with some design changes, makes it clear that this is a community project, not a company. sandstorm.io will stay as it is, but with the banner you see above flagging it as historical. If and when sandstorm.org decides to push auto-updates, users will have to manually opt into them.

For my part, I continue to be a Sandstorm user, and as a user I do hope the project is able to make progress under new maintainership. Time will tell.

### Sandstorm's Backstory

For those curious how we got here, here's the whole story from the beginning...

Long ago -- circa 2014 to 2016 -- Sandstorm was a startup, of which I was co-founder. We [ran a successful crowdfunding campaign](2014-08-28-we-did-it) in 2014 and [raised VC money](2015-01-15-sandstorm-1.3M-seed-round-pay-it-forward) in early 2015. We hired 5 people, making a team of 7. We had aimed for a series A round in 2016. We saw a lot of developer excitement for our product on Hacker News and the like, and we expected to follow in the footsteps of other startups who were able to raise a pre-revenue series A based on such excitement. Unfortunately, that did not happen. For whatever reason -- and I could list several possible reasons, but I'll never really know which it was -- investors weren't interested. This set off a panic where we lowered our sights to raising a "bridge round" while trying to produce actual revenue from enterprise sales. But this made things worse: we did not have any idea how enterprise sales worked. We made two sales ever, for a measly 4 figures. Investors ran away.

By the end of 2016, it was obvious the company was going to crash, so we started looking for an acquisition. Too late, of course -- our potential acquirers knew it was a fire sale. There was a common saying in Silicon Valley startup circles at the time that in a pure acquihire, your company is worth $1M per engineer. We learned quickly what should have been obvious: this is a fanciful myth. You cannot block another company from hiring your employees, so why on Earth would they pay you -- or rather, your investors -- for the right? Just to be nice? Several companies were very interested in our engineers, but the best they offered was to acquire the company for $0 and help us wind it down, while making job offers to some or all of the employees.

One company (whom I won't name, but you've heard of) actually told us: "We will add up all the salaries and stock grants we offer your employees, and that's what you can say was the exit price. If you'd like, you can take a chunk of the equity and give it to your investors rather than the employees." I found this extremely disturbing. Another company (you've heard of them too) interviewed the whole team and then informed us they were passing on the founders but hiring two employees.

Another company we talked to was Cloudflare. They too offered to acquire the company for $0, but they made good offers to the whole team without any funny business. Additionally, they had a project in mind for me. They said: "We know we want to let people run code on our edge network, but we haven't figured out exactly how. We could give you ownership of this." I was intrigued. And after paying myself $60k/year for several years, boy did that regular salary look nice.

But I still very much wanted Sandstorm to succeed. So I told Cloudflare, I'll come work for you, but I want to keep Sandstorm the company, and be able to work on it as an open source project. They agreed.

So in early 2017 [we announced that Sandstorm was moving to a community model](2017-02-06-sandstorm-returning-to-community-roots) and, shortly after, that [most of the team joined Cloudflare](2017-03-13-joining-cloudflare).

For some time, I continued to work actively on Sandstorm, and a motley crew of community members helped out. But at the same time, by day, I was having the most fun of my career, having been given a greenfield project to hack on with no distractions. That project became [Cloudflare Workers](https://workers.cloudflare.com/). Within six months we [released a beta](https://blog.cloudflare.com/introducing-cloudflare-workers), and (coincidentally) exactly a year after I joined Cloudflare, we [officially launched the product](https://blog.cloudflare.com/cloudflare-workers-unleashed/). The product has continued to grow on a startup-like trajectory ever since.

So, I was (and am) now essentially the founder of a startup-within-Cloudflare which was actually succeeding. It became hard to put energy into Sandstorm, the project that felt like a failure, even if I still believed in it. Sandstorm became increasingly a chore: Once a month I would review and merge pull requests, update dependencies, and push a new build. If I spent time on it beyond that, it was to [shut down the paid hosting service](2019-09-15-shutting-down-oasis) (which never had enough users to make money) or [switch sandcats.io to Let's Encrypt](2020-06-13-lets-encrypt) when our previous contract with Globalsign expired.

Over time, even just basic maintenance became difficult. Sandstorm uses MongoDB for metadata storage, but it is stuck on version 2.6, which is ancient. I couldn't update it because updating Mongo requires manual intervention, but Sandstorm is something that thousands of users have installed and expect to auto-update. Most of them aren't even aware they are running Mongo. Maybe I could have written code that would automatically handle the migration? That sounded like more work than I was interested in. Eventually, though, the Mongo drivers used by Meteor were updated to a version that didn't support 2.6. So now I couldn't update Meteor, Sandstorm's primary dependency. And we can't update Node, because old Meteor doesn't work on newer Node. (That, by the way, is largely because V8 made a change which permanently broke node-fibers, which Meteor deeply depended on. Oh the tangled web we weave...)

During all this time, the Sandstorm web site remained mostly unchanged, save for the occasional blog post. I think this has been misleading. The site was designed when Sandstorm was a company, by our full-time professional designer. We made some changes after the company shut down, but it still _looks_ like a company's web site. People seem to stumble across the page and believe it is backed by a full-time team rather than a few volunteers. From time to time it even [shows up on the front page of Hacker News](https://news.ycombinator.com/item?id=36192777).

I have felt bad about this, but couldn't quite figure out what to do. Redesign the web site to make it look less professional? I'm not quite sure even how to do that, but I'm pretty sure I don't have time.

In late 2022, the one person who had been contributing code changes to Sandstorm with some regularity, [Ian "zenhack" Denhardt](https://github.com/zenhack), decided to embark on a total rewrite called [Tempest](https://github.com/zenhack/tempest), so contributions to the main project dried up. In early 2023, I gave up pushing monthly releases, since there seemed to be no point: no code changes had been made and no dependencies could be updated.

And then in mid-2023, tragically, Ian passed away in an accident. I'm no good at eulogies, but suffice to say it was a big loss for Sandstorm, Cap'n Proto, and other communities Ian was in.

Later in 2023, Jake wrote a [blog post](https://sandstorm.org/news/2023-10-23-sandstorm-tempest-and-the-future), originally to be posted on sandstorm.io, requiring my approval. The post was ambitious, and even though I wasn't being asked to do anything except approve it, I felt that doing so implied a commitment on my part that I wasn't prepared to make. Instead, we made the decision that I should take myself out of the loop. We came up with the plan to transfer leadership of the project. Sandstorm-the-company had long owned the domain sandstorm.org but not used it; I decided it made sense for this to become the new home of the community project and transferred it to them.

For reasons I can't go into here, I was unable to dissolve Sandstorm the company until some time in 2022. (It turns out I really should have accepted the $0 offer from Cloudflare, to make it their problem, but alas.) But once I could finally do it, our investors and I agreed on a dissolution plan that allowed Sandstorm's remaining IP to be transferred to a non-profit entity representing the community. Of course, the code is open source under the Apache license, so anyone can freely use that. But, the agreement also covers trademarks, domain names, etc. Open Source Collective is a qualifying non-profit.

And so, here we are. Sandstorm now belongs to Sandstorm.org.
