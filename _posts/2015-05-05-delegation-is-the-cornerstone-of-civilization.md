---
layout: post
title: "Delegation is the Cornerstone of Civilization: Sharing in Sandstorm.io"
author: David Renshaw
authorUrl: https://github.com/dwrensha
author2: Kenton Varda
author2Url: https://github.com/kentonv
---

We sometimes describe Sandstorm as: "Like Google Docs, except open source, you can run it on your own server, and you can extend it with apps written by anyone."

Sandstorm is all about collaboration -- we have apps for real-time collaborative document editing, chat rooms, even collaborative music streaming. Collaboration, of course, requires access control. Sometimes you want some people to be able to edit a document while others can only read. Up until now, Sandstorm relied on each app to implement its own access control model, and many simply did not. For example, with Etherpad on Sandstorm before now, you could only share full write access.

Today, we're introducing Sandstorm's new built-in sharing model. With it, apps can define a set of "permissions" (like "read" and "write") which make sense for the app, and then Sandstorm itself will present a user interface by which the user can grant these permissions to other users. Since Sandstorm is designed to support fine-grained app containers (where, for example, each Etherpad document runs as a completely separate instance of the app in its own container), Sandstorm can implement this access control model at the container level, freeing the app of most of the work. The app need not track users itself; Sandstorm will tell it (e.g. through HTTP headers) exactly which permissions the current user has, so all the app needs to do is implement those.

Moreover, Sandstorm implements a radical _capability-based_ sharing model, which emphasizes the importance of *delegation*. Under our model, if you have access to a document, you can share that access with others, _without_ requiring the document owner to intervene. This is important, because any obstacle to delegation is an obstacle to getting work done. Marc Stiegler said it best:

<blockquote style="font-weight: normal">The truth of the matter is: delegation cannot be prevented. The further truth of the matter is: we do not appreciate how fortunate it is that delegation cannot be prevented.
Because in fact, <b>delegation is the cornerstone of civilization</b>. - Marc Stiegler</blockquote>

<div style="margin:1em auto"><iframe class="youtube" src="//www.youtube.com/embed/vrbmMPlCp3U?start=3970" frameborder="0" allowfullscreen="true"> </iframe></div> 

More on this in a bit, but first let's look at how it works.

### How it works

