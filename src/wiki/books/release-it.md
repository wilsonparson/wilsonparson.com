---
title: Release It! Design and Deploy Production-Ready Software
eleventyNavigation:
  key: Release it!
---

### Chapter 1: Living in Production

#### Aiming for the right target

- We all focus on what our systems _should_ do, but we should also be focusing on what they _should not_ do.
- Don't aim to pass QA; aim for life in production.
  - Write code that will make your future self and operations happy, not just QA.
- Accept the fact that despite your best laid plans, bad things will still happen.
  - Of course, you want to prevent bad things that you can anticipate, but you also need to focus on making sure your system can recover from any unanticipated trauma.
- The goal is to build systems that operate at low cost and high quality.

#### A Million Dollars Here, A Million Dollars There

- Don't optimize development cost at the expense of operational cost.
  - Systems spend much more of their life in operation than in development.
  - If you lose lots of money during 5 minutes of downtime on every release, it might be worth spending an extra \$50,000 to be able to release without downtime.
- Design and architecture decisions are also financial decisions.

#### Pragmatic Architecture

Two types of architects:

1. Ivory Tower
   a. More dogmatic; focused on standardization only: "All UIs will be built with Angular."
   b. When this architect is done, there is no room to admit the system can be improved
2. Coder
   a. Each component is good enough for the current stresses, and the architect knows which components will need to be changed if stresses increase.

## Part I: Create Stability

### Chapter 2: Case Study: The Exception that Grounded an Airline

- After the planned database failover was marked "Completed, Successful," nothing unusual occurred for the next two hours (because the problem was a memory leak).
- The team was prepared with automated scripts to retrieve thread dumps.
  - This is perfect, because it aids in investigation, but doesn't prolong the incident.
- You can always "reboot the world," (i.e., restart every component), but that can take a long time. If possible, you want to only treat the problem causer.

#### The Smoking Gun

- `java.sql.Statement.close()` can throw a `SQLException`, and the code didn't handle it. It threw an exception, and the connection to the database did not get closed, causing a resource leak.
- The focus is not on preventing these kinds of bugs (this would have been way hard to prevent), but on the question of **"How do we prevent bugs in one system from affecting everything else?"**
- He mentions that at the time he didn't have a checklist for post-mortems of incidents, and I realized that a checklist would be a really great thing to have for incidents. It could tell you who to notify, what steps to take, what to consider for causes of the error, etc.

### Chapter 3: Stabilize Your System

> Enterprise software must be cynical. Cynical software expects bad things to happen and is never surprised when they do.

- The CF project for the airline was not cynical enough.

> A robust system keeps processing transactions, even when transient impulses, persistent stresses, or component failures disrupt normal processing.

- The focus is on making sure that your users can still get work done, even when something fails.

> If new code is deployed into production every week, then it doesn't matter if the system can run for twe years without rebooting.

- Some terms:
  - **Impulse** - A rapid shock to the system. Spikes in load, like going viral.
  - **Stress** - A force applied over an extended period. Example, a slow API.
  - **Strain** - How a system is changed by stress. How would a hot spot in performance change a system overall.
- Metaphor with physical architecture: how do you stop cracks from spreading?

#### Failure Modes, and Chains of Failure

- Some more terms:
  - **Fault** - A condition that creates an incorrect internal state
  - **Error** - Visibly incorrect behavior (500 error)
  - **Failure** - Unresponsive system
- Faults snowball into errors, which snowball into failures
- Failures almost always occur at the boundaries between systems

#### Extending Your Life Span

Major dangers to a system's longevity:

- Memory leaks
- Data growth

- These are long-term, slow-burn events that are nearly impossible to catch in testing. Applications never run long enough in your development environment to reveal their longevity bugs.
- You have to run your own longevity tests.

### Chapter 4: Stability Antipatterns

- Tight coupling allows cracks in one system to cross boundaries to other systems.

#### Integration Points

- Connections always outnumber the services.
- "Integration points are the number one killer of systems."

##### Socket-Based Protocols

- Virtually all integration points are socket-based.
- Simplest failure is a connection refusal.
- "A new architect will focus on the boxes; and experienced one is more interested in the arrows."

##### Transmission Control Protocol (TCP) Explained

1. Client sends SYN (Synchronize) to server
2. Server sends SYN/ACK (Synchronize/Acknowledgment) to client, which means it will accept connections
3. Client sends ACK (Acknowledgment)
4. The two applications can now send data back and forth

- The server has a listen queue, and if it gets full for some reason, it won't send SYN/ACK, so the caller has to wait until it gets around to responding or until the connection attempt times out, which usually takes **minutes**.
- A similar thing happens when the server accepts connections but takes too long to process the request. The default is to just block forever while waiting for the server.
- A slow connection is better than no connection.
- `tcpdump` is a Unix command that has output similar to Wireshark.
- A TCP connection can last for _days_ without either side sending any packets, as long as the two computers store the socket memory.
- A firewall is a specialized router. It routes packets from one physical port to another. It checks incoming `SYN` packets against its internal rule base and decides to accept (and route) connections, reject connections, or ignore connections.
- **The key point is that the firewall keeps track of connections for a limited period of time, but TCP can go forever. So a firewall might delete a connection if no packets are being sent through it, but TCP still thinks the connection is open.** So the TCP kept trying to send packets through the firewall, and nothing happened. The firewall wasn't even returning errors. They had to turn on _dead connection detection_ on the Oracle database, so that it would free up resources held by connections that were no longer responding.
- **Not every problem can be solved at the level of abstraction where it manifests.**

