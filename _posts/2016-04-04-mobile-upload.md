---
layout: post
title: "How to auto-upload mobile photos to your Sandstorm server using Davros"
author: Jade Q. Wang
authorUrl: https://github.com/jadeqwang
---

Today I'm going to share how I set up Davros for mobile photo syncing. 

Like most people, I appreciate my phone automatically upload newly taken photos to the cloud, which is far more convenient than the primitive old days of hunting for a USB cable in my purse or desk. Like most people, I have also relied on giants like Google (or Apple) to store and/or sync those photos with my laptop. 

Although I applaud their security efforts, I simply prefer securing my photos on hardware I control, where I have the option to [truly](https://en.wikipedia.org/wiki/ICloud_leaks_of_celebrity_photos) and [permanently](http://tilde.club/~mathowie/files/e0c99a3e95d5d907ab156fca2ba889bf-36.html) delete them if I want to. 

So ... all the same convenience while giving up none of the control of my data? Let's get started!

Please note that for ease of copying and pasting a few long strings, you'll want follow along on mobile.

## 1. Create a Davros grain (instance) on your Sandstorm server. 

Go to your Sandstorm server and create a grain (instance of the app) of [Davros](https://apps.sandstorm.io/app/8aspz4sfjnp8u89000mh2v1xrdyx97ytn8hq71mdzv4p4d8n0n3h), which is an open source alternative to Dropbox.

<img width="90%" src="/news/images/create_davros_grain.jpg">

If you don't already have a Sandstorm server of your own, you can sign up for [Oasis](https://oasis.sandstorm.io), our managed hosting service, or [self host on your own machine](https://sandstorm.io/install).

Since I often photo or video bug reports for my wearable devices, I'm going to use a grain I already use for other bug reports. Here, I have opened the grain on my phone.

<img width="50%" src="/news/images/davros_grain.png">

## 2. Install the ownCloud mobile client

I went to the Google Play store on my phone and installed the ownCloud mobile client. (Or, if you're if you're on an iOS device, install it from the Apple App store.)

<img width="90%" src="/news/images/app_store_screenshots.jpg">


##3. Copy and paste 3 strings to configure

Using my mobile browser, I went to the 'Clients' page of my Davros grain on my Sandstorm server.

<img width="50%" src="/news/images/nav_to_clients_page_screenshot.jpg">

And I copied these three strings (server address, username, password) from the Davros Clients settings page into the correspodig three fields in the ownCloud mobile app:

<img width="90%" src="/news/images/copy-pasta-screenshot.jpg">

##And done!

Now my ownCloud mobile app has access to my Davros grain. I'm going to test this by taking a photo of Garply. As soon as I take the photo, I see a notification that it's uploading. So far so good.

<img width="50%" src="/news/images/uploading_screenshot.png">

I immediately check my Davros grain on Oasis, where I find the Garply photos, living in an automatically created "InstantUpload" folder. When I checked my desktop a little while later, here's the Garply photo on the corresponding folder in my synced desktop folder.

<img width="90%" src="/news/images/skitch_desktop.jpg">




