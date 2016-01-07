---
layout: post
title: "Why doesn't Sandstorm just run Docker apps?"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

We get this question a lot. Sandstorm and Docker use the same Linux kernel features for containerization. Docker already has a large ecosystem of apps. Why introduce a new app format? Why not simply position Sandstorm as a UI for Docker? Wouldn't that save a lot of work? Why reinvent the wheel?

The fact of the matter is, Sandstorm and Docker, despite similar underlying tech, are very different platforms. Asking why Sandstorm doesn't run Docker apps is a lot like asking why Android doesn't run Linux desktop apps. If it's the same Linux kernel under the hood, shouldn't it be able to run the same apps? Well, a Linux desktop app would have a lot of problems running on Android. Most obviously, a desktop app's UX would be all wrong on a small touchscreen. Moreover, the app would not fit into Android's security model. It would not understand Android's battery-saving lifecycle rules. It would not know how to tap into the unique devices (e.g. accelerometer, GPS) and opportunities (e.g. connecting with nearby devices) commonly available on phones but not on desktop.

<blockquote>Asking why Sandstorm doesn't run Docker apps is a lot like asking why Android doesn't run Linux desktop apps.</blockquote>

Running a Docker app on Sandstorm would be much the same story. Docker is designed to run off-the-shelf server-oriented Linux software and distributions inside containers. Docker's platform, from the app's point of view, is just Linux. From the user's point of view, you use Docker much like you'd use traditional VMs and compute clusters; it's just a lot more efficient.

Sandstorm, though, is doing something completely different. We are trying to manage personal servers for end users. With Sandstorm, the person deciding what software to deploy is not necessarily a developer or system administrator. They may not know how to use a command line or edit config files. They may not know what a database is, and so aren't likely to understand why they need to set up MySQL before they can run that app they're interested in.

This use case calls for a completely different model, just as phones call for a different model from desktops. We need to design a bunch of things differently:

* Every app must have a web interface, and they must expose all configuration options through that interface.

* Users expect their data to be organized in units of documents or other semantic objects, not in units of databases or relational tables. Apps must set up their own database and encapsulate it appropriately; the user won't do it for them.

* Users should not have to log into every app separately, especially when the app instance already belongs specifically to them and Sandstorm is already protecting access. So, apps must integrate with Sandstorm's unified login system.

* It would also be nice if users did not have to master a different sharing model for every app. Sandstorm supports fine-grained containers, such that every document can actually be in a separate container. This way, the platform can handle sharing consistently across all apps, by applying sharing to the containers. But, apps have to be designed for this.

* Permission grants must be expressed in a way that users can understand. A user does not know what it means to allow an app to communicate on port 25, but they do know what it means to allow an app to send and receive e-mail under a particular e-mail address. In order for such permissions to be enforceable, the platform's security model must actually operate in terms of these semantic permissions, not arbitrary TCP connections.

* Updating an app must be a one-click (or even automatic) process. This means there must be a clearly-defined separation between the app "image" and its instance data, so that the platform is able to replace the former without harming the latter.

* Users _will_ install malicious apps from time to time, and they must be protected from these. The regular Linux kernel interface is far too wide, and critical exploits are found too often. We must instead present a much narrower interface and force apps to adapt. [See our previous post on this.](https://blog.sandstorm.io/news/2014-08-13-sandbox-security.html)

For all these reasons, a Docker app simply would not be able to run under Sandstorm without modification. The modifications needed for typical Linux web apps tend to be light, but they are necessary.

### Why not at least use the container tech?

So, we've seen that it wouldn't make sense to run a regular Docker app on Sandstorm. But, why don't we still use Docker's tech, and simply define an extra set of rules which Sandstorm apps much follow? Sandstorm would only be able to run the apps explicitly targeted for it, but at least we wouldn't be reinventing the wheel technically, right?

Well, first of all, we _do_ use a lot of the same tech as Docker. Namely, we use the Linux kernel sandboxing features, such as namespaces and (soon) cgroups. These features do all of the heavy lifting of containerization.

When it comes to userspace tools, it turns out that we just don't really need anything Docker provides. Docker's tools are designed to be highly adaptable and configurable in order to accommodate a wide range of Linux software without modification. Sandstorm, however, isn't trying to run arbitrary Linux software. Apps already have to be adapted to Sandstorm's environment. So, we are actually better off providing minimal configurability in order to keep the core system simple.

Setting up a Sandstorm sandbox, based on raw Linux system calls, takes only a few hundred lines of code. Using Docker, it would probably be a few hundred lines of configuration instead, while adding a huge new dependency and all the maintenance issues that come with that. We would probably regularly find ourselves needing to push features upstream to Docker which Docker doesn't otherwise need or want. It's a lot of burden that wouldn't buy us anything.

We _do_ often use Docker's build tools in the process of building Sandstorm packages, simply because they provide a structured and reproducible way to gather an app and its dependencies into a chroot environment, which we can then package up. This is a fine option for app developers that does not affect the runtime system.

### To be clear, Docker is awesome

We aren't trying to dis Docker here. For what it's trying to do -- replace VMs with something not as horribly inefficient -- Docker is amazing. We are excited to see it replace legacy IaaS solutions, and we will likely be targeting it as a way to run Sandstorm itself.

But despite an initial appearance of similarity, Docker and Sandstorm simply aren't the same thing, and forced sharing of code for very different purposes would not benefit either project.

_If you want to see Sandstorm succeed, there are 13 days left to [contribute to the campaign](http://igg.me/at/sandstorm)._