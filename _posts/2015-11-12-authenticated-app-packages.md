---
layout: post
title: "Authenticated app packages on Sandstorm with PGP and Keybase"
author: Drew Fisher
authorUrl: https://github.com/zarvox
imageUrl: https://sandstorm.io/news/images/app-authentication-post-preview.png
---

I like to joke that Sandstorm is a security project posing as a
usability project.  In actuality, it's both!  Sandstorm users deserve to be
confident that the apps they're running are exactly as
the packager built them, and have not been backdoored or accidentally modified
by a malicious ISP, government, or other attacker.  Furthermore, this
information must be easy to consume and verify.

To that end, I've worked with Kenton to make it possible to provide a cryptographic chain of trust
that connects the app package you're installing to the app publisher's online
accounts.  When you install the
[EtherCalc spreadsheet app](https://apps.sandstorm.io/app/a0n6hwm32zjsrzes8gnjg734dh6jwt7x83xdgytspe761pe2asw0),
Sandstorm lets you see that the app was made by the same Audrey Tang that owns
[audreyt on Github](https://github.com/audreyt) and
[au on Keybase](https://keybase.io/au).
Publisher information is shown front and center:

<img src="/news/images/install-ethercalc.png" width="100%" alt="Installing EtherCalc">

To make this all work, there are a few steps involved.

### The app ID is a public key

Sandstorm has required that apps be signed since its inception, providing
a first line of defense against package corruption.  The app is signed with an
app-specific Ed25519 key at package-building time.  Sandstorm uses the public key
as the app's ID on the app market and your server.

This guarantees that app packages cannot be modified by a CDN or the app market
without using a different app ID.  This also had the nice effect of providing
trust-on-first-use properties for apps until we were able to bind these
identities to something more meaningful.  The upshot: when you've installed an
app, only the same app author can provide updates to it.

### Connect the app ID to a PGP key

Since the release of the [app market](https://apps.sandstorm.io/),
app packagers have been PGP-signing statements that they are the author of the
Sandstorm app with that app ID, and include that statement, their PGP public 
key, and the email address associated with that key in their package's metadata.
Since that metadata is in the Sandstorm package file signed by the Ed25519 key,
any server running Sandstorm can verify
that these statements were provided by the person or people who control that
Ed25519 key.  Additionally, since the statement is signed by the PGP key, there
is a trust path from the owner of that PGP private key to the app you are
installing. To defeat this, an attacker would need to convince an app author to
replace both their signing statement and their PGP key in the package metadata
with ones produced by the attacker.


### Connect the PGP key to social identities

The next goal is to connect that PGP fingerprint to meaningful, real-world
identities.  While a handful of people might be able to rely on the
web-of-trust to verify PGP fingerprints, most users will need something more
approachable.  That's where [Keybase](https://keybase.io) comes in.  Keybase
helps you link PGP keys to social identities, like GitHub or Twitter accounts.
App authors can create a Keybase account, then create signed proofs-of-ownership
that they post to their social media pages or websites.  Keybase provides an
index of these proofs, so given a PGP fingerprint, you can list the accounts for
which the PGP key's owner has proven control.

### The result: end-to-end verified apps

When you go to install a package, Sandstorm verifies that the package is
correctly signed by the Ed25519 key.  It looks for a PGP signature in the 
metadata, and verifies that the PGP-signed assertion is for the correct app ID 
and the email address specified in the metadata.  It queries the Keybase API to
see what accounts the packager has proven ownership of, and lists them with 
their links on the app install page.

Currently, the implementation of this feature trusts Keybase's servers to verify
proofs and return an accurate list of the signer's identities. However, Keybase
proofs are designed to be verifiable by third parties without trusting Keybase,
and we plan to extend Sandstorm to do this, thus eliminating Keybase itself from
the trust chain.

So that's how Sandstorm links app packages to their
creators' social identities, with cryptographic verification at each step along
the way, with no additional action needed by end users.  This is software
authenticity that Just Works, and it's available today for all Sandstorm users
and packages in the App Market.  Today is a good day to
[install Sandstorm on your own server](https://sandstorm.io/install/) or sign up
for our [managed hosting](/news/2015-08-31-oasis-beta-launch.html).
