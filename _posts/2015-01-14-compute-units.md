---
layout: post
title: "What are Compute Units?"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

When using Sandstorm's upcoming managed hosting service, your resource usage will be limited in two important ways:

* Storage space, measured in gigabytes.
* Compute time, measured in "compute units", or "CU" for short.

So, what exactly are compute units? Technically speaking, a CU can also be described as a "gigabyte-RAM-hour": using a gigabyte of RAM for one hour consumes one CU. Or, alternatively, using 100 MB of RAM for 10 hours, or using 10GB of RAM for six minutes, is also one CU.

Practically speaking, think of your CU quota like the battery on your phone. Some apps, when they are running, use more CU than others. Sandstorm aggressively shuts down apps when they are not in-use, so apps will only consume CU when you are actively using them (e.g. when you have them open in your browser). As a rule of thumb, we find that many apps use about 1 CU for every 5-10 hours of active use. Some apps -- especially ones with servers written in ahead-of-time compiled languages like C++, Rust, or Go -- may use far less, while particularly inefficient apps may use a bit more. You will be able to check your CU level and see which apps are using it by clicking the CU indicator in the top bar.

Note that when you use an app to publish a web site to a separate domain -- such as Ghost or WordPress -- Sandstorm caches the page content and serves it statically. Therefore, the app does not start up and does not consume CU when a guest merely visits your site; CU is only used if the visitor does something that changes the site (like leaving a comment) or when you open the app's administrative interface.

For our managed hosting service, you will receive a monthly CU allowance. Those who sign up for the "standard" plan (currently slated for $6 / month) will receive 200CU per month. That equates to 1000-2000 hours of using a typical app, which is more time than a month actually has! We expect that most users will never come anywhere near hitting their CU quota.

But what happens if you do hit your quota? We said your CU is like a battery, but it's like a battery that is always charging. When you first create your account, your CU battery starts out full. When it is not full, it recharges at a rate such that over the course of a month it will recharge equal to your monthly limit. So if you run out of CU, go take a walk, and when you get back you'll have some more. And if you run out often, consider upgrading to a larger plan. :)