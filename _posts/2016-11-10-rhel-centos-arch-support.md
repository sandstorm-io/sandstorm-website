---
layout: post
title: "Sandstorm now supports RHEL 7, CentOS 7, Arch, and more"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

As of a couple weeks ago -- October 23, 2016 -- Sandstorm can now be installed on systems with:

* Linux Kernel 3.10+ (previously required 3.13+)
* User namespaces disabled (previously required unprivileged user namespaces)

This means that Sandstorm can now be installed on Red Hat Enterprise Linux (RHEL) 7, as well as its cousin CentOS 7, both of which use kernel version 3.10.

It also means that Sandstorm can now be installed on Arch Linux, which has historically shipped kernels compiled with `CONFIG_USER_NS=n`.

So if you previously couldn't install Sandstorm because you were using one of these distros, now you can!

<a class="linkbutton" href="https://sandstorm.io/install">Install Sandstorm now &raquo;</a>

### What changed?

_For the technically curious..._

Sandstorm uses the Linux kernel's "namespaces" feature as part of setting up the secure sandboxes in which apps run. Normally, creating namespaces requires root privileges, because these features could be used to escalate privileges. However, using "user namespaces", a process that does not have root privileges can create a special kind of namespace in which other namespaces are (ostensibly) safe to use. Hence, it allows unprivileged processes to create sandboxes.

For security reasons, most of Sandstorm does not run with root privileges. Because of this, it has long relied on user namespaces to allow it to set up sandboxes. At the time the Sandstorm project started, it looked like user namespaces would soon be broadly available across Linux distros, so this seemed like a reasonable strategy.

Unfortunately, this has not been entirely true in practice. The enterprise-oriented RHEL and CentOS distros have long release cycles. Today, they still use kernel version 3.10, which is nearly three years old. Because user namespaces still had many problems in this kernel version, they were disabled by default and are today available only with a boot flag. Meanwhile, some faster-moving distros like Arch have chosen to [keep user namespaces disabled](https://bugs.archlinux.org/task/36969) even with newer kernel versions due to security concerns: the user namespaces feature has been the source of many local privilege escalation exploits in Linux. Although these vulnerabilities [can't be exploited by Sandstorm apps](https://docs.sandstorm.io/en/latest/using/security-non-events/#linux-kernel), such frequent vulnerabilities are problematic for servers which rely on user account separation for security outside of Sandstorm.

Even as it became apparent that Sandstorm's use of user namespaces was preventing it from being used on some distros, we were hesitant to try other approaches. It seemed like the only way to solve the problem would be to employ a setuid-root binary to set up sandboxes when user namespaces were not available. setuid-root binaries are inherently risky -- if not written exactly correctly, it could open its own privilege escalation vulnerability. Also, it would require a major refactoring of Sandstorm internals to move the supervisor into its own binary.

But a couple weeks ago, I realized suddenly that a different idea would work. The Sandstorm server normally starts up as root, but then runs several child processes under a regular user account. Most of Sandstorm's business logic is in a node.js web server. That process talks via Cap'n Proto RPC to a "back-end" daemon written in C++, which in turn launches app sandboxes. This back-end daemon is hand-coded in C++, with the core logic all living in a single file.

Because of this design, it turned out to be relatively easy to pass superuser privileges down through the back-end, while still keeping them away from the web server. Specifically, the back-end can execute with its _effective_ UID set to a normal user account, but its _real_ UID being root. Then, when it comes time to start a sandbox, it can promote itself back to root to do the work.

This turned out to take only a couple hours to [implement](https://github.com/sandstorm-io/sandstorm/pull/2644). In retrospect, the design seems obvious, and I wish I'd thought of it sooner!

There is a minor downside: If a vulnerability allows an attacker to cause the back-end to execute arbitrary code, that code could claim the superuser privileges, whereas before it would be limited to the Sandstorm server UID. This risk is probably small because the back-end is a relatively simple program that only speaks directly to other trusted programs (although it speaks indirectly to potentially-malicious actors). Nevertheless, if user namespaces are available, then Sandstorm will avoid handing root privileges to the back-end at all, continuing to operate as it did historically.

### What do I need to do?

Existing Sandstorm users need not take any action. Your servers will continue to operate exactly as they always have.

But if you've been held back from installing Sandstorm before because it wouldn't work on your distro, you should try again now!

[Install Sandstorm Standard &raquo;](https://sandstorm.io/install)

[Try Sandstorm for Work (supports corporate SSO via LDAP/SAML/AD and organization management features) &raquo;](https://sandstorm.io/get-feature-key)

