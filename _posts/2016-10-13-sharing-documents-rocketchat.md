---
layout: post
title: "Sharing documents with a Rocket.Chat room in Sandstorm"
author: Jade Q. Wang
authorUrl: https://github.com/jadeqwang
---

I'm sharing a pro-tip today because I like making sure that everyone gets the most productivity they can out of Sandstorm. 

Let's say I want to share a [Collection](https://apps.sandstorm.io/app/s3u2xgmqwznz2n3apf30sm3gw1d85y029enw5pymx734cnk5n78h)  with a group of colleagues who are already in the same [Rocket.Chat](https://apps.sandstorm.io/app/vfnwptfn02ty21w715snyyczw0nqxkv3jvawcah10c6z7hj1hnu0) chatroom.  A Collection is similar to a folder or a Gmail "tag": it can contain multiple grains (e.g., documents, [Wekan boards](https://apps.sandstorm.io/app/m86q05rdvj14yvn78ghaxynqz7u2svw6rnttptxx49g1785cdv1h), chatrooms, photo albums). It's useful for organizing and group sharing, so everyone on a particular team is given access to a *collection* of documents, task-trackers, UI mockups, spreadsheets, and anything that's added to it in the future as long as they're part of the group. ([Here's more on how Collections works >>](https://sandstorm.io/news/2016-08-09-collections-app))

To share a grain (e.g., document, spreadsheet, chatroom, Collection) with the chatroom, I first click the + icon in Rocket.Chat. 

![Click on the + button in Rocket Chat](/news/images/rc_button.png)

This opens a [Powerbox](https://sandstorm.io/how-it-works#powerbox) request with a type-ahead search box. Before I've typed anything, I can see the grains that have most recently been opened by me.

![Powerbox list of grains (ordered by most recently opened)](/news/images/rc2.png)

For instance, if I'm looking for feedback for a blog post I drafted in [Etherpad](https://apps.sandstorm.io/app/h37dm17aa89yrd8zuqpdn36p6zntumtv08fjpu8a8zrte7q1cn60), I can type "Etherpad" and it will list all Etherpads that I have access to on this server.

![Search by grain type](/news/images/rc3.png)

Here are all the Etherpads I have access to. But today, I'm actually searching for a Collection: it will return to me all Collections as well as any other grains that have "collection" in the title.

![Search by grain type or title](/news/images/rc4.png)

So I select the collection called "Sales / revenue docs" which contains a whole bunch of Etherpads, Wekan boards, and other grains related to working towards our revenue goals. 

Now I can choose whether I'd like to give everyone in this chatroom the permission to edit (e.g., add additional grains / documents or remove them) or only view this Collection before I connect this Collection with this Rocket.Chat room.

![grant permission](/news/images/rc5.png)

When I share a grain in a chatroom, it automatically renders a snippet which includes the icon for the app that opens the grain. It looks like this:

![snippet](/news/images/rc6_shared.png)

Now, everyone who is in this chatroom has access to this Collection as well as every grain inside it. 

To use these together, go install these apps if you don't already have them: 

* [Rocket.Chat](https://apps.sandstorm.io/app/vfnwptfn02ty21w715snyyczw0nqxkv3jvawcah10c6z7hj1hnu0)
* [Collections](https://apps.sandstorm.io/app/s3u2xgmqwznz2n3apf30sm3gw1d85y029enw5pymx734cnk5n78h)

Do you use Sandstorm to collaborate at work? [Sandstorm for Work](https://sandstorm.io/business) ([60-day free trial](https://sandstorm.io/get-feature-key)) comes with priority support, organization management features, and integration with enterprise infrastructure.

By the way, if you found this useful and would like to see more bite-sized pro-tip style blog posts in the future, please reshare this and let me know (I'm [@qiqing](https://twitter.com/qiqing) on Twitter)!
