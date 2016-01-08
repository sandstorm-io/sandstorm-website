---
layout: post
title: "Should apps get network access by default? Android vs. Sandstorm"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Google's Android team has [announced](http://arstechnica.com/gadgets/2015/05/android-m-dev-preview-launches-permission-controls-fingerprint-api-and-more/) that in Android M, users will be prompted to grant permissions to apps at the time the permission is used, rather than an the time the app is installed. That's great! This will make it much easier for users to understand how permissions are being used and allows them to perform a "line-item veto" without uninstalling the whole app. This puts much more power in the hands of users, as it should be.

Unfortunately, permission to access the network is now going to be granted totally automatically. Is this the right thing to do? [Android Police](http://www.androidpolice.com/2015/06/06/android-m-will-never-ask-users-for-permission-to-use-the-internet-and-thats-probably-okay/) argues that it's "probably okay". But some of the arguments feel unconvincing.

At Sandstorm, we have some strong opinions on this. Sandstorm, like Android, seeks to run apps in an environment that enforces a strong permissions model (but Sandstorm targets servers rather than phones). Part of Sandstorm's security promise to the user is that apps are "confined": they have _no communication with the outside world_ unless and until the user grants them permissions. This promise is probably the most controversial part of our [security model](https://github.com/sandstorm-io/sandstorm/wiki/Security-Practices-Overview), but we continue to believe it is the right thing to do. _(Note: Sandstorm's confinement guarantee is not fully enforced at this time, as we have intentionally poked holes in the sandbox during alpha testing in order to work around missing features. But, these will be closed over the next few months.)_

So, let's take a look at the arguments the Android team is making for abandoning confinement.

### Bogus Argument 1: Controlling internet access is redundant on top of other permissions.

The Android team apparently argues that being able to disable an app's network access is not very important as long as all of your sensitive data (say, contacts) is guarded behind other permissions checks. If you don't want the app to upload your contacts to the developer's server, they say, don't give it permission to see your contacts.

This argument, to be frank, makes no sense. What if I _want_ the app to organize my contacts (e.g. because it is a contact manager app), but still do _not_ want it to upload my contacts to the developer's server? The Android model seems to say that I must treat the app and the developer as one entity, which is unfortunate, but perhaps consistent with the SaaS model that Google is used to. We'd like to do better.

In fact, proper confinement allows us to do something rather magical which the Android team seems to be overlooking: If I can confine an app, then I can safely load sensitive data into the app even if the app is malicious! This in turn makes it much easier to feel comfortable using apps from random developers I don't know. It also means I don't need to worry too much about bugs in the app.

Moreover, even if I don't plan to give the app any other permissions, I may still worry about whether the app might consume my resources in order to participate in a DDoS attack, anonymizing proxy service, or bitcoin mining rig behind my back.

### Bogus Argument 2: The app can already leak data by opening a web page using an intent.

The Android team argues that an app can always use Android Intents to ask Chrome to open the developer's web site, encoding my sensitive data as a URL parameter, thereby leaking my data. Because this is possible, they say, trying to provide confinement is pointless.

First, two simple responses:

1. I will likely notice if an app opens Chrome with some weird URL, and be suspicious. That's much better than it happening in secret.
2. The app probably can't participate in a botnet through browser intents.

More importantly, though, if intents allow trivial data leakage, perhaps that is a problem in intents. Perhaps the user needs to be asked whether or not they really want to open that link.

But would that be annoying? I actually don't think it would be too bad. People who have installed multiple browsers on Android today are, in fact, already protected: Android prompts the user to choose which browser to use. The user can, at this point, press "back" to avoid the interaction altogether. Perhaps Android Intents should in fact prompt the user to choose an app even when there is only one choice: in fact, there is always a second choice, which is "don't open this at all". Meanwhile, this interstitial lets the user know that they are switching apps, which may help them be less confused.

### Legitimate Argument: UX is hard.

