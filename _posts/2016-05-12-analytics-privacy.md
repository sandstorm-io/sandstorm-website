---
layout: post
title: "How self-hosted analytics preserve user privacy"
author: Asheesh Laroia
authorUrl: https://github.com/paulproteus
---

Filippo Valsorda just published [an overview of why to use Piwik for web analytics](https://blog.filippo.io/self-host-analytics/) instead of Google's product. He reflects on the fact that he saw **18% more pageviews** with Piwik compared to Google Analytics, seemingly because self-hosted analytics get past ad-blocking browser extensions. I want to reflect on the privacy implications of running your own analytics and explain the nuts and bolts of how Piwik runs on Sandstorm.

Here's what Piwik on Sandstorm looks like.

<img src="/images/2016-05-12-blog-post-piwik-screenshot.png" alt="piwik screenshot">

### How a web analytics service works

For a website (let's say example.com) that that embeds Google Analytics' Javascript tracking code, a web browser like Chrome takes the following steps:

- Download the HTML content of example.com.

- Notice a SCRIPT or IMG tag going to Google Analytics.

- Download the Google Analytics tracking code from Google, whose purpose is to  **tell Google Analytics the URL of the page that included it.** One main purpose of web analytics is to see a chart of which pages are popular, so it stands to reason that if Google runs the analytics tool, Google needs to know what page is being viewed.

Google has a strong [privacy policy](https://www.google.com/policies/privacy/), and this information typically falls under the heading of "Information we get from your use of our services," and I am personally OK with sharing this information with Google Analytics.

### Some people like staying private

According to [W3Techs](http://w3techs.com/technologies/details/ta-googleanalytics/all/all), more than 50% of all websites use Google Analytics. This has a somewhat surprising result: Google's analytics service knows about a _huge_ fraction of all web page visits. After all, any central analytics service can see the webpage visits for all the sites using it. They can even see traffic patterns that each individual site operator cannot.

Some web surfers want to keep their surfing information private. They may be OK with the site owner knowing that someone visited, but Google is not the site owner. They may see [data as a toxic asset,](https://www.schneier.com/blog/archives/2016/03/data_is_a_toxic.html) per Bruce Schneier. Many of them use web browser add-ons like [Privacy Badger.](https://www.eff.org/privacybadger)

As a website operator, this puts you in a bind. If you want to use Google Analytics to get a graph of which pages are popular, you need to share your users' surfing patterns with Google. Google doesn't distribute Google Analytics as software you can run; they only run it as a central service. 

A different way to do web analytics is to use software running on a server that you maintain. This is called **self-hosting web analytics.**

The easiest way to do that is to do what [Filippo Valsorda said:](https://blog.filippo.io/self-host-analytics) run a Sandstorm server and [install Piwik from the app market,](https://apps.sandstorm.io/app/xuajusd5d4a9v4js71ru0cwj9wn984q1x8kny10htsp8f5dcfep0) and copy-paste something into your website.

Today, that's possible with a few presses on a touchpad. Getting to that point involved some fascinating challenges.

### How to share an API token you cannot see

One design goal of Sandstorm is that apps are **[confined.](https://docs.sandstorm.io/en/latest/using/security-practices/#true-confinement)** An app in Sandstorm never learns a URL that outsiders can use to reach it. That way, the app must rely on Sandstorm for access control, which means the "Share access" button can always show the users who has access. Sandstorm can provide one interface for granting and revoking access across all apps.

However, Piwik needs a way to show a URL that a website operator can embed into their website, so that website visitors can be tracked by Piwik!

To get past this Catch-22, [Drew Fisher](https://github.com/zarvox) built a new Sandstorm feature called [offer templates](https://docs.sandstorm.io/en/latest/developing/http-apis/#creating-an-offer-template). Piwik asks Sandstorm to show a templated message, and an IFRAME from Sandstorm appears with that token placed into the templated message. Drew's Piwik package was the first to use it, and it's become the most common way for apps on Sandstorm to create copy-pastable instructions for how to connect to their APIs.

### When to make IP addresses available

Another obstacle was IP addresses. Piwik needs to know the IP address of visitors so it can create a visual map to show website operators where in the world their visitors come from.  However, we didn't want every Sandstorm app to be able to collect this data without user intervention. Drew added a [way for client-side Javascript to optionally share the user's IP address](https://github.com/sandstorm-io/sandstorm/blob/432be37489b210b19d9677f29befcd5c910a0f76/src/sandstorm/api-session.capnp#L28), while keeping the defaults safe. I'll quote him here:

<blockquote class="notbig">
Normally, we strip the remote address from requests, since most applications shouldn't need it.  However, for those that benefit from it (like analytics), clients can opt into passing their IP on to the backend by adding an "X-Sandstorm-Passthrough: address" header to their request.  This would be a privacy leak for WebSession, since the grain can give the client scripts which would send the header, but ApiSession requires a user action, so it's safe here.
</blockquote>

In the context of the above, an ApiSession covers requests that come in via an app's [HTTP APIs](https://docs.sandstorm.io/en/latest/developing/http-apis/) such as Piwik's tracking system, and a WebSession covers requests that come in from the grain owner clicking around, such as a site owner viewing their statistics.

### Enabling the community

When we finished, we had built a foundation that other apps could build upon. You can try [Hummingbird,](https://apps.sandstorm.io/app/4mfserfc04wtcevvgn0jw27hvwfntmt8j468y3ma55kj8d5tj9kh) [Michael Nutt](https://github.com/mnutt)'s real-time analytics tool, and [Radicale,](https://apps.sandstorm.io/app/8kr4rvyrggvzfvc160htzdt4u5rfvjc2dgdn27n5pt66mxa40m1h) [Aleksandr Bogdanov](https://github.com/synchrone)'s package that enables calendar and contact synchronization by combining a few tools.

If you want to make an open source web app that anyone can self-host safely, start at the [Sandstorm Developer Hub](https://docs.sandstorm.io/en/latest/developing/). Sandstorm supports any programming language or stack, like PHP or Meteor or Rust, that runs on Linux. You'll find a [packaging tutorial](https://docs.sandstorm.io/en/latest/vagrant-spk/packaging-tutorial/) and detailed information about offer templates. And if you just want to start using Piwik, [check it out on the app market.](https://apps.sandstorm.io/app/xuajusd5d4a9v4js71ru0cwj9wn984q1x8kny10htsp8f5dcfep0)

<p><a href="https://docs.sandstorm.io/en/latest/developing/" class="linkbutton">See Developer Hub »</a></p>
