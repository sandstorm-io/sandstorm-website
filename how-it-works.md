---
layout: page
id: how-it-works
title: "How Sandstorm Works: Containerize objects, not services"
imageUrl: https://sandstorm.io/images/how-it-works.png
---

<header>
  <h1>How Sandstorm Works</h1>
  <p>Containerize objects, not services</p>
    <div class="containerize"><img class="left" src="/images/how-left.svg"><img class="right" src="/images/how-right.svg"></div>
</header>

<section id="different">
    Sandstorm is radically different from all other web app infrastructure today.
</section>

<section id="intro">
  <ul>
    <li><strong><a href="#grains">Grains: Fine-grained object containers</a></strong>
      <ul>
        <li><a href="#access-control">The platform manages access controls</a></li>
        <li><a href="#semantic">Matching the semantic model</a></li>
        <li><a href="#developers">Easier for developers: less complexity, less boilerplate</a></li>
        <li><a href="#performance">Data locality improves performance</a></li>
        <li><a href="#confinement">Confinement and Auditability</a></li>
        <li><a href="#encryption">Fine-grained Encryption</a></li>
      </ul>
    </li>
    <li><strong><a href="#capabilities">Capability-based Security</a></strong>
      <ul>
        <li><a href="#powerbox">The Powerbox</a></li>
        <li><a href="#capnproto">Cap'n Proto</a></li>
        <li><a href="#pseudo-acls">Pseudo-ACLs and Policies</a></li>
      </ul>
    </li>
  </ul>
  <div>
    <p>We claim that Sandstorm mitigates most security bugs in apps, by default. We also claim that Sandstorm is the easiest way ever to deploy small-scale (personal, or corporate-internal) web services.</p>
    <p>Understandably, people used to the status quo find these claims hard to believe. It sounds like magic.</p>
    <p>On this page, we will explain the two main pieces of "magic" that make it all work:</p>
    <ul>
      <li><a href="#grains">Fine-grained Containerization</a></li>
      <li><a href="#capabilities">Capability-based Security</a></li>
    </ul>
  </div>
</section>

<section id="grains" markdown="1">
## Grains: Fine-grained Object Containers

![](/images/how-conventional.svg)![](/images/how-sandstorm.svg)

The term "microservice" has become popular lately, but the idea has been in practice at companies like Google for well over a decade. The idea is simple: take your large web app and split it into small "services" running in separate containers. Services are separated by functionality: you might have an authentication service, a payment service, a search service, and so on.

**Sandstorm takes a wildly different approach:** It containerizes _objects_, where an object is primarily defined by _data_. We call each Sandstorm container a **"grain"**, because it is fine-grained.

For example, when using Etherpad -- a document editor app -- on Sandstorm, every document lives in a separate container, isolated from the others. The front-end and database for that document live in the container. The container has a private filesystem for storage. JavaScript running in the user's browser can talk only to the document container for which it was loaded, no others. All of this makes up a single "grain".

Similarly, when you use Wekan (a kanban board, comparable to Trello) on Sandstorm, each board lives in a separate grain. When you use GitWeb, each git repository lives in a separate grain. When you use EtherCalc, each spreadsheet lives in a separate grain.

<section id="access-control" markdown="1">
### The platform manages access control

Because grains are split on natural access control boundaries, Sandstorm itself can enforce access control on each grain. By default, a newly-created grain (such as an Etherpad document) is private. Through the Sandstorm UI, you can grant other people access to the grain with varying permission levels, you can inspect who has access, and you can revoke that access.

Because Sandstorm enforces all of this at the platform level, no bug in Etherpad could possibly allow someone to get access to your document if you did not share it with them.

This is important because many developers simply aren't very good at security. Most developers consider only what their code will do when given expected inputs. A security engineer considers all possible code paths. But security engineers are a small minority of developers, and it simply isn't practical to have every piece of code reviewed by a security person. Any black hat will tell you that one of the easiest ways to "hack" a company is to scan their IP range for exposed web apps and then find bugs in those apps. With apps running on Sandstorm, such a strategy would get nowhere. Of course, there is a risk that Sandstorm itself is buggy, but Sandstorm is written carefully by security engineers.
</section>

<section id="semantic" markdown="1">
### Matching the semantic model

Microservices are seemingly designed to match the developer's mental model of their system. Often, services are literally divided by the team who maintains them. This initially seems natural, but in reality there is little technical benefit to such a separation. It's not like your frontend code is so large that you couldn't possibly fit any other code on the same machine -- it's perfectly reasonable for every machine to have a complete copy of all of the code running anywhere in the cluster.

