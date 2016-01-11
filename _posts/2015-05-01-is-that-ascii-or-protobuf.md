---
layout: post
title: "Is that ASCII or is it Protobuf? The importance of types in cryptographic signatures."
author: Kenton Varda
authorUrl: https://github.com/kentonv
---

So here's a fun problem. Let's say that a web site wants to implement authentication based on public-key cryptography. That is, to log into your account, you need to prove that you possess a particular public/private key pair associated with the account. You can use the same key pair for several such sites, because none of the sites ever see the private key and therefore cannot impersonate you to each other. Way better than passwords!

### Background: Asymmetric Cryptography

Asymmetric encryption algorithms (ones with public/private key pairs) generally offer one or more of the following low-level operations:

* Encryption: Someone who has your public key can encrypt a message that can only be decrypted using your private key (i.e. by you). RSA implements this. Also, asymmetric encryption can be built on key agreement algorithms.
* Signing: Using your private key, you can "sign" a message, and other people can verify the signature using your public key. RSA, DSA, Ed25519, and others implement this.
* Key Agreement: Using your private key and someone else's public key, you can derive a new unique key. The other person can derive the *same* key using their private key and your public, but no one who doesn't possess at least one of your private keys can derive the key. Thus, you can use this key as a symmetric key to encrypt messages between you. This is called "Diffie-Hellman key exchange" and algorithms include the original Diffie-Hellman algorithm and ECDH (e.g. Curve25519).

### Asymmetric Key Authentication

Let's say your keys are RSA (probably the most common case today). To log in, you need to prove to the site that you have possession of your private key. How might we use the available operations (encrypt and sign) to do this? Keeping in mind that we must make sure someone snooping on a previous login cannot simply reply those past messages to log in again, we might propose:

* Encrypt: The web site generates a random unguessable value, encrypts it with your public key, then sends the encrypted message to you. You decrypt the value and send it back, proving to the site that you possess the private key.
* Sign: The web site generates a random unguessable value and sends it to you. You sign the value with your private key and send it back. The site can verify this signature with your public key.

Both basic approaches are commonly used for authentication. SSH, for example, used the encryption approach in v1, then switched to the signature approach in v2, in order to accommodate non-RSA key types. But the protocols used in practice are more complicated that described above, because...

### The Obvious Problem

There is huge problem with both approaches! In both cases, the web site controls the "random value" that is signed or the message to be decrypted. You've effectively given the web site complete access to your key:

* Encrypt: Instead of encrypting a newly-generated value, the site could send a message created by *someone else* that was encrypted for you. If you decrypt it and send it back without looking, the site gets access to this encrypted content which it wasn't supposed to be able to read.
* Sign: Instead of a random message, the site could send you a specially-crafted message that has meaning to third parties. For example, the site could send you the digital equivalent of a bank check. If you sign it without looking, the site could go ahead and extract money from your account, or other bad things.

(Of course, both of these problems can trivially be exploited to allow an evil web site operator to secretly log into some other web site as you, by relaying the login challenge from that other site.)

So what do we do about this?

### Be more careful?

Let's focus on the signature case. Naively, you might say: We need to restrict the format of the message the site presents for signature, so that it cannot be misinterpreted to mean anything else. The message will need a random component, of course, in order to prevent replays, but we can delimit that randomness in ASCII text which states the purpose. (In particular, it's important that the text specify exactly what web site we're trying to log into.) So, now we have:

    z.example.com login challenge:1Z5ns8ectRGTMNYz3NHdB 699a674d30fc3bd42ec3619cfab13deb

Here is a message that could not reasonably be interpreted as anything except "I want to log in to z.example.com", right? It's safe to sign, right?

### The Subtle Problem

I'm sorry to say, but there is still a problem. It turns out that message isn't the ASCII text it appears to be:

    $ echo -n 'z.example.com login challenge:1Z5ns8ectRGTMNYz3NHdB 699a674d30fc3bd42ec3619cfab13deb' \
        | protoc --decode=Check check.proto 
    toAccount: "699a674d30fc3bd42ec3619cfab13deb"
    amount: 100
    memo: "example.com login challenge:1Z5ns8ectRGTMNYz3N"

Oops, it appears you just signed a bank check after all -- and you were trying so hard not to! The check was encoded in Google's binary encoding format [Protocol Buffers](https://developers.google.com/protocol-buffers/) -- we were able to decode it using the `protoc` tool. Here is the Protobuf schema (the file `check.proto` that we passed to `protoc`):

    message Check {
      required string toAccount = 8;
      // 32-byte hex account number

      required uint32 amount = 9;
      // Dollar amount to pay.     

      optional string memo = 15;
      // Just a comment, not important.
    }

