---
layout: post
title: "Sandstorm gets a security review"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Sandstorm recently underwent a security review by [DevCore Inc.](http://devco.re/), commissioned by Department of Cyber Security of Taiwan. The company has in the past found RCEs in big-name services like [Uber](https://hackerone.com/reports/125980) and [Facebook](http://devco.re/blog/2016/04/21/how-I-hacked-facebook-and-found-someones-backdoor-script-eng-ver/).

Although the full report is not public (and is not in English), Taiwan's Digital Minister, [Audrey Tang](https://en.wikipedia.org/wiki/Audrey_Tang), tells us that overall DevCore feels Sandstorm has "excellent security design."

As would be expected of any good security review, DevCore did find several issues. Last night we released build 0.203 to fix them. All servers should automatically update within 24 hours of the release (by midnight tonight, PST), but if you'd like to speed up the process (or if you have disabled automatic updates), you can SSH into your server now and type:

    sudo sandstorm update

### Vulnerabilities Discovered (and fixed)

#### 1. Insufficient e-mail address validation

When logging in with an e-mail address, a user could enter an address like "foo@evil.com,bar@example.com". In this case, login e-mails would be sent to _both_ addresses, while Sandstorm would treat the user as if they were a member of the latter domain, "example.com". Hence, an attacker could specify their real address as the first address and a fake address at a domain of their choice as the second, in order to appear to be a member of the domain. Servers that use Sandstorm's organizational features (until recently only available as part of the [now-defunct](https://sandstorm.io/news/2017-02-06-sandstorm-returning-to-community-roots) product "Sandstorm for Work") can be configured to automatically promote members of a domain to full users, allowing them to install apps, create grains, and discover the identities of other members of the organization. Such users would **not** receive access to any other grains on the server, but an attacker could install their own apps that consume the server's resources, including CPU, RAM, and disk. An attacker could also combine this vulnerability with one of the others below, all of which require full user status as a starting point.

The root cause of this bug is Sandstorm's use of a library called Nodemailer to send e-mail. It turns out that Nodemailer "helpfully" interprets comma-separated lists of addresses as multiple addresses. This is true even if the string is already part of an array. For instance, say you pass the following array in the `to` field of a mail sent via Nodemailer:

    [ "foo@example.com",
      "bar@example.com,baz@example.com",
      { name: "Garply", address: "qux@example.com,corge@example.com" } ]

Surprisingly, this three-element array will send e-mail to _five_ addresses -- foo@, bar@, baz@, qux@, and corge@.

We did not anticipate this feature and assumed that Nodemailer would fail to send e-mail to an invalid address.

**Severity:** Moderate **if** Sandstorm is configured with an organization defined by e-mail domain. If you do not define an organization, or if you define it by LDAP, SAML, or G Suite domain, then we do not believe this bug can be meaningfully exploited.

**Fix:** Sandstorm now performs its own validation of addresses to ensure, among other things, that no separator characters are accepted and only one @-sign is allowed. Fixed in commit [37bd9a7](https://github.com/sandstorm-io/sandstorm/commit/37bd9a7f4eb776cdc2d3615f0bfea1254b66f59d).

#### 2. Insufficient path validation when building ZIP backups

The owner of a Sandstorm grain can download a backup of the grain's content in ZIP format. Sandstorm shells out to the `zip` utility to build this archive, but does so inside a sandbox designed to prevent exploitation of bugs in the utility.

Unfortunately, a combination of factors resulted in the possibility of a minor data leak:

* The list of files to include in the archive is passed to `zip` on standard input, delimited by newlines. However, it is possible for a filename to contain a newline character. Sandstorm actually checked for this, but accidentally failed to perform the check in one code path triggered by the existence of an empty directory.
* The zip sandbox carefully hid sensitive directories like `/var`, `/proc`, and even `/etc`. However, after the zip sandbox was written, two new directories, `/etc.host` and `/run.host`, which are aliases for the host system's `/etc` and `/run`, were added. Unfortunately, the zip sandbox was not updated to hide these directories, hence they were visible to the zip program.

As a result of this, a user could create a grain containing an empty directory named `/var/blah\n/etc.host/passwd`, save a backup, and find the backup contained a copy of the host's `/etc/passwd` file (which, despite its name, does not contain passwords, but does contain a list of local user accounts).

**Severity:** Low. An attacker who has full user status (permission to create grains) can read files located in the server's `/etc` and `/run` directories that are set world-readable (or specifically readable to the Sandstorm service account). No other host system directories are exposed. Usually, any files under `/etc` that contain sensitive secrets would be hidden from all users except root, hence would not be readable by Sandstorm nor by the attacker.

**Fix:** We have fixed the validation of filenames so that newlines are never permitted, and we have enhanced the zip sandbox to use a whitelist of top-level directories rather than a blacklist. Fixed in commit [4ea8df7](https://github.com/sandstorm-io/sandstorm/commit/4ea8df7403381d9b657b121b3c98d8081b27414d).

#### 3. Server-side request forgery

Apps running on Sandstorm can make outgoing HTTP requests through a few mechanisms. Additionally, users can instruct Sandstorm to download an app package file from an arbitrary URL. Sandstorm did not attempt to prevent these requests from reaching localhost or private network destinations. Because of this, a full user of the Sandstorm server (but not a visitor) could probe the internal network on which the Sandstorm server was hosted, as well as services exposed to localhost on the server itself.

This is a problem if unprotected services are exposed to the Sandstorm server *and* you have invited users to your server who should not be trusted to access those services. Sandstorm itself does not expose any unprotected services to localhost, so some other service must be running locally to cause a problem. Only HTTP requests are possible.

**Severity:** High **if** unprotected HTTP services are visible to the Sandstorm server *and* you have invited users to your server who should not be trusted to access those services. Otherwise, low. Sandstorm itself does not expose any unprotected services to localhost, so some other service must be running locally to cause a problem. Only HTTP requests are possible.

**Fix:** Sandstorm now allows the server admin to configure an IP address blacklist. User-initiated requests will not be allowed from these addresses. By default, standard private network address ranges are blacklisted. Annoyingly, this "fix" is likely to break some servers who use private app indexes, but avoiding such breakage would mean leaving others vulnerable. Admins will need to update their blacklists accordingly. Fixed in commit [164997f](https://github.com/sandstorm-io/sandstorm/commit/164997fb958effbc90c5328c166706280a84aaa1).

#### 4. Failure to mitigate Linux kernel CVE-2017-6074

_(This was caught internally by the Sandstorm team, not by DevCore, but is fixed in the same release.)_

A recent Linux kernel bug could allow a malicious app to cause a kernel panic or perhaps break out of its sandbox. The bug is in Linux, but Sandstorm aims to protect against such bugs via seccomp. [Historically, Sandstorm's sandbox has been very successful at blocking Linux vulnerabilities before they are discovered.](https://docs.sandstorm.io/en/latest/using/security-non-events/#linux-kernel) However, this one slipped through. On Sandstorm, the published PoC exploit for this bug only causes a kernel panic (not a sandbox breakout), but a developer with deep understanding of the bug and the Linux kernel might be able to create a successful attack in other ways.

**Severity:** High if you permit users you don't trust to install apps on your server, or commonly install apps from untrustworthy sources, and you do not keep your kernel up-to-date.

**Fix:** Sandstorm's seccomp filter has been updated to prohibit the creation of DCCP sockets. Fixed in commit [34749f9](https://github.com/sandstorm-io/sandstorm/commit/34749f9c0141a89680860b15433e8ac9dbdbbb62).

### Conclusion

We are excited to have received such a thorough security review. Some of the problems discovered were very obscure and we're impressed that DevCore was able to find them. We thank Audrey Tang and the Department of Cyber Security of of Taiwan for commissioning this review.