Grains, in contrast, match the *user's* mental model of the system. A user doesn't know the difference between a front-end and a database, but they certainly know the difference between two different documents. When the infrastructure matches the user's mental model, suddenly a lot of friction disappears. Suddenly, the end user is able to reason about infrastructure and take direct control of more things. Suddenly, it becomes reasonably possible to present a user interface to manage a server which is comprehensible to an end user.

With grains, the user can decide when to upgrade to a new version of an application, even updating some grains before others. A user can decide if a change has broken something for them, and roll back their grains to an older version. Users can download backups of the raw storage of their grains or transfer them to other Sandstorm servers. Users can understand and control how their grains are connected to other grains, not just how apps connect to other apps.
</section>

<section id="developers" markdown="1">
### Easier for developers: Less complexity, less boilerplate

Building a scalable distributed system is hard. But Sandstorm developers don't need to do that. A Sandstorm app developer needs only write an app that runs on a single machine, since a single document is unlikely ever to need more resources than that. Sandstorm will "scale" the app by running separate grains on separate machines as needed. This also simplifies the app code, as a developer need not even write logic or storage schemas to handle more than one document.

In fact, because Sandstorm has such visibility into the apps' data model, it can implement all kinds of UI in a common way, reducing work for app developers while also making life more consistent for users. For example:

* Users can find all their data in one place in the Sandstorm UI, rather than having to browse to a specific app first.
* Users can _search_ all their data in one place. The app only needs to tell Sandstorm what content to index.
* Sandstorm can handle login, so that the user logs in only once to Sandstorm rather than to each app individually.
* Sandstorm can handle access control (as discussed above), so that the user has a consistent way to share and collaborate on any app.
* Sandstorm can handle audit logging, allowing the user to see who has access to their document and when they used that access.
* Sandstorm can offer a common way to back up data and transfer it between Sandstorm hosts.
* Sandstorm can implement privileged UI which knows information that hasn't been revealed to apps. For instance, Sandstorm can implement a UI for users to connect apps to each other, without the apps ever learning about other secret apps the user might have.
</section>

<section id="performance" markdown="1">
### Data locality improves performance

Service-oriented architecture is touted as scalable, because many requests can be handled by a shared process. However, microservices introduce performance penalties as components are split into smaller pieces. If dozens of different services on different machines must be consulted in order to handle each user request, latency will be high. If a typical service is "slow" 5% of the time (say, due to garbage collection pauses), and there are 20 services to consult for each request, then every single request can be expected to be "slow".

Monolithic databases pose another problem to distributed system performance. If every query searches over a world-spanning table, those queries will require highly complex optimizations (indexes, query planning, etc.) to perform well.

In the Sandstorm model, all of the components (from web server to database) needed to handle a particular grain run on the same machine. Communications between them will therefore be incredibly fast. And if the grain contains only a single document or other small piece of data, then its entire content can be loaded into RAM and queried quickly during the time that it is in use.

