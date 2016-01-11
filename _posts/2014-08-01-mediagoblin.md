---
layout: post
title: "MediaGoblin: Photo sharing and more"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Today we're releasing a port of yet another crowd-funded open source web app,
[MediaGoblin](http://mediagoblin.org). You can think of MediaGoblin as a
Free Software alternative to Flickr, SoundCloud, YouTube, and others.

![screenshot](https://sandstorm.io/apps/mediagoblin.png)

The app is on the app list now -- try it on the
[demo server](https://demo.sandstorm.io).

MediaGoblin is our first app to take full advantage of Sandstorm's new user
identification features. Whenever a request comes in from a user, Sandstorm's
front-end proxy adds a few headers related to authentication and authorization:

* **`X-Sandstorm-Username`**: Specifies the user's display name, e.g.
  "Kenton Varda". This name is not unique nor stable; it is meant only for
  displaying to other users.
* **`X-Sandstorm-User-Id`**: A hex string identifying the user. This ID is both
  unique and stable, so it can be used to identify when the same user returns
  multiple times.
* **`X-Sandstorm-Permissions`**: A list of permissions that have been shared with
  this user via the Sandstorm sharing interface. An app can define what
  permissions are available to share in its package config. However, note that
  we have not yet implemented the full sharing UI, so for now the creator of
  the app instance is granted all permissions and everyone else is granted
  none. It's up to the app to actually implement this permissions, so for
  now you can simply use it to distinguish between the owner and non-owners.

Our MediaGoblin port uses these headers to automatically populate MediaGoblin's
internal user list. This way you get MediaGoblin's commenting and other
multi-user features without the need to separately log into it.

Note that there are a few things missing from this port, which we plan to fix
in the future:

* Currently, under the hood, apps are exposed only at ephemeral
  hostnames; the hostname may change every time you use the app. This is
  [great for security]({{site.baseurl}}news/2014-07-24-tinytinyrss-plus-security-discussion.html)
  but means that apps cannot expose APIs, since API clients want
  a persistent URL to talk to. Atom feeds are a kind of API. So, for now, we
  have disabled Atom feeds in our port. This is unfortunate, as it changes
  MediaGoblin from "federated" to "isolated". That said, enabling APIs is high
  on our wish list of features, so expect this to return in the future.
* Related to the above, it's currently not possible to deep-link into an app,
  since it runs in an iframe. So, sending someone an individual photo with
  MediaGoblin is hard. We can fix this by automatically passing through any
  additional path added to the outer app URL, and creating a
  `postMessage()`-based API for apps to tell the Sandstorm shell what the
  current path should be.
* Due to a limitation in our proxy implementation, we currently do not support
  very large file uploads. As a result, we had to disable video uploads for now.
  We plan to fix this soon.
* Currently, if you wish to share your MediaGoblin content, you must share
  the app instance by copy/pasting the URL. When another user visits that URL,
  your MediaGoblin server starts up to handle the request. This differs from
  Ghost and Hacker CMS which are able to publish web content in such a way that
  the server does not need to start up for every visitor, only for the editor.
  Unfortunately, this means that a widely-shared MediaGoblin instance may be
  expensive as it may have to run frequently; Sandstorm normally tries to cut
  costs by only running servers a small fraction of the time. We'd like to
  change the app to take advantage of Sandstorm's web publishing features like
  Ghost and Hacker CMS do, so that the server only needs to run when a visitor
  posts a comment, uploads media, or otherwise makes a change. However, this
  may require some invasive changes to MediaGoblin, so we'll need to discuss
  them with MediaGoblin's developers.
* MediaGoblin implements a number of permissions which can be granted to users,
  such as permissions to comment, upload media, etc.
  We eventually want permissions to be set using Sandstorm's unified sharing
  model, but as described above it is not yet complete. So, for the time being,
  you have to set users' permissions inside the MediaGoblin user management
  interface.

All that said, despite some missing features, Sandstorm is by far the quickest
way to get MediaGoblin up and running. We hope our port allows this great
piece of Free Software to reach a wider audience than it could before.

And if you'd like to see the missing features fixed in the future, be sure
to [fund our Indiegogo campaign](http://igg.me/at/sandstorm). :)
