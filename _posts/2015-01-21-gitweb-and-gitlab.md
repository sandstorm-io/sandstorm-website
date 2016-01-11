---
layout: post
title: "Gitweb and Gitlab"
author: David Renshaw
authorUrl: https://github.com/dwrensha
---

When I write software, [Git](http://git-scm.com) is usually at the core of my workflow. Therefore I'm particularly excited to announce today that we are releasing not one but *two* Git apps for Sandstorm.

With either of these apps, you can host a Git repository on a Sandstorm server, connect to it with a Git client, and browse it through a web interface. Furthermore, both apps make it easy to share access to a repository without any need to manage SSH keys.

The first app is a simple wrapper around [GitWeb](http://git-scm.com/docs/gitweb), the minimalist Perl CGI script that comes bundled with Git.

[![Gitweb](https://sandstorm.io/gitweb-small.png)](https://sandstorm.io/gitweb.png)

The second is a port of [GitLab](https://about.gitlab.com), a sophisticated Ruby on Rails app whose features include an issue tracker, a wiki, and an editor that allows you to compose and submit commits entirely from a web interface.

[![Gitlab](https://sandstorm.io/gitlab-small.png)](https://sandstorm.io/gitlab.png)

Both apps can now be found on the Sandstorm app list. If you don't have your own server already, [try the demo](https://demo.sandstorm.io).

### The Rise of Modular Frontends

These two apps bring into focus some distinguishing characteristics of the Sandstorm platform.

Web software today tends to consist of monolithic, centralized services -- at least when viewed from a user's perspective. As the number of users grow, the demand for scalability and easy deployability can drive developers to put a lot of effort into modularizing *backends*. So the software often gets split into reconfigurable components like databases, caches, webservers, and message queues, and we see lots of clever ways to organize and orchestrate all of these things. However, as far as the user can tell, the only benefit is that, well, the service still works.

Sandstorm enables a more fundamental kind of modularization. Because it is decentralized and carefully designed to take full advantage of [Cap'n Proto](https://capnproto.org/)'s object-capabilities, Sandstorm allows web software to be split into fine-grained components along *user-facing* concerns. The components can be so finely grained, in fact, that scalability ceases to be a major concern. When each app instance (a "grain" in Sandstorm jargon) contains only a single document, app developers can instead focus on user-facing functionality, and can start thinking seriously about cooperation between apps.

And that's why we've set up the GitWeb and GitLab apps to provide only a single repository per grain. This setup means that sharing a Git repository with another user through these apps works just like sharing anything else in Sandstorm. Although it does imply that some GitLab features, like forks and merge requests, are not supported within our port, it also means that once we've fully implemented Sandstorm's Powerbox interface for sharing capabilities between grains, "fork" and "merge request" can be actions that are allowed to take place between instances of *any* Git app.
