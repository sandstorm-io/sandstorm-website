---
layout: post
title: "How to download your Oasis data"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

[We announced in August](2018-08-27-discontinuing-free-plan) that Oasis's free plan would be discontinued on October 14. [As I explained then](2018-08-27-discontinuing-free-plan), we were forced to do this as Oasis costs $1500 per month to run, but was only earning $828 per month in revenue. I have been personally paying the remaining $700 every month to subsidize free users of the service, and I am unable to continue doing so. By limiting the service to only paying users, Oasis will be able to break even.

For the past month or so, the Sandstorm UI has featured a prominent message warning that the free plan was going away:

![screenshot](/news/images/free-plan-discontinue-warning.png)

Unfortunately, we were unable to send an e-mail warning, as there are well over 100,000 free accounts on Oasis, the vast majority of which are abandoned. A mass e-mail would likely have landed us on spam blocklists (and rightly so, as we'd be annoying a lot of people).

I had hoped that the message in the UI was prominent enough that all active users would notice it. However, it appears that some people did not see the message, and now find themselves unexpectedly unable to open their apps. I'm very sorry for this!

### Your data is still there

You can still download your data. To do so, open a grain and click the "download backup" button in the top bar, which looks like a down-arrow:

![screenshot of download backup button](/news/images/download-backup-screenshot.png)

This will give you a ZIP file that contains all the data from the grain.

In some cases, you will be able to open this data easily. However, many apps store their data in custom formats that you may have difficulty opening. In these cases, it's best to use the app itself to access the data, which means you need Sandstorm. One option is to [install Sandstorm on your own server](/install), but not everyone has a server available for this.

As a hack, another option is to use the Sandstorm Demo itself to get temporary access to your grains. The Sandstorm Demo gives you a temporary account which you can use to run any app on the Sandstorm app market, for free. The only catch is that your demo account will be deleted after one hour -- but this should be enough time to upload your grain, open it, and copy out data. In the worst case, after your demo expires, you can always start another demo to extract more data.

To start a demo, **open an incognito window** or log out of Oasis, so that Oasis doesn't know you have an account already. Then, [visit demo.sandstorm.io](https://demo.sandstorm.io) or click the button on the [Sandstorm.io home page](https://sandstorm.io):

![screenshot of demo button](/news/images/demo-button-screenshot.png)

Once the demo has started, make sure to install the app that your grain was created with. Then, visit the "Grains" tab, click "Restore backup...", and choose the backup zip that you downloaded before.

![screenshot of restore backup button](/news/images/restore-backup-screenshot.png)

You now have a (temporary) functioning version of your grain.