Thanks for your $100. Hope you have fun on `z.example.com`.

The trick here is that, using my knowledge of Protobuf encoding, I was able to carefully craft an ASCII message that happened to be a valid Protobuf message. I chose Protobufs because of [my familiarity with them](https://github.com/google/protobuf/blob/master/CONTRIBUTORS.txt), but many binary encodings could have worked here. In particular, most binary formats include ways to insert bytes which will be ignored, giving us an opening to insert some human-readable ASCII text. Here I pulled the text into the `memo` field, but had I not defined that field, Protobuf would have ignored the text altogether with no error.

Is this attack realistic? If the person designing the `Check` protocol intended to make the attack possible, then absolutely! No one would ever notice that the field numbers had been carefully chosen to encode nicely as ASCII, especially if plausible-looking optional fields were defined to fill in the gaps between them. (Of course, a real attacker would have omitted the `memo` field.)

Even if the other format were not designed maliciously, it's entirely possible for two protocols to assign different meanings to the same data by accident -- such as an IRC server accepting input from an HTTP client. This kind of problem is known as [inter-protocol exploitation](https://en.wikipedia.org/wiki/Inter-protocol_exploitation). We've simply extended it to signatures.

### Now what?

Here's the thing: When you create a key pair for signing, you need to decide exactly what *format* of data you plan to sign with it. Then, don't allow signatures made with that key to be accepted for any other purpose.

So, if you have a key used for logging into web sites, it can only be used for logging into web sites -- and all those web sites must use exactly the same format for authentication challenges.

Note that the key "format" can very well be "natural language messages encoded in UTF-8 to be read by humans", and then you can use the key to sign or encrypt email and such. But, then the key cannot be used for any automated purpose (like login) unless the protocol specifies an unambiguous natural-language "envelope" for its payload. Most such protocols (such as SSH authentication) do no such thing. (This is why, even though SSH and PGP both typically use RSA, you should NOT convert your PGP key into an SSH key nor vice versa.)

Another valid way to allow one key to be used for multiple purposes is to make sure all signed messages begin with a "context string", for example as [recommended by Adam Langley for TLS](http://www.ietf.org/mail-archive/web/tls/current/msg14734.html). However, in this case, *all* applications which use the key for signing *must* include such a context string, and context strings must be chosen to avoid conflicts.

But probably better than either of the above is to use a different key for each purpose. So, your PGP master key should not be used for anything except signing subkeys. Unfortunately, PGP subkeys do not allow you to express much about the purpose of subkeys -- you can only specify "encryption", "signing", "certification", or "authentication". This does not seem good enough -- e.g. an "authentication" key still cannot safely be used for SSH login because a malicious SSH server could still trick you into signing an SSH login request that happens to be a valid authentication request for a completely different service in a different format. (Admittedly, this possibility seems unlikely, but tricking an HTTP client into talking to a server expecting a completely different protocol also seems unlikely, yet it works e.g. with IRC. We can't really prove that no other protocol is designed exactly wrong such that it interprets [SSH's authentication signatures](https://tools.ietf.org/html/rfc4252#page-10) as something else.) Alas, in practice, SSH is exactly what the "authentication" subkey type is used for! So, perhaps SSH should be considered the de facto standard format for PGP's "authentication" keys, and if you implement an authentication system that accepts PGP keys designated for authentication, you should be sure to exactly match SSH's authentication signature format.

Similarly, X.509 certificates have the "extended key usage" extension to specify a key's designated purpose, but the options here are [similarly limited](https://www.openssl.org/docs/apps/x509v3_config.html#Extended-Key-Usage).

Another line of thought says simply: "Don't use signatures for anything except signing certificates." Indeed, signing email is arguably a bad idea: it means that not only can the recipient verify that it came from you, but the recipient can prove to _other people_ that you wrote the message, which is perhaps not what you really wanted. Similarly, when you log into a server, you probably don't want that server to be able to prove to the rest of the world that you logged in (as SSH servers currently can do!). What you probably really wanted is a zero-knowledge authentication system where only the recipient can know for sure that the message came from you (which can be built on, for example, key agreement protocols).

In any case, when Sandstorm implements [authentication based on public keys](https://github.com/sandstorm-io/sandstorm/issues/220), it will probably not be based on signatures. But, we still have more research to do here.

*Thanks to Ryan Sleevi, Tony Arcieri, and Glenn Willen for providing [pointers and insights](https://plus.google.com/+KentonVarda/posts/J3vcacmUUc1) that went into writing this article. However, any misunderstandings of cryptography are strictly my own.*

