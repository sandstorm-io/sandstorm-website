---
layout: post
title: "Packaging Laverna: localStorage within Sandstorm"
author: Jason Paryani
authorUrl: https://github.com/jparyani
---

Last week, I packaged [Laverna](https://laverna.cc/) for Sandstorm and added it to the [app list](https://sandstorm.io/apps/). You can now use this open source note-taking app from any Sandstorm instance with one click. In this post, I explain how a purely client-side note-taking app integrates with Sandstorm for storage.

From the Laverna devs:

> Laverna is a JavaScript note-taking web application with a Markdown editor and encryption support. It's built to be an open source alternative to Evernote.

Laverna is a fully [client side app](https://github.com/sandstorm-io/sandstorm/wiki/Pure-client-apps) and typically stores all its data in IndexedDB/localStorage. In the case of the Sandstorm package, we configure the app to use localStorage and mirror any updates to localStorage to disk using a simple REST backend. On app start, we query the backend, and restore all the keys to localStorage.

Unfortunately (or maybe fortunately), there's no way to monkey-patch the built-in localStorage to support this since it allows you to set keys by doing normal property access, ie. with `localStorage.KEY` or `localStorage[KEY]`. Javascript provides no way to shim over that, at least until [ES6 proxies](https://github.com/lukehoban/es6features#proxies) are widely implemented. 

It's also worth noting that the backend is a very lightweight C++ server that uses the raw Sandstorm API. The backend's only jobs are to serve the index.html, handle GET/POST/PUT/DELETE requests to allow fetching/persisting the localStorage keys, and provide one GET endpoint that lists all the keys that have been stored. Its memory footprint is incredibly small, which makes it ideal for Sandstorm. You can check out the source [here](https://github.com/jparyani/laverna-sandstorm/blob/master/server.c%2B%2B).

Within Laverna, it was surprisingly easy to add the automatic synchronizing. It took very little work to wire it up. You can see exactly how it works by reading [my changes](https://github.com/jparyani/laverna/commit/38d7641fd2b0d64df80132493a933f97757f6413). If there's some interest, let me know by emailing jparyani@sandstorm.io, and I can think about writing a nice looking wrapper around localStorage that would handle this seamlessly.

If you want to test this out, you can try [Laverna on the Sandstorm demo](https://demo.sandstorm.io/appdemo/4dgxs5m0gnjmjpg88mswqsy9fj08t3z6c8kwv4y9tkgxvp9eas9h); look at the network inspector tab in your browser as it runs.