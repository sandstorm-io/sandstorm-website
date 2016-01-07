---
layout: post
title: Recap of our August meetup
author: Asheesh Laroia
authorUrl: https://github.com/paulproteus
---

Last Thursday, [RethinkDB](http://rethinkdb.com/) co-hosted the first
[Sandstorm meetup in the South Bay](http://www.meetup.com/Sandstorm-SF-Bay-Area/events/223144969/)
Here's the view of the crowd at their Mountain View office.

<img src="/news/images/2015-08-meetup-rethinkdb.jpg" height="356" width="600" alt="Meetup at RethinkDB HQ">

I gave a talk introducing Sandstorm, inspired by Kenton's blog post explaining
the [motivation for Sandstorm: making it possible for open source and indie
developers to build successful web apps](https://blog.sandstorm.io/news/2014-07-21-open-source-web-apps-require-federated-hosting.html).

[Jorge Silva](https://twitter.com/thejsj) followed that with a talk focusing on
RethinkDB. He explained how
the open source RethinkDB database makes real-time apps easy to build, and showed
how to package RethinkDB apps for Sandstorm. He used the new Sandstorm packaging
tool called [vagrant-spk](https://docs.sandstorm.io/en/latest/developing/).

We then heard four lightning talks.

* [Paul Pelzl](https://github.com/pelzlpj) explained how and why he wrote an
implementation of [Cap'n Proto in OCaml](https://pelzlpj.github.io/capnp-ocaml/).
* [Warren Togami](https://github.com/wtogami) talked about the importance of
security in enterprise chat.
* [Andy Lutomirski](https://github.com/amluto) discussed recent Linux security
vulnerabilities, the history of Linux's surprisingly large attack surface, and
his excitement that Sandstorm will bring [object-capability security](http://erights.org/elib/capability/ode/ode-capabilities.html)
to the world.
* [Ross Light](https://github.com/zombiezen) showed us the simple file
uploading and sharing app he is building using [Go](https://golang.org/). The app
looks sharp and he expects it's almost ready for release. He remarked that it
has a 3MB package file, and that could shrink further as he works on implementing
replacing [sandstorm-http-bridge](https://github.com/sandstorm-io/sandstorm/blob/master/src/sandstorm/sandstorm-http-bridge.c%2B%2B)
with new code using his support for [Cap'n Proto RPC in Go](https://github.com/zombiezen/go-capnproto).

My personal thanks go out to
[Christina Keelan](https://twitter.com/christinakeelan) for handling the
logistics and planning that made the event a success.

I plan to organize September's event in San Francisco and return to the South
Bay in October. If you want to hear about those events,
[join the Sandstorm Meetup group](http://www.meetup.com/Sandstorm-SF-Bay-Area/)!