##### HTTP Protocols

- Use a client library that allows fine-grained control over timeouts, including both the connection timeout and the read timeout.
- Avoid client libraries that try to map responses directly into domain objects. Instead, treat it as "just data" until you've confirmed it meets your expectations.
- Unexpected response body is a common problem:
  - Experian Login page
  - HTML page when JSON is expected

##### Vendor API Libraries

- Software vendors provide API libraries that often have a lot of issues.
- He keeps talking a lot about handling different threads and avoiding deadlock.

##### Countering Integration Point Problems

Most effective methods:

- Circuit breaker (p. 95)
- Decoupling middleware (p. 117)

**Every integration point will fail in some way, and you need to be prepared for that failure.**

You need to do more than handle error responses. You need to be able to handle slow responses and hangs, too.

#### Chain Reactions

- Horizontal scaling: add more servers (more common)
- Vertical scaling: add more resources to the server

If a defect causes a memory leak, and one server goes down, then the other servers in the farm have to add an extra burden, which makes them more likely to go down, all until the last one goes down.

- One server down jeopardizes the rest. And generally the failures accelerate as more servers go down.
- Usually chain reactions occur when you have a resource/memory leak.
- Autoscaling resource managers can recover from chain reactions, as long as they can decommission and pull up new servers faster than the chain reaction occurs.

#### Cascading Failures

- Stop cracks from jumping the gap from one system to another, usually when the calling system is insufficiently paranoid.

#### Users

##### Traffic

How does your system react to excessive demand?

This is where running in the cloud is your friend, because you can autoscale. But it is pretty easy to rack up a huge bill because of a buggy application.

Stateful sessions can lead to situations where the server runs out of memory by holding everyone's session data. This is why stateless sessions are nice.

If you _have_ to keep data in the session, you should use weak references, which allow the garbage collector to eat them up when it needs more memory. And then you just need to make sure that the caller knows how to deal with a `null`.

##### Off-Heap Memory, Off-Host Memory

Memcached and Redis are popular tools for moving memory outside of your process. Many systems use Redis to store session data.

##### Expensive to Serve

Have load tests for your expensive transactions, or expensive user flows (when the user is doing a lot of stuff).

Expensive users are usually the ones that bring you the most revenue, because they're interacting with your system.

##### Unwanted Users

Sessions are the Achilles' heel of web applications. If you pick a deep link from a site and start sending requests to it over and over without cookies, it'll create a new session for every request.

There's an entire industry built on the idea of consuming resources from other companies' websites, called _competitive intelligence_. Bots & scrapers.

###### Session Tracking: Cookies

HTTP is stateless, so even if the same person makes the same request over and over, the server doesn't know that it's coming from the same place. Netscape found a way to add a little extra data into the protocol, called Cookies. Cookies are mostly used to mantain the idea of a session.

##### Malicious Users

- **Advanced persistent threat** - a user who continues to research your defenses and keeps trying to bring your site down. It's pretty much guaranteed that you'll be breached by this kind of attacker.
- **Script kiddies** - people who probe your site for fun.

Most common attack is the distributed denial-of-service (DDoS) attack. The attacker causes many computers to start generating load on your site. They usually use a botnet, which is a computer that issues commands to a bunch of other compromised computers.

Most network vendors have software to help prevent DDoS attacks.

#### Blocked Threads

- Importance of supplementing internal monitors with external monitoring. Usually the server won't completely crash, but something will hang. When this occurs, the internal monitors might not recognize a problem. But if you have an external client making synthetic transactions and they start failing, you know that there is a problem.
- From the user perspective, a hung system is de facto a crashed system.
- It's extremely difficult to identify hung threads during development.
- Always make sure to have timeouts in your code, even though it requires you to do more error handling.
- Blocked threads are often caused by resource pools, and in particular database connection pools.

#### Self-Denial Attacks

- **Self-Denial Attack**: When the system, or larger system (including humans) conspires against itself.
- Examples:
  - Marketing sends an offer to a select group of users. The email gets forwarded to millions of people who try to redeem the coupon code.
  - Electronics retailer sends marketing email for pre-orders of the Xbox 360, with exact details on the date that the official Xbox site would open for preorders. They included a deep link to the Xbox site, and after it launched, it crashed within 60 seconds because of how many visitors it had.
- Really though, it often _does_ have to do with marketing.
- How to avoid self-denial:
  - "Shared nothing" architecture (each server can run without knowing anything about the other servers)
  - "Pre-autoscale." Up your resources _before_ the marketing campaign is released

#### Scaling Effects

- Square-cube law: explains why you'll never see a spider the size of an elephant. By the time it gets large enough to weigh that much, the legs just wouldn't be able to support it.
- Point-to-point communications (i.e., servers talking to each other). It's fine for a few services, but as you grow, and ever server needs to talk to every other server, it can crumble quickly.
- Unrelated: XP principle: "Do the simplest thing that will work."
