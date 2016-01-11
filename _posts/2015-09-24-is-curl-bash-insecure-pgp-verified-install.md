---
layout: post
title: "Is curl|bash insecure?"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Since the early days of Sandstorm, we have offered the following mechanism for installing it:

    curl https://install.sandstorm.io | bash

As it turns out, a lot of people object to `curl|bash`. In fact, some people object *very strongly* to it, going so far as to scoff publicly at how obviously terrible it is and smugly proclaim that they dismissed our entire project when they saw this line. Usually, the loudest objectors claim that `curl|bash` is bad for security.

[Sandstorm is a security product](https://docs.sandstorm.io/en/latest/developing/security-practices/), so we want to address that head-on.

### The Bogus Argument: Code Execution

I'll admit: `curl|bash` certainly _smells_ funny. To anyone with a basic understanding of Unix, the construction makes it really obvious: This command will give the named web site direct access to your system, with the ability to do anything that _you_ could do. This feels very wrong: We should be able to install software without giving the developers full access to our systems, right?

We at Sandstorm would obviously be the first to agree that software you install should not be automatically fully trusted -- that's why [Sandstorm itself runs every app in a secure, isolated sandbox by default](https://docs.sandstorm.io/en/latest/developing/security-practices/#fine-grained-isolation). Unfortunately, however, traditional Unix software is always granted the full authority of the user who runs it. When you install software on Linux, no matter what package manager you use, you are giving that software permission to act as you. Most package managers will even execute scripts from the package at install time -- as root. So in reality, although `curl|bash` _looks_ scary, it's really just laying bare the reality that applies to every popular package manager out there: anything you install can pwn you.

If you wish to install Sandstorm -- or any software -- without giving it full access to your system, you must install it on a dedicated machine, VM, or (perhaps, with caveats) user account. In fact, we highly encourage you to do so, for defense in depth. But, we know it's more work than a lot of people want to deal with.

### The Better Argument: Code Signing

Some of the objectors, though, go a bit further: They claim that `curl|bash` is more open to attack that other distribution mechanisms, potentially allowing a third party to replace our Sandstorm downloads with evil ones.

Of course, all content served by sandstorm.io -- from software downloads to our blog -- is served strictly over HTTPS (with HSTS).

Various people argue, though, that this is not good enough, and that we should be signing each release with keys kept offline.

In fact, I agree: where possible, we like to use two or more independent mechanisms of protecting against a security problem, so that when one breaks it's not a big deal. So, as of today, it is possible to verify the Sandstorm installer from the PGP keys of various Sandstorm developers by following our "PGP-verified install" instructions.

<a class="linkbutton" href="https://docs.sandstorm.io/en/latest/install/#option-3-pgp-verified-install">Try PGP-verified Install »</a>

That said, we do not think this issue quite warrants the visceral anger we've seen people express over `curl|bash`. Realistically, downloading and installing software while relying on HTTPS for integrity is a widely-used practice. The web sites for Firefox, Rust, Google Chrome, and many others offer an HTTPS download as the primary installation mechanism. It's even the standard way to install most Linux distros in the first place (by downloading an iso from the web site). Many popular package managers, such as npm, rely only on HTTPS for integrity. `curl|bash` over HTTPS is just as "secure" as any of these.

### Verifying Keys with Keybase

To get benefit from PGP code signing beyond what you get from HTTPS distribution, you must verify that the software is signed by the specific developer you are expecting -- and to do that, you need a way to bootstrap trust in their PGP key. This means you can't simply fetch the key from the developer's own server. You can use PGP "Web of Trust", but sadly few people really understand how to do that.

Recently, though, a fairly plausible option has emerged: [Keybase.io](https://keybase.io). Keybase has implemented usable tools and techniques to bootstrap trust from a variety of sources, including social networks like Github and Twitter, all *without* trusting Keybase. It's unlikely that an attacker could compromise all of these sources at once. Once you've used Keybase to verify our PGP key, then you can verify the signed packages downloaded from our servers, and actually have a higher degree of confidence that the software is authentic than you would get from HTTPS alone.

### Non-security Concerns

`curl|bash` is not pretty, and people have raised some legitimate non-security-related concerns about it:

* If the connection dies mid-line, bash will execute the incomplete line -- however, this can be mitigated by wrapping the whole script in a bash function executed on the last line, as we do. (This is actually arguably a security concern if an attacker can induce a disconnect at a chosen point, but in any case it doesn't apply to our script.)
* Although almost all package managers allow packages to run arbitrary install-time scripts (often as root), it is far more likely that a wholly hand-rolled install script will be sloppy and harm the system. In the case of Sandstorm, we have taken care to avoid interfering with your system in any way -- in fact, Sandstorm self-containerizes in its own chroot under /opt/sandstorm, meaning that for the most part it does not touch the rest of your system at all. [See comments at the top of the script for more details.](https://install.sandstorm.io)
* Installing software not managed by the distro's package manager can be inconvenient for system administrators, especially those who are deeply familiar with the inner workings of their distro.

On these concerns: We hear you.

For now, we believe that having our own install scripts allows us to iterate faster, compared to maintaining (and testing) half a dozen package formats for different distros. However, once Sandstorm reaches a stable release, we fully intend to offer more traditional packaging choices as well. We still have lots of work to do!

### FAQ

**Does Sandstorm's auto-updater verify signatures on updates?**

As of this release, yes. (This is in addition to using HTTPS, as it always has.)

**What happens if the release-signing private key is compromised?**

We can rotate the key at any time. Certificates on the old key expire in about a month. The auto-updater will begin using the new key as soon as it has installed an update that is aware of the new key. We sign updates with all old keys as well so that old Sandstorm installs continue to be able to update even after key rotation.

**Are the installer and updater resistant to downgrade attacks?**

Yes. The installer will not install a release more than a month old. The updater will never "downgrade" to an older version. We also plan to add an alert to the Sandstorm UI if the Sandstorm build is more than a month old, which could indicate that an attacker is blocking access to the update server.
