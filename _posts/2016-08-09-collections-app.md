---
layout: post
title: "Collecting Connections through the Powerbox"
author: David Renshaw
authorUrl: https://github.com/dwrensha
---

Starting work on a project in Sandstorm often means creating many grains, each pertaining to a
different aspect of your work. In a typical project, you might have a spreadsheet, a chat room, a
kanban board, and several source code repositories. Sandstorm makes it easy to share these grains
with your collaborators, but until recently, you would need to share each grain to each collaborator
separately --- a task that could quickly become tedious. What if you want to share all of the
project's grains as a single unit?

Now that we have released the
[Collections app](https://apps.sandstorm.io/app/s3u2xgmqwznz2n3apf30sm3gw1d85y029enw5pymx734cnk5n78h),
we have a satisfying answer to that question; to share many grains at once, you add them to a collection.

<img src="/news/images/collections-1.png"
 title="a collection with a chatroom, a kanban board, a spreadsheet, and two git repos">

A collection is a list of grains. Any collaborator with whom you share a collection gets access to
all of the grains in it. On the flip side, when you remove a grain from the collection, your
collaborators lose access to that grain. Moreover, when you revoke a collaborator from the
collection, that (now former-) collaborator loses access to all of the collection's grains.

And since a collection is itself a grain, sharing one works just like sharing anything else on
Sandstorm, through the "Share access" button.

<img src="/news/images/collections-2.png" title='the "Share access" dialog'>

### Powerbox makes it possible

The fact that we have implemented collections *as an app* may come as a surprise, since the notion
of a collection might seem fundamental enough to deserve being baked-in as a core feature of
Sandstorm. However, Sandstorm bakes in an even more fundamental notion: the idea that grains can
refer to and coordinate with one another. The embodiment of this idea is the [powerbox](/how-it-works#powerbox),
an interface --- mediated and auditable by the user --- through which grains can exchange capabilities.

When you click the "Add grain" button in a collection, the collection in fact initiates a powerbox
request. Sandstorm then asks you, the user, to choose a grain with which to fulfill the request.

<img src="/news/images/collections-3.png" title="Making a powerbox request">

Once you select a grain, the collection receives a reference to that grain. It can then use that
reference to retrieve metadata such as the grain's icon and the the name of the app that created the
grain. Crucially, it can also offer the reference to your collaborators, so that your single "Add
grain" action can result in all of your collaborators receiving access to the grain.

Other apps can use the powerbox in the same way. You could write an alternative implementation of
collections, either by starting from scratch or by forking [ours](
https://github.com/dwrensha/sandstorm-collections-app ). And apps whose primary purpose has nothing
to do with collections can also benefit from the ability to request and offer grain references. For
example, a chat room could be enhanced by the ability to embed Sandstorm-aware links to other
grains. Indeed, the latest release of
[Rocket.Chat](https://apps.sandstorm.io/app/vfnwptfn02ty21w715snyyczw0nqxkv3jvawcah10c6z7hj1hnu0) does just that.

### Built with Rust

Although a fast startup time and a small memory footprint are important performance goals for any
Sandstorm app, they are especially important for the Collections app, as it provides such a central
piece of functionality. Collections need to be lightweight so that their integration with the rest
of Sandstorm can feel seamless. Our primary strategy for achieving such performance has been to
develop the Collections app using the [Rust programming language](https://www.rust-lang.org/),
interfacing directly with Sandstorm's [ Cap'n Proto interfaces ](
https://sandstorm.io/news/2014-12-15-capnproto-0.5 ).
Rust has worked well for us so far, and we
have produced some [libraries](https://crates.io/crates/sandstorm) and [examples](
https://github.com/dwrensha/sandstorm-rawapi-example-rust) to help others also get started using it
for Sandstorm app development.

Whether or not you are a developer, now is an exciting time to be
[getting involved](https://sandstorm.io/community)
with Sandstorm. The powerbox is still in its early stages, and the
Colllections app is a hint at the kinds of things it will enable.
So [try it out](https://apps.sandstorm.io/app/s3u2xgmqwznz2n3apf30sm3gw1d85y029enw5pymx734cnk5n78h)
and let me know what you think!




