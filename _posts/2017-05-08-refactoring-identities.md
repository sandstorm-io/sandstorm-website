---
layout: post
title: "We're changing the way identities work"
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

Over the next few weeks, I'll be making a major change to the way Sandstorm handles user accounts and identities. My goal is to make things far less confusing.

Most Sandstorm users probably have no idea that these features exist, and so won't notice the change. However, if you've linked multiple "identities" (multiple e-mail, Google, or GitHub accounts) to your Sandstorm account, you may want to read this.

### History: The current system and why it was built this way

Way back in late 2015, we introduced the concept of "multiple identities" in Sandstorm. Ever since, a user account on a Sandstorm server has been able to have multiple identities attached to it, each with a different profile (name, picture, etc.). Once a user has multiple identities, they can choose which identity to act as when using apps. When users share with each other, they often do so "by identity", meaning you choose the identity (not the account) with whom you want to share. It's even possible for multiple accounts to share a common identity, in order to have multiple people "acting as" the same persona.

When we designed this system, we were attempting to solve several different problems at once:
    
1. We had long offered users the ability to log in with Google, GitHub, or e-mail. Sometimes, though, people wanted to attach multiple login mechanisms to the same account, e.g. both their Google and their GitHub account. This redundancy can protect people against one of these services being down, and would help avoid confusion when people can't remember which login mechanism they used last time. We also anticipated that in the future, Sandstorm apps might want to talk to Google and GitHub APIs, and this access would be authenticated through the user's connected accounts.

2. We wanted to ensure that the user ID seen by an app was a global identifier -- meaning it would be the same even if the app was moved to a different Sandstorm server. This required that the ID be derived from the user's credentials, e.g. a hash of their Google or GitHub user ID.

3. When users share with each other, we wanted them to be able to do so using well-known public identifiers, for additional security. Typically, Sandstorm users share with each other by creating and sending "secret links"; anyone who receives the link can get access. This is convenient, but sometimes you want some additional assurance that a link can't be leaked. In that case, you might want to specify a specific GitHub username or Google account e-mail address with whom to share, and have Sandstorm guarantee that the receiver must authenticate as that identity to open the link.

4. We wanted people to be able to manage multiple "personas" with which they interact with other users within Sandstorm. We imagined that users may in fact want to prevent other users from discovering that these personas belonged to the same physical person. We imagined that this would in particular be useful to groups who fear harassment and abuse, and therefore choose to interact under a pseudonym.

5. We wanted multiple users to be able to collectively manage a shared persona, like a "brand account" on Twitter, while keeping independent Sandstorm accounts.

With all of these goals mashed together, we came up with a design: We would allow you to connect multiple credentials (e.g. Google, GitHub, e-mail, even multiple of each) to your account. Each connected credential became an "identity", with its own profile (name, picture, and other details shown to users you collaborate with). Each identity could also be marked as being for authentication (in which case you could use it to log into your account) or not (in which case you couldn't use it to log in, but you could use it as a persona and a sharing target). Non-login identities could also be shared between multiple accounts. Whenever you interacted with a grain, you would choose which identity you wanted to act as, which determined how collaborators saw you.

### Why it didn't work

In retrospect, it was a mistake to try to solve all of these problems at the same time, as they are all fundamentally different. By trying to link them together, we largely failed to solve any of them.

The idea that your Google and GitHub accounts each represented a different "identity" confused many users. Most people in fact only have one persona, and their accounts on various services represent that same persona. But if you attached both to your Sandstorm account, then Sandstorm would begin asking you to choose which identity you wished to act as -- a question that made no sense to most people. Moreover, other people, when sharing with you, would begin to see multiple "copies" of you showing up in their contacts list -- one for each credential. Often it was hard for people to tell what the difference was or which they should choose. Because of this confusion, the Sandstorm team has tended to steer people away from linking multiple identities in the first place. Obviously, this defeats the goals for which multi-identity was created.

Meanwhile, for people who actually wanted to manage multiple personas -- pseudonyms, brand identities, etc. -- we never managed to provide a good experience. It was very easy to accidentally use the wrong identity and reveal yourself. At the same time, the need to support this use case often exacerbated the confusion for users who only had one logical persona (as described in the previous paragraph). Without this design constraint, we could make a better UX for most people.

Finally, in practice this design didn't really solve the ability to move grains between Sandstorm servers, because different Sandstorm servers may very well use totally different login mechanisms. Often, people want to transition grains from Oasis -- where they used e-mail login -- to a new self-hosted server -- where they used LDAP or SAML login. Since the login mechanisms differed, user IDs didn't match up anyway. To really solve this problem, we need something more dynamic.

### What we're doing instead

We are dropping support for multiple "personas". Going forward, each Sandstorm account will have only one profile -- one name, one profile picture, one entry in the sharing auto-complete list, etc. If you have multiple identities today, the profile from exactly one of those identities will become your account profile, and the other profiles will disappear. If you're worried about which one Sandstorm will take, make sure to edit all your identities so that their profiles are the same.

What we call "identities" today will be renamed to "credentials". A credential will no longer have its own profile, and you will no longer need to choose which credential you are acting as when accessing grains. Authentication-related features of credentials (for login, and for secure sharing) will remain mostly intact.

Users who rely on the ability to manage multiple personas today will need to transition to using multiple accounts instead. I suspect that there are vanishingly few such users, as most users never understood Sandstorm's identity system in the first place. That said, if you are affected, I apologize. I would love it if you would [get in contact with us](/community) to let us know about your specific needs, so that we can try to design a better experience for you. (For what it's worth, I personally recommend using the multi-profile feature provided by various browsers to separate your personas into totally separate browser contexts with different window themes -- this makes it much easier to prevent accidental leakage.)

Finally, we will be disassociating the user ID as seen by apps from the underlying user credentials. In the future, each grain will actually see a totally unique ID for each user. When a grain is transferred between servers, the owner will have the opportunity to remap users in arbitrary ways -- though by default we'll correlate based on verified e-mail address. This scheme has the additional benefit that because a particular user's ID will be different in every grain they access, it will no longer be possible for apps to illicitly identify and correlate users by their IDs. Instead, they will have to use explicit APIs for this purpose, which can be carefully controlled for privacy.

### Timeline

As of this post, these changes have not yet been implemented. We wanted to let people know of the changes in advance, in case anyone is relying on the current behavior. The next Sandstorm update will include code which detects users who might be affected and notifies them to read this blog post. The full change will probably take several weeks or maybe months to implement, as it is a huge change. We'll update this post when it's done.
