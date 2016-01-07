---
layout: post
title: "Graphics and one-click installers for everyone"
author: Jade Wang
authorUrl: https://github.com/jadeqwang
author2: Asheesh Laroia
author2Url: https://github.com/paulproteus
---

Open source web app developers build great apps. But sometimes, backend-minded developers need a little help, from making it easy for end users to install their apps to making their icons and other graphics visually appealing. To make open source web apps [viable](https://blog.sandstorm.io/news/2014-07-21-open-source-web-apps-require-federated-hosting.html) as an ecosystem, the apps must be easy to install and use, and to get the attention they deserve, they should have good-looking icons that convey the purpose of the app.

### Graphics for everyone

Lately, we've been running an experiment -- will app authors be interested in custom graphics, designed by Néna Nguyen at Sandstorm? So far, [the](https://github.com/audreyt/ethercalc/issues/236) [response](https://github.com/cem/dillinger-sandstorm/pull/2) [has](https://github.com/cem/nodebb-sandstorm/pull/1) [been](https://github.com/jacksingleton/hacker-slides/issues/28) [positive](https://github.com/strawlab/neuron-catalog/pull/36)!

So I’m excited to announce we'll do this for everyone who packages their app
for Sandstorm: To support app authors, we are happy to help with graphics. This is on top of the [one-click install](https://apps.sandstorm.io/) for your app that Sandstorm enables, which works just as well [in the cloud](https://oasis.sandstorm.io) as it does for [self-hosters](https://sandstorm.io/install) (see below). For instance, Néna will make an icon for you if you need it. Check out this awesome icon set that Néna made for Wekan (kanban board):

<a href="https://apps.sandstorm.io/app/m86q05rdvj14yvn78ghaxynqz7u2svw6rnttptxx49g1785cdv1h"><img src="/news/images/wekan-icon-gallery.png" width="100%" alt="logos"></a>

*Wekan (open source Trello alternative) icons in varying contexts. Check out [Wekan on the App Market »](https://apps.sandstorm.io/app/m86q05rdvj14yvn78ghaxynqz7u2svw6rnttptxx49g1785cdv1h)*

### One-click installers for everyone

An app written **using Meteor** is the easiest to package -- there's a [special tutorial for Meteor apps](https://docs.sandstorm.io/en/latest/vagrant-spk/packaging-tutorial-meteor). If you input the URL of your GitHub repo below, we can even do a first-run of the packaging for you and ping you with a live demo featuring your own spk (Sandstorm package):

<iframe src="https://docs.google.com/a/corp.sandstorm.io/forms/d/1gj8h2rkeovWxtKP-8nTmouwLLxwEkh5iDNHudlckfE8/viewform?embedded=true" width="760" height="356" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>

Meteor or not, any web app that runs on Linux can be packaged for Sandstorm. Get started with [this documentation link](https://docs.sandstorm.io/en/latest/vagrant-spk/packaging-tutorial).

<a class="linkbutton" href="https://docs.sandstorm.io/en/latest/vagrant-spk/packaging-tutorial/">Packaging docs »</a>

Drop a line to community@sandstorm.io with any questions and we'll make sure you succeed.