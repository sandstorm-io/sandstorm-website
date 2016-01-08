---
layout: post
title: "Roundcube; and avoiding walled gardens"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Today we're releasing our port of [Roundcube](http://roundcube.net), another open source e-mail web app. You can go install it from the app list now, either on your own Sandstorm server or [on our demo](https://demo.sandstorm.io).

![Screenshot](https://sandstorm.io/apps/roundcube.png)

To this you might ask: What happened to [Mailpile](/news/2014-07-07-mailpile.html)?

Nothing happened. We support both! We like Mailpile, but we also want to give you choices. With Sandstorm, you can mix and match apps from competing developers as you see fit, while still retaining the unified experience of Sandstorm.

### Let's end walled gardens

Usually, when you sign up for a company's suite of "cloud apps", you have two choices:

1. Restrict yourself only to the apps that company provides and no others. This way you get a nicely integrated experience, but if one or more apps in the suite aren't to your liking, you are stuck with them.
2. Also use apps from other developers. But you probably have to log into those apps separately, and they won't integrate well with the first company's suite. You end up with a fragmented experience in which you must remember multiple passwords and re-enter the same data into each service.

We call this the "walled garden" problem. Big SaaS (Software-as-a-Service) providers tend to build walled gardens of apps that only integrate with other apps from the same developer.

It would be easy and convenient for us to say that these companies are Evil and just want to lock you in, but that's not true. The reality is that integration across security realms is hard. When each company has their own notion of users that can't easily be mapped to each other, and understandably no company is willing to trust other companies with their security, how can you integrate apps containing private data? The answer in practice is OAuth, but OAuth permissions requests are clunky and disruptive to the UX. Some users are scared off by it -- while others aren't scared enough and just click "OK".

But developers within a company are perfectly willing to trust other developers in the same company to get security right, and so the entire OAuth dance can be skipped in these cases. This makes first-party integrations easy. Now imagine what would happen if a single company's own apps had to OAuth to each other before integration. Imagine, for example, if Google Docs had to ask you for permission to fetch your contact list from GMail before enabling auto-complete of contact names in the share dialog. Probably, Google Docs wouldn't bother, and there would be no autocomplete. Or imagine if the Facebook profile page had to ask for permision to connect to your Facebook photos before you could set your profile photo. This would be a huge pain! And even then, it wouldn't necessarily end the walled garden: with OAuth, an app says "I need permission to talk to GMail," not "I need permission to talk to an e-mail app." There's still no opportunity for you to substitute a third-party app in its place.

With Sandstorm, we're solving a lot of these problems:

* All your apps run under the same roof, whether they are from the same developer or competing developers. You can use a diverse set of apps without having to remember a separate password for each one.
* In place of OAuth, we're building the Powerbox. This UI integrates better into the app's UX by simultaneously acting as a picker and permissions granter. Apps usually need to present a picker anyway, so this is less disruptive. For example, if an app wants you to choose some contacts to which to send invitations, instead of first asking for permission to _all_ your contacts just to display a picker UI back to you, the app will ask Sandstorm to display a Powerbox picker for contacts. Only the contacts you choose will be passed to the app. So, the UX is exactly the same, except without the separate permissions check, and yet it is more secure. The same idea would apply to choosing photos, or choosing anything else.
* When using the Powerbox UI, the requesting app does not name an exact receiving app it wants to access, but instead specifies a protocol. So instead of saying "I need access to Mailpile," the app would say "I need access to an e-mail app," and you could potentially choose Mailpile, Roundcube, or any other e-mail app. Apps do have to implement compatible protocols, which can be difficult, but this approach at least leaves open the possibility of a newcomer app emulating the protocols already used by other apps in the space, thereby breaking down the network effect that would otherwise prevent a new app from gaining a foothold.

We hope these design choices mean you get a unified experience no matter which apps you choose to use, and new players can break into the market more quickly, leading to faster innovation.
