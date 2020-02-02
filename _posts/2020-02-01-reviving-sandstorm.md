---
layout: post
title: "Reviving Sandstorm"
author: Ian Denhardt
authorUrl: https://github.com/zenhack
---

Hi! I'm Ian Denhardt, a long-time Sandstorm user and community member.
I have some exciting news to share. Let's start by talking about some
recent history.

It's no secret that development on Sandstorm has been pretty sparse
since Sandstorm-the-business [shut down in 2017][1]. The tone of that
announcement was optimistic; while Sandstorm had failed as a business,
as an open source project it had attracted an vibrant community, and
there was hope that the project could continue to be successful outside
of a for-profit setting.

Things didn't go as smoothly as we'd hoped, however. While Sandstorm had
had a healthy community of folks using it and building apps, there had
been fewer contributions to Sandstorm itself from outside the company,
and no one but Sandstorm employees had been doing major core development
on a regular basis. Additionally, Kenton has had less time than he'd
hoped to work on Sandstorm.

The project never quite died. It has continued to receive security and
maintenance updates. [Internationalization support was added][2], and
several folks have stepped up to translate the UI into other languages.
A few other features landed, and a few apps continued to see updates as
well. But it would be more than fair to say that the project had stagnated,
and while I and many others were still using it, it was clear that
development wasn't going anywhere fast.

That looks to be changing.

About two months ago, Lyre Calliope sent [an email][3] to the sandstorm-dev
mailing list, starting a discussion on how to get the project moving again.
Since then, I and others have been contributing code and documentation,
and have had weekly "office hours" meetings. In spite of a full
time job, moving across the country, and a new baby to take care of,
Kenton has still managed find a bit of time to review and merge pull
requests, and help plan. Here are some highlights of what's been happening
in terms of development:

- I recently implemented support for apps scheduling background tasks,
  something that's been a major pain point for developing certain types
  of applications. I'm working on a few follow-up tasks and related
  functionality, and put together a [demo app][4] that uses the
  Sandstorm's Powerbox API. To me, this is one of Sandstorm's most
  exciting features, but having been implemented only shortly before
  the company shut down, it still has rough edges and the documentation
  is lacking. I plan to fix that.
- Adam Bliss updated our tooling for managing the [docs website][5],
  to make review easier and so we can get updates out more quickly.
  As part of this, he's updated the GitWeb app, and included support
  for static publishing. We're calling the feature "GitWeb Pages".
  He also fixed a long-standing [bug][6] in [vagrant-spk][7], which
  will make the app development experience better.
- Lauri Ojansivu has been working on internationalizing the mass
  transfer feature that was added recently, and translating it into
  Finnish.
- Jacob Weisz has done a ton of much-need work triaging our issue
  tracker, and has been working on some updates to vagrant-spk,
  looking to get a 1.0 release out soon.

As a community we're once again very hopeful, and I personally am
committed to spending what time I can making Sandstorm's vision a
reality. If you want to help, join us in the #sandstorm IRC channel
on Freenode, and sign up for the [sandstorm-dev mailing list][8].

[1]: https://sandstorm.io/news/2017-02-06-sandstorm-returning-to-community-roots
[2]: https://sandstorm.io/news/2017-10-28-i18n
[3]: https://groups.google.com/d/msg/sandstorm-dev/cVPH014H2iY/8Em-dPDyBQAJ
[4]: https://github.com/zenhack/hello-sandstorm-oauth
[5]: https://docs.sandstorm.io/
[6]: https://github.com/sandstorm-io/vagrant-spk/issues/213
[7]: https://github.com/sandstorm-io/vagrant-spk/
[8]: https://groups.google.com/forum/#!forum/sandstorm-dev