But does it scale? Obviously, if every grain were running at all times, the Sandstorm model would scale abysmally, requiring an absurd amount of RAM. However, Sandstorm only runs a grain while it is in-use. Since grains are small, they start up quickly -- often in under a second -- which means there's no need to keep them running all the time. Additionally, an app's static assets (code, images, etc.) are mounted into the grain read-only such that they can be shared among all grains running the same app; thus, the per-grain overhead is relatively small. For ahead-of-time-complied apps (e.g. written in Go, Rust, or C++) or apps starting from a copy-on-write checkpoint (e.g. using [snappy-start](https://github.com/google/snappy-start)), per-grain marginal RAM usage can easily be under a megabyte.
</section>

<section id="confinement" markdown="1">
### Confinement and Auditability

<div class="figure"><p class="heading">Standard model</p><img src="/images/how-confinement1.svg" alt="diagram of traditional infrastructure"></div>

Most infrastructure is designed to sit "under" the app, managing resources but not communications. Apps are free to talk to the network. They may connect to users and to other apps at will. It is expected that apps will enforce access control on inbound requests, but there are often no controls on outbound requests.

<div class="figure"><p class="heading">Sandstorm model</p><img src="/images/how-confinement2.svg" alt="diagram of Sandstorm model"></div>

In part because of Sandstorm's granular model, it makes sense for Sandstorm to implement full confinement, in which the infrastructure sits on *all sides* of the app. A Sandstorm app's interactions with the outside world are entirely mediated through Sandstorm. Users talk to grains through a proxy which authenticates requests and enforces access control. Grains can only talk to other grains or outside services to which they have explicitly requested permission, and Sandstorm allows the user to audit and revoke these permissions at any time.

In organizations, the administrator can audit access across the whole company and set global access control policies, such as: "No sharing outside the organization." This kind of visibility and control is a CISO's dream come true. Want to pass PCI-DSS or HIPAA compliance inspections easily? Show your Sandstorm access control policies and audit graph. It doesn't even matter what apps you are running, because Sandstorm can enforce the rules uniformly across all apps.

These features could theoretically apply to services too, but they would be far less useful there due to the lack of granularity. For instance, say you are running Etherpad inside your company without using Sandstorm. Probably, you give all employees access to Etherpad so that they can create their own docs. Probably, Etherpad has full access to its own database. In this environment, the infrastructure cannot tell you anything useful about who has access to what documents -- as far as it can tell, everyone can access everything. Access graphs only make any sense with grains, not services.
</section>

<section id="encryption" markdown="1">
### Fine-grained Encryption

Encryption of storage at rest is commonly used to protect against threats like hard drive theft. However, it has the potential for so much more. Imagine a system where every piece of data is encrypted using a key that is provably only derivable by the exact users who are supposed to have access to that data. Perhaps the data key is ultimately encrypted to the users' passwords or PGP keys. In such a system, even a system administrator -- empowered to shut down and bring up the system at will -- would be unable to illegitimately access a particular document without launching an active attack.

Of course, if your application-wide database is encrypted using a single key, then you can't provide this. The sys admin obviously needs access to the database key to bring up the system at all. With service-oriented architecture, fine-grained encryption requires cooperation from every single app (and all of their developers, who may or may not understand cryptography).

But with grains, there is hope. Each grain's storage can be encrypted transparently with a different key by Sandstorm. Since Sandstorm is in charge of access control, it can "wrap" the key for each user who is meant to have access. When a grain is granted permission to talk directly to some other grain, it can store a copy of the other grain's key in its own storage, thus creating a key derivation graph mirroring the access control graph. All of this can be completely transparent to the apps.
</section>
</section>

<section id="capabilities" markdown="1">
## Capability-based Security
<div class="figure"><img src="/images/how-capabilitybased.svg"><p class="caption">Alice sends Bob a capability to Carol.</p></div>

Service-to-service access control in the Sandstorm model requires a different way of thinking about security.

Traditional access control is based on ambient identity and access control lists (ACLs). Each service might have an ACL that specifies which other services are permitted to access it. As the granularity of services increases, the difficulty of maintaining ACLs grows, especially when users are non-technical. (But meanwhile, with course-grained services, ACLs hardly even provide any protection. What services are allowed to access the database that contains everything? Well, all of them, of course!)

Under capability-based security, we take a different approach. Instead of maintaining a list of who is allowed to access what, we think of access permissions as an *object* which you *give* to things. So when you want to tell grain X to talk to grain Y, you *give* grain X a "capability" to grain Y. Grain X then stores that capability, and whenever it wants to talk to grain Y, it explicitly uses that capability. The capability both designates the *identity* of grain Y (e.g. its address) and *permission to access* grain Y.

At a lower level, capability-based programming fits perfectly with object-oriented programming. An object pointer (in a memory-safe language) is like a capability: when you receive a pointer, you can access the object. Without the pointer, you can't. Well-designed object-oriented systems use this property all the time to prove correctness of code. We avoid passing pointers into components that don't need them to make it easier to reason about them, and we write wrapper classes that restrict how an object can be used. We use abstract interfaces and polymorphism to allow components to be mixed-and-matched. These same patterns can be used to enforce security and adaptability in a capability system.

Critically, capability-based security is not just about security, but about choice and adaptability. Because a capability encapsulates _both_ permission to access an object _and_ the identity of the object to access, any time an app asks for a permission, it is possible for the user to respond with _any_ object that implements the correct protocol. The app may be able to hint what capability the user should choose, but cannot force the choice. This means that the user can choose a "fake" or restricted object when an app demands a capability that the user doesn't want to give it. It also means that apps cannot be choosy about which apps they integrate with. For example, if an app wants to read a user's calendar, it cannot be designed solely to work with Google Calendar -- the user can always redirect it to talk to anything which implements a compatible API.

<section id="powerbox" markdown="1">
### The Powerbox

The magic of the capability-based approach is that it tends to meld nicely with things that had to happen anyway, such that the user rarely needs to think about security and yet gets it automatically. There is no better example of this than the Sandstorm Powerbox UI.

The Powerbox is a general "picker" UI that grains may use to request access to other grains. Each grain publishes to the system a list of APIs that it provides. At some point, while a user is interacting with a grain, the grain says: "I need a capability implementing API Foo." The system then renders a picker interface to the user. Because the system knows about all of the user's grains, the system can populate the picker with all available options, even though the requesting grain knows nothing about them. When the user chooses a grain to fulfill the request, the user is obviously saying that they want to grant the requesting grain permission to access the fulfilling grain. Thus, the system delivers such a capability to the requester.

The Powerbox is actually nothing new. The web platform has long supported the ability to upload files to web pages. A web page cannot simply request any old file on your hard drive -- that would be insecure. Instead, it can request that your browser display a "file open" dialog. Only the file you choose gets uploaded. In this interaction, the "file open" dialog is a kind of powerbox. In Sandstorm, we have generalized this concept to support more than just files.

For example, imagine that a forum app needs the ability to send email notifications to users. In a traditional implementation, the forum app would be configured with the address of an SMTP server and credentials to access that server. Then, each user who visits would type in their e-mail address and perhaps complete some sort of verification step. Of course, if the app is evil (or compromised), it could use its SMTP server to send spam.

Under Sandstorm, the app would not require any upfront configuration. Instead, when a user sets up their forum profile, the app would make a powerbox request for an "EmailRecipient" capability to receive notifications. Sandstorm would display a picker showing the user's email addresses that it already knows about along with the ability to configure additional addresses. Once the user choses an address, the app would receive a capability to email _specifically that address_. The user can revoke this grant later if desired.

Notice how in this example, the application never gains the ability to send spam. And yet, the user experience is no worse and arguably better than before. The user is never prompted with any sort of security questions, yet the app is only able to email them with their consent.

And notice a second property: Any of the user's grains can publish an implementation of the "EmailRecipient" interface. The capbility need not strictly map to a real email address. The user could, for instance, direct the email to a grain which recieves the messages and posts them into a chat room, or anything else they can imagine. The sending app does not need to know anything about this. With this power, simple applications can be "composed" into complex workflows, much like a modern version of Unix pipes.

Note that a modal picker dialog is not always the best fit for every UX. To that end, Sandstorm implements other kinds of powerbox flows for different occasions. For example, the "inline powerbox" allows a user to type freeform text naming grains or users in their contacts and have them auto-complete to full capabilities.
</section>

<section id="capnproto" markdown="1">
### Cap'n Proto

Sandstorm's language for expressing capability-based security is [Cap'n Proto](https://capnproto.org), whose [RPC system](https://capnproto.org/rpc.html) is a full object-capability protocol. Cap'n Proto's design is heavily based on CapTP, the network protocol used by the [E programming language](http://erights.org/), which pioneered the modern object-capability model. A Sandstorm app's only connection to the outside world is literally through a Cap'n Proto socket. Other protocols, like HTTP, can be layered on top. Capabilities exchanged between apps using the Sandstorm Powerbox UI are literally Cap'n Proto object references.

Cap'n Proto allows transport and routing layers to be aware of the capabilities being transmitted over it. Thus, Sandstorm is able to track capabilities as they move from grain to grain. If grain X has connections to grains Y and Z, X can introduce Y and Z to each other by sending them capabilities to each other, and Y and Z will automatically form a direct connection. When this happens, Sandstorm will know about it; there is no way to form new connections without Sandstorm knowing, because apps are confined. None of this would be possible using a transport protocol without explicit support for capabilities.
</section>

<section id="pseudo-acls" markdown="1">
### Pseudo-ACLs and Policies

Traditionally, ACLs do have an advantage over pure capabilities: With an ACL, you can easily answer the question: "Who is everyone who currently has access to this resource?" Additionally, identity-based security is more amenable to expressing global policies, such as: "Members of the finance organization may not share their documents with other organizations." Although capability theory offers ways to solve these problems, simplistic capability systems often fail to address them.

Sandstorm, however, has an advantage: because the system acts as a middleman between users and grains, and because communications occur using a capability-aware protocol (Cap'n Proto), the system knows whenever a capability changes hands. Because of this, the system can construct a "pseudo-ACL" for any object by simply listing all entities which are known to hold capabilities to the object. The user can review this list and revoke particular users and grains.

Moreover, Sandstorm can implement global policies by automatically revoking a capability that violates the policy. So, if a capability to a finance document is observed to be sent to a user outside the organization in violation of policy, Sandstorm can revoke it in-flight.

These measures are applied _in addition to_ the regular capability model, and thus supply defense-in-depth. Because of this, it is acceptable if identities used for peudo-ACL and policy purposes are relatively course-grained.

Sandstorm applications need not concern themselves with pseudo-ACLs. The API used by apps is strictly capability-based.
</section>
</section>
