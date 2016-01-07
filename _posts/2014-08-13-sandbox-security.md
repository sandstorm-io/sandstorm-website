---
layout: post
title: "Sandstorm vs. Kernel Exploits"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

A few weeks ago, I discovered a vulnerability in the Linux kernel that may allow sandboxed programs to break out of a container. The same problem can also be exploited in a different way on many typical Linux systems to gain local root privileges. I reported the problem to the kernel's security team. Yesterday, upon release of a fix for the issue, the vulnerability was [disclosed publicly](http://www.openwall.com/lists/oss-security/2014/08/12/6) ([CVE-2014-5206](https://www.google.com/search?q=CVE-2014-5206) and [CVE-2014-5207](https://www.google.com/search?q=CVE-2014-5207)).

Docker, in many configurations, is likely vulnerable to this exploit. Sandstorm, however, is not.

To be fair, Docker is not primarily designed to be a sandbox. It is instead designed to run arbitrary off-the-shelf Linux applications and distributions in a clean, hermetic way -- and at this, it excels. There are some provisions for security, but the general recommendation is to avoid deploying anything that could be actively malicious.

Sandstorm, on the other hand, cares deeply about sandboxing, and is willing trade off compatibility for security. We are happy to hide or disable whole swaths of the Linux platform that most apps don't need, at the expense of having to develop work-arounds for the few apps that do need them. By doing this, we reduce the "attack surface" of the Linux kernel -- any vulnerabilities found in the features we disabled do not affect Sandstorm. Of course, it is exactly these rarely-used obscure features which have received the least scrutiny and thus are the most likely to contain vulnerabilities.

Some examples of features we remove:

* We use seccomp-bpf to disable system calls that are not needed by apps. For example, by disabling the `mount(2)` system call as well as blocking the creation of new UID namespaces, Sandstorm sidesteps the vulnerability I discovered. (Ironically, Sandstorm itself relies on these very features to set up the sandbox, but apps do not need them.)
* We do not mount `/proc` or `/sys`, which are filesystem-based interfaces exposing myriad kernel features.
* The only devices we present to apps are `/dev/null`, `/dev/zero`, and `/dev/urandom`.
* We prohibit sandboxes from using setuid binaries to gain privileges by setting the `no_new_privs` process flag and other measures.

Many of these things can be enabled in Docker as well, but only by manual configuration.

All of these things potentially break some applications, but when problems do come up, it's usually easy to work around the issue by tweaking the application code. Sandstorm's willingness to require such changes is a key design difference from Docker. To be clear, I am not criticizing Docker's choice -- it makes tons of sense for what Docker is trying to accomplish. But Sandstorm is trying to accomplish something different.

In the future, we hope to further improve the Sandstorm sandbox by moving more kernel functionality to userspace. Using seccomp-bpf, we can actually cause some system calls to raise `SIGSYS`, thus allowing us to "virtualize" the call by implementing it in a signal handler. Through this, we can do anything from mocking out an irrelevant system call to implementing a whole virtual filesystem (by intercepting `open(2)`).

One thing in particular that we'd like to do is implement `exec(2)` in userspace. Parsing ELF binaries is non-trivial, and there have been vulnerabilities in the kernel's ELF parser in the past. But, this work does not actually need to happen in the kernel. The main function of exec which cannot be performed in userspace is granting privileges to setuid binaries -- but we actively _don't want_ that feature anyway.

Two of Sandstorm's advisors -- Andrew Lutomirski (a security-focused kernel developer) and Mark Seaborn (a member of Chrome's Native Client sandbox team) -- are experts on these issues and have been helping us work out the details. Andy actually implemented the `no_new_privs` kernel feature and contributed Sandstorm's seccomp filter. He has been keeping us informed as new kernel vulnerabilities arise. Mark has implemented several Linux native code sandboxes before and is helping us design what we hope will be the best yet. (Note: Our advisors contribute in their spare time, not on behalf of their employers.)

Of course, to see any of this happen, we need your help. :) [Please fund our Indiegogo campaign.](http://igg.me/at/sandstorm)