I think that the real reason the Android team doesn't want to implement internet access as a permission is because getting the UX right is legitimately hard. Pushing an "allow/deny" prompt in the user's face on the first packet sent is genuinely annoying and not very helpful to the user, and the Android people aren't feeling particularly excited about trying to develop something better, perhaps because they think that users don't care (a popular but [incorrect](http://boingboing.net/2015/06/08/internet-users-care-about-thei.html) assumption).

I believe there is a better way: Instead of prompting the user to allow or deny internet access as a whole, prompt them for individual _capabilities_ that the app needs, and then merge that prompt with a choice that they were _already making_. It turns out that most security decisions, if you look carefully enough, are in fact paired with some functionality choice. If you merge the choices together, then one of two things happens:

1. The functionality choice is a choice the user already had to make, and by merging the security choice, you've avoided forcing the user to answer a separate security question.
2. The functionality choice is a choice the user _wasn't_ already being offered, but by offering them a choice, you are giving them a real, useful ability that they didn't have.

Let's illustrate with some examples:

* **Contacts:** Many Android apps want to send "viral" invites to your friends. To accomplish this, the app first asks for permission to your contact list. A _legitimate_ app uses that permission to display a contact picker back to you, from which you can choose the people whom you want to invite, and the app will then only <s>spam</s> invite those people. An _illegitimate_ app will use the permission to spam or harvest your contacts without asking you first. (Sometimes these illegitimate apps are [big names](http://blog.path.com/post/17274932484/we-are-sorry)!) So what are the two choices here?
  - **Security choice:** Do you want give the app permission to use your contacts?
  - **Functionality choice:** _Which_ contacts do you want to invite?

  Android actually provides a contact picker UI which can be invoked via an intent. When used, instead of requesting permission to your _whole_ contact list just to show you a picker, the app asks Android to display the picker, and receives permissions _only_ to the contacts you choose. To the user, the UX is exactly the same (they choose whom to invite), but there is _no_ security prompt, and yet illegitimate use is blocked. Hooray!

  Sadly, many apps choose not to use this built-in picker, perhaps because developers think they can draw a prettier picker themselves and that the user doesn't care about granting the extra permission. In my opinion, the Android-provided picker should be improved and the contacts permission discouraged -- or disabled -- in order to push developers away from drawing their own pickers.

* **Email app:** An app which wants to access your email (say, though IMAP) needs to know your server address and credentials, and then needs internet connectivity to talk to it. But can we do better?
  - **Security choice:** Do you want to give the app permission to talk to your server?
  - **Functionality choice:** What server should the app talk to, and what is the password?
  
  What if the platform implemented a "server picker" UI, so that the mail app merely says "I need a server address, username, and password", the platform displays a form to the user, and then the requesting app not only receives information back, but also receives permission to access _specifically that server_? The user is, again, only doing something they had to do anyway: choose their server. No security prompt was ever presented, and yet the security ends up correct. (Plus, if you take it a step further by having the app proxy requests through the platform, then the platform could in fact hold on to the user's mail server password, preventing the app from accidentally leaking it.)

* **Locked-in Cloud API:** Say a scheduling app wants to talk to the Google Calendar cloud API. The app only integrates with Google Calendar and no other service. Here we see an interesting side-effect come into play:
  - **Security choice:** Do you want to give the app permission to access your Calendar account?
  - **Functionality choice:** Which account do you want the app to use? (If you have more than one.)
  - **Freedom choice:** Which _server_ do you want the app to talk to?
  
  In this case, Android actually has an account management system and picker UI which handles the first two choices as one unit, exactly as I'd like. But I am _not_ allowed to choose which server to use -- I am locked into Google's server. What if there is a third-party service -- or open source server app -- which I would like to use which has implemented a Google-calendar-compatible API? As long as the API is implemented correctly, I ought to be able to make apps use the alternate service, rather than be locked into Google.

  If the security choice is mandatory anyway, and it is done in a _fine-grained_ way (i.e. the request is for a specific server, rather than arbitrary network access), then the freedom choice can naturally be provided at the same time, without the app even knowing about it.

### The Powerbox UI

All of the examples above will be supported through Sandstorm's "Powerbox" UI. In general, the Powerbox is an arbitrary picker which can be invoked by any app and extended by any app. Underlying the Powerbox is the [Cap'n Proto RPC protocol](https://capnproto.org/rpc.html), which naturally represents capabilities (as granted by the powerbox) as RPC object references, automatically taking care of permissions and message routing.

We have been laying the groundwork for the Powerbox for some time. The [infrastructure](https://github.com/sandstorm-io/sandstorm/wiki/Security-Practices-Overview#capability-based-usable-security) is ready, and we are now working on giving it a UI. This will happen gradually over the next couple months.

Even without the Powerbox, Sandstorm is highly usable today. [Try the demo](https://demo.sandstorm.io), [install your own (it's open source)](https://sandstorm.io/install/), or [preorder hosting](https://sandstorm.io/preorder.html).
