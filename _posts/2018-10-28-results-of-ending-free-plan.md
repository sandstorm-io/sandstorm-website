---
layout: post
title: "Results of discontinuing the free plan"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

[Recently we made the tough decision to end Sandstorm Oasis's free plan.](2018-08-27-discontinuing-free-plan) This change has now been made and the dust is settled. (If you're affected and are unsure how to export your data, [see my previous blog post](2018-10-18-how-to-download-oasis-data).)

Today, for the purpose of transparency, I wanted to show you the results of this change.

First, I'm happy to report that revenue increased more than I expected:

![Graph of revenue showing when change was announced and implemented.](/news/images/revenue-post-free-plan.png)

Timeline:

* August 27: MRR is $828. I announced decision to end the free plan on our blog and Twitter.
* September 2: MRR is still $828. I updated Oasis UI to add prominent warnings for free users.
* October 17: MRR has reached $1104. I flip the switch to turn off the free plan.
* October 28: MRR is now $1428.

Second, server resources were reduced. In particular, utilization of Oasis's "worker" machines (where users' apps actually run) dropped in half:

![Graph of CPU usage showing when change was implemented.](/news/images/cpu-post-free-plan.png)

We previously had four worker VMs, each of which was a GCE "n1-highmem-2" machine costing $60.50 per month. We were able to cut two of those machines for a savings of $121.

Sandstorm currently runs 13 other VMs -- six others to operate Oasis itself, three to run our web site and app market, two for Sandcats.io DNS, one for monitoring and one for metrics aggregation. It's likely that we could further consolidate some of these, although these machines run smaller-sized instances with bespoke purposes meaning it will take a lot more work for comparatively smaller savings.

In August I estimated that the cost to continue operating Sandstorm (including servers and corporate maintenance) at about $1560 per month. With the server reduction, we're now at $1439 per month -- just barely above the $1428 in revenue. So, we went from a $700/month deficit ($8400/year) to break-even by making this change.
