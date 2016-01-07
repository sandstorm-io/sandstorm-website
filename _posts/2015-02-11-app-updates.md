---
layout: post
title: "Results from app update week"
author: Asheesh Laroia
authorUrl: https://github.com/paulproteus
---

### Updates to the porting guide

Over the past year, the Sandstorm platform has grown new features to fit
app developers' needs.
For example, Sandstorm apps can now
[send and receive email](https://github.com/sandstorm-io/sandstorm/wiki/Using-Email-From-Your-Sandstorm-App)
and
[export an HTTP API](https://github.com/sandstorm-io/sandstorm/wiki/Exporting-HTTP-APIs),
enabling apps to [federate across sites](http://mediagoblin.org/pages/campaign.html)
or communicate with a mobile app.

The process of porting an app to Sandstorm has also become better-documented
and more reliable.
The
[Porting Guide](https://github.com/sandstorm-io/sandstorm/wiki/Porting-Guide)
contains our collected wisdom on making an app work great under Sandstorm,
including framework-specific advice to streamline the porting process.
It mentions the tool that Kenton wrote last year --
[meteor-spk](/news/2014-08-12-meteor-spk.html) --
that makes porting apps for one framework as easy as running a few commands.
More recently, David's experience maintaining apps like ShareLaTeX and GitLab
resulted in a
[collection of tips for porting Rails apps](https://github.com/sandstorm-io/sandstorm/wiki/Ruby-on-Rails).

I'm heartened to report that in addition to the platform and docs changes,
there are
three
Sandstorm apps actively maintained by their authors: draw.io,
EtherCalc, and LibreBoard. Those apps now appear
at the top of the
[Sandstorm app list](https://sandstorm.io/apps/). In the long run,
the best way
for a Sandstorm
port to stay up-to-date is for the
app's own community to actively maintain the app on Sandstorm as well.

### App update week changelog

The core team still maintains twenty apps, and this experience allows us to
continuously improve the the documentation and automation behind the porting
process and prioritize which platform features to build.
Those apps' own communities have been hard at work, so we took the
past week to make those changes available to users of Sandstorm.

Here's a list of the apps that received updates.

* Etherpad, updated by Kenton. Updated to v1.5.
See their
[CHANGELOG.md](https://github.com/ether/etherpad-lite/blob/develop/CHANGELOG.md)
for more
details. Also added better integration with Sandstorm user accounts, so now your
color stays consistent across sessions and your display name is pre-populated
from Sandstorm.

* Ghost, updated by Jason. Updated from v0.4.2 to v0.5.8. See
Ghost's [releases page](https://github.com/TryGhost/Ghost/releases) for a list
of changes.

* GitLab, updated by David. Kept same upstream version. Improved startup time. Fixed to
account for
[new Sandstorm support for Content-Encoding header](https://github.com/sandstorm-io/sandstorm/pull/229).
Added per-startup session secrets.

* GitWeb, updated by David. Kept same upstream version. Fixed to account for
[new Sandstorm support for Content-Encoding header](https://github.com/sandstorm-io/sandstorm/pull/229).

* Groove Basin, updated by David from upstream v1.4.0 to v1.5.0.
See [Groove Basin's CHANGELOG](https://github.com/andrewrk/groovebasin/blob/master/CHANGELOG.md).
Better
integration with Sandstorm accounts. Enabled the chat/events tab.

* Hacker CMS, updated by Kenton. Updated to a more recent version of Jekyll and
made the tree view sidebar scrollable.

* IPython Notebook, updated by Jason. Updated from v2.0.0 to v2.4.0. See
[IPython's "What's New" page](http://ipython.org/ipython-doc/2/whatsnew/version2.0.html)
for a list of changes.
Also fixed Sandstorm specific bugs where grains could hang on startup or when
clicking "Restart Kernel" in the app.

* Mailpile, updated by Jason. Updated from Alpha II (v0.3.1) to v0.4.3. Unfortunately,
the major changes to Mailpile have involved encryption and key management which
we have removed from the app. As soon as we figure out a good way to keep keys
secure and fully owned by the user, we will add this funcitonality back in.

* MediaGoblin, updated by Jason. Updated from v0.7.0 to v0.7.1. This was a minor
bugfix release. See the
[release notes](http://mediagoblin.readthedocs.org/en/latest/siteadmin/relnotes.html)
for more details.

* MediaWiki, updated by Jason. Updated from v1.23.2 to v1.24.1.
See the [MediaWiki 1.24 release page](https://www.mediawiki.org/wiki/MediaWiki_1.24)
for a list of changes.
Also, Sandstorm specific, enabled the ability to upload images.

* Meteor Todos, updated by Asheesh. The new version lost a feature
(tagging your todo items) and gained some nicer CSS. We used a new app ID rather
than make this truly an upgrade so that people with existing todo lists aren't
disturbed by the feature removal.

* Roundcube, updated by Jason. Updated from v1.0.1 to v1.1-rc. See
the [Roundcube CHANGELOG](https://github.com/roundcube/roundcubemail/blob/master/CHANGELOG)
for a list of
changes.

* ShareLaTeX, updated by David, from upstream pre-v0.1.0 to v0.1.2.
Details at ShareLaTeX's [CHANGELOG.md](https://github.com/sharelatex/sharelatex/blob/master/CHANGELOG.md).
Add
per-startup session secrets.


* Telescope, updated by Jason. Updated from a git head pre v0.9.0 to v0.14.0.
See [Telescope History](https://github.com/TelescopeJS/Telescope/blob/master/History.md)
for a list
of changes. Also fixed Sandstorm specific bugs with profiles not being accessible.

* TinyTinyRSS, updated by Jason. Updated from v1.13 to v1.15.3.

* WordPress, updated by David from upstream v3.9 to v4.1. Changelogs:
[4.0](http://codex.wordpress.org/Version_4.0),
[4.1](http://codex.wordpress.org/Version_4.1).
Hooked up the "New User Default Role" option so that it works as it should
with Sandstorm sharing. Added per-startup session secrets.