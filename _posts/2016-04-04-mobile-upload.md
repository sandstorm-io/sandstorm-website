---
layout: post
title: "How to auto-upload mobile photos to your Sandstorm server using Davros"
author: Jade Q. Wang
authorUrl: https://github.com/jadeqwang
---

Today I'm going to share how I set up Davros for mobile photo syncing. 

Like many people, I appreciate having my phone automatically upload newly taken photos to the cloud, which is far more convenient than the primitive old days of hunting for a USB cable in my purse or desk. Like many people, I have in the past relied on giants like Google (or Apple) to store and/or sync those photos with my laptop.

Also like many people, I have come to feel [increasingly](https://en.wikipedia.org/wiki/ICloud_leaks_of_celebrity_photos) [uncomfortable](http://tilde.club/~mathowie/files/e0c99a3e95d5d907ab156fca2ba889bf-36.html) with this arrangement. I would prefer something a bit more under my control.

So... can I get all the same convenience while giving up none of the control of my data? Let's get started!

Please note that for ease of copying and pasting a few long strings, you'll want follow along on mobile.

## 1. Create a Davros grain (instance) on your Sandstorm server. 

Go to your Sandstorm server and create a grain (instance of the app) of [Davros](https://apps.sandstorm.io/app/8aspz4sfjnp8u89000mh2v1xrdyx97ytn8hq71mdzv4p4d8n0n3h), which is an open source alternative to Dropbox.

<img style="width: 90%; display: block; margin: 0 auto;" src="/news/images/create_davros_grain.jpg">

If you don't already have a Sandstorm server of your own, you can sign up for [Oasis](https://oasis.sandstorm.io), our managed hosting service, or [self host on your own machine](https://sandstorm.io/install).

Since I often take photos or video as part of filing bug reports for my wearable devices, I'm going to use a grain I already use for other bug reports. Here, I have opened the grain on my phone.

<img style="width: 50%; display: block; margin: 0 auto;" src="/news/images/davros_grain.png">

## 2. Install the ownCloud mobile client

I went to the Google Play store on my phone and installed the ownCloud mobile client. (Or, if you're if you're on an iOS device, install it from the Apple App store.)

<img style="width: 90%; display: block; margin: 0 auto;" src="/news/images/app_store_screenshots.jpg">

## 3. Copy and paste 3 strings to configure

Using my mobile browser, I went to the 'Clients' page of my Davros grain on my Sandstorm server.

<img style="width: 50%; display: block; margin: 0 auto;" src="/news/images/nav_to_clients_page_screenshot.jpg">

And I copied these three strings (server address, username, password) from the Davros Clients settings page into the correspodig three fields in the ownCloud mobile app:

<img style="width: 90%; display: block; margin: 0 auto;" src="/news/images/copy-pasta-screenshot.jpg">

(Side note: We know copying and pasting these strings is a bit cumbersome on mobile. We're working on a better approach involving scanning a QR code. For the time being, though, you only have to do this once!)

## And done!

Now my ownCloud mobile app has access to my Davros grain. I'm going to test this by taking a photo of Garply. As soon as I take the photo, I see a notification that it's uploading. So far so good.

<img style="width: 50%; display: block; margin: 0 auto;" src="/news/images/uploading_screenshot.png">

I immediately check my Davros grain on Oasis, where I find the Garply photos, living in an automatically created "InstantUpload" folder.

I also have the ownCloud client installed on my desktop, syncing the same Davros grain there. So, when I checked my desktop a little while later, here's the Garply photo waiting for me.

<img style="width: 90%; display: block; margin: 0 auto;" src="/news/images/skitch_desktop.jpg">