Consider the [GitWeb app](https://demo.sandstorm.io/appdemo/6va4cjamc21j0znf5h5rrgnv0rpyvh1vaxurkrgknefvj0x63ash ).
With the new sharing features in place, after Alice creates a new repository
she can, for example, share read-only access with Bob and share read/write access with Carol.

<img src="/news/images/better-sharing-model-1.png" style="width:80%;margin:0 auto;display:block">

Then, in turn, both Bob and Carol can reshare the repo to other users. If they both share their full access to Dave, then Dave gets read/write access.

<img src="/news/images/better-sharing-model-2.png" style="width:80%;margin:0 auto;display:block">

If Alice now unshares with Carol, then Carol loses all access and Dave loses write access. Dave continues to hold the read-only access that he received from Bob.
Carol's share to Dave continues to exist, but it no longer carries any permissions, as Carol herself no longer holds any permissions.

<img src="/news/images/better-sharing-model-3.png" style="width:80%;margin:0 auto;display:block">

Throughout this whole interaction, the app itself has no need to keep track of users! It only needs to know how to filter requests based on permissions.
Teaching GitWeb to do this was easy, requiring only a [few small changes](https://github.com/dwrensha/gitweb-sandstorm/commit/7f510ec82a935a9f94ebcf9651983d0bbadcf82a )
in configuration files. The app remains dead simple. The only data that it stores is the Git repository that it hosts.
There is no in-app user database.

Apps have complete control over the meanings of permissions. While "can read" and "can write" permissions will be sufficient in many cases,
some apps, such as Groove Basin, might support a much wider range of permissions.
In our [updated Groove Basin package](https://demo.sandstorm.io/appdemo/wfg1r0qra2ewyvns05r0rddqttt57qxurz3nz5z95rjnm63et7e0 ), sharing carries such diverse permissions
as "can listen," "can control the audio stream," "can upload music," and "can edit tags and delete music."

### Delegation: Why you want it

Traditional access control is accomplished using "access control lists" (ACLs), in which a document owner (Alice) maintains an ACL for the document specifying exactly who has access (Bob and Carol). In many systems, Bob and Carol cannot directly add a new person (Dave) to this ACL -- they must ask Alice to do it. Usually, this is treated as a security "feature".

**Preventing delegation is not a feature. It provides no security benefit, and it creates obstacles to legitimate work.**

For example, say Alice has asked Carol to update the document to add some data that Carol has collected, with a deadline of 6PM. Around 4PM, Carol realizes she won't have time, so she asks her assistant, Dave, to do the work. Unfortunately, Dave doesn't have access, and Alice is unavailable because she's in a meeting. Now what?

Here's what inevitably happens: Carol copies the whole document into a _new_ document, and then shares that with Dave. Later, when Dave is done, Carol copies the contents of the new document _back_ into the original, overwriting it.

Or, worse, Carol just gives Dave her password.

What just happened? **Carol bypassed the access control that prevented delegation to Dave!** In fact, she did so _trivially_; no "hacking" required. It is obvious, in fact, that [there is _no_ technology](https://www.youtube.com/watch?v=vrbmMPlCp3U#t=1h5m30s) which would prevent Carol from delegating access to Dave, except to cut off all communications between Carol and Dave, which would be silly. So, our security "feature" actually provided no security benefit.

With that said, what Carol did was annoying and error-prone. It took time, and the document could have been damaged, especially if someone else were editing at the same time and had their changes overwritten. It would have been much better if Dave could have simply had direct access to the document.

So, that's what Sandstorm allows.

### Policies and Auditability

There is an objection to unrestricted delegation which has some merit: preventing delegation can help guard against accidental leaks. For example, I might share a sensitive document with a coworker for review, but I might not trust that my coworker really understands the sensitivity of the document. I trust my coworker not to violate my wishes, but my coworker might not understand that I don't want them to reshare. I'd feel a lot more comfortable if I can simply prohibit resharing. Yes, they can always go out of their way to get around any barrier I put up, but hopefully it will be obvious to them that they shouldn't.

This is a valid point, but solving it via the heavy-handed ACL model is overkill. As a user, what I really want is not a draconian security wall, but two things:

* A way to inform people of my wishes with regards to resharing.
* A way to hold them accountable if they break my wishes.

Sandstorm aims to provide both of these:

* You'll be able to express "policies" when sharing, such as "please don't reshare." When people attempt to anyway, they will be informed that this is against your wishes, and perhaps blocked (at the UI level) from doing so. This is not strictly a security feature, but simply risk management: it helps nudge people in the right direction.
* Sandstorm tracks not just a list but a full sharing _graph_. This means it is always possible to tell not just who has access but _how_ they got access. We will be developing visualizations and auditing tools so that when you discover someone has received access that shouldn't have, you can find out whom to blame. And as mentioned above, if you revoke that person's access, then _everyone_ they reshared to transitively loses access -- unless you decide to restore those connections by sharing with those people directly.

For enterprise users, we will further develop features that allow system administrators to set policies and audit access across an organization.

Many users may never need these features. That's fine -- the basic sharing interface works intuitively without requiring you to understand "sharing graphs" or "policies". But for those who need it, especially in a business setting, these features will be invaluable.

### Try it now!

Sharing is a new feature and we still have lots of work to do on it, but the initial version is already live.
If you want to try sharing but have not yet [set up your own server](https://github.com/sandstorm-io/sandstorm#installing-the-easy-way ), you can [use the demo](https://demo.sandstorm.io ).
We've already enabled nontrivial permissions on GitWeb, Groove Basin, and Etherpad, and more app updates will be coming.
Better yet, try [writing an app](https://github.com/sandstorm-io/sandstorm/wiki/Sandstorm-App-Developer-Handbook ) that takes avantage of the new features.
Enabling apps to easily support sharing is just one more way that Sandstorm makes [open source web apps viable](https://blog.sandstorm.io/news/2014-07-21-open-source-web-apps-require-federated-hosting.html ).
