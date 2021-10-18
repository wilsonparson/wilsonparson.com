---
title: Release It! Design and Deploy Production-Ready Software
eleventyNavigation:
  key: Release it!
---

## Chapter 1: Living in Production

### Aiming for the right target

- We all focus on what our systems _should_ do, but we should also be focusing on what they _should not_ do.
- Don't aim to pass QA; aim for life in production.
  - Write code that will make your future self and operations happy, not just QA.
- Accept the fact that despite your best laid plans, bad things will still happen.
  - Of course, you want to prevent bad things that you can anticipate, but you also need to focus on making sure your system can recover from any unanticipated trauma.
- The goal is to build systems that operate at low cost and high quality.

### A Million Dollars Here, A Million Dollars There

- Don't optimize development cost at the expense of operational cost.
  - Systems spend much more of their life in operation than in development.
  - If you lose lots of money during 5 minutes of downtime on every release, it might be worth spending an extra \$50,000 to be able to release without downtime.
- Design and architecture decisions are also financial decisions.

### Pragmatic Architecture

Two types of architects:

1. Ivory Tower
   a. More dogmatic; focused on standardization only: "All UIs will be built with Angular."
   b. When this architect is done, there is no room to admit the system can be improved
2. Coder
   a. Each component is good enough for the current stresses, and the architect knows which components will need to be changed if stresses increase.

## Part I: Create Stability

## Chapter 2: Case Study: The Exception that Grounded an Airline

- After the planned database failover was marked "Completed, Successful," nothing unusual occurred for the next two hours (because the problem was a memory leak).
- The team was prepared with automated scripts to retrieve thread dumps.
  - This is perfect, because it aids in investigation, but doesn't prolong the incident.
- You can always "reboot the world," (i.e., restart every component), but that can take a long time. If possible, you want to only treat the problem causer.

### The Smoking Gun

- `java.sql.Statement.close()` can throw a `SQLException`, and the code didn't handle it. It threw an exception, and the connection to the database did not get closed, causing a resource leak.
- The focus is not on preventing these kinds of bugs (this would have been way hard to prevent), but on the question of **"How do we prevent bugs in one system from affecting everything else?"**
- He mentions that at the time he didn't have a checklist for post-mortems of incidents, and I realized that a checklist would be a really great thing to have for incidents. It could tell you who to notify, what steps to take, what to consider for causes of the error, etc.

## Chapter 3: Stabilize Your System

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

### Failure Modes, and Chains of Failure

- Some more terms:
  - **Fault** - A condition that creates an incorrect internal state
  - **Error** - Visibly incorrect behavior (500 error)
  - **Failure** - Unresponsive system
- Faults snowball into errors, which snowball into failures
- Failures almost always occur at the boundaries between systems

### Extending Your Life Span

Major dangers to a system's longevity:

- Memory leaks
- Data growth

- These are long-term, slow-burn events that are nearly impossible to catch in testing. Applications never run long enough in your development environment to reveal their longevity bugs.
- You have to run your own longevity tests.

## Chapter 4: Stability Antipatterns

- Tight coupling allows cracks in one system to cross boundaries to other systems.

### Integration Points

- Connections always outnumber the services.
- "Integration points are the number one killer of systems."

#### Socket-Based Protocols

- Virtually all integration points are socket-based.
- Simplest failure is a connection refusal.
- "A new architect will focus on the boxes; and experienced one is more interested in the arrows."

#### Transmission Control Protocol (TCP) Explained

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

#### HTTP Protocols

- Use a client library that allows fine-grained control over timeouts, including both the connection timeout and the read timeout.
- Avoid client libraries that try to map responses directly into domain objects. Instead, treat it as "just data" until you've confirmed it meets your expectations.
- Unexpected response body is a common problem:
  - Experian Login page
  - HTML page when JSON is expected

#### Vendor API Libraries

- Software vendors provide API libraries that often have a lot of issues.
- He keeps talking a lot about handling different threads and avoiding deadlock.

#### Countering Integration Point Problems

Most effective methods:

- Circuit breaker (p. 95)
- Decoupling middleware (p. 117)

**Every integration point will fail in some way, and you need to be prepared for that failure.**

You need to do more than handle error responses. You need to be able to handle slow responses and hangs, too.

### Chain Reactions

- Horizontal scaling: add more servers (more common)
- Vertical scaling: add more resources to the server

If a defect causes a memory leak, and one server goes down, then the other servers in the farm have to add an extra burden, which makes them more likely to go down, all until the last one goes down.

- One server down jeopardizes the rest. And generally the failures accelerate as more servers go down.
- Usually chain reactions occur when you have a resource/memory leak.
- Autoscaling resource managers can recover from chain reactions, as long as they can decommission and pull up new servers faster than the chain reaction occurs.

### Cascading Failures

- Stop cracks from jumping the gap from one system to another, usually when the calling system is insufficiently paranoid.

### Users

#### Traffic

How does your system react to excessive demand?

This is where running in the cloud is your friend, because you can autoscale. But it is pretty easy to rack up a huge bill because of a buggy application.

Stateful sessions can lead to situations where the server runs out of memory by holding everyone's session data. This is why stateless sessions are nice.

If you _have_ to keep data in the session, you should use weak references, which allow the garbage collector to eat them up when it needs more memory. And then you just need to make sure that the caller knows how to deal with a `null`.

#### Off-Heap Memory, Off-Host Memory

Memcached and Redis are popular tools for moving memory outside of your process. Many systems use Redis to store session data.

#### Expensive to Serve

Have load tests for your expensive transactions, or expensive user flows (when the user is doing a lot of stuff).

Expensive users are usually the ones that bring you the most revenue, because they're interacting with your system.

#### Unwanted Users

Sessions are the Achilles' heel of web applications. If you pick a deep link from a site and start sending requests to it over and over without cookies, it'll create a new session for every request.

There's an entire industry built on the idea of consuming resources from other companies' websites, called _competitive intelligence_. Bots & scrapers.

##### Session Tracking: Cookies

HTTP is stateless, so even if the same person makes the same request over and over, the server doesn't know that it's coming from the same place. Netscape found a way to add a little extra data into the protocol, called Cookies. Cookies are mostly used to mantain the idea of a session.

#### Malicious Users

- **Advanced persistent threat** - a user who continues to research your defenses and keeps trying to bring your site down. It's pretty much guaranteed that you'll be breached by this kind of attacker.
- **Script kiddies** - people who probe your site for fun.

Most common attack is the distributed denial-of-service (DDoS) attack. The attacker causes many computers to start generating load on your site. They usually use a botnet, which is a computer that issues commands to a bunch of other compromised computers.

Most network vendors have software to help prevent DDoS attacks.

### Blocked Threads

- Importance of supplementing internal monitors with external monitoring. Usually the server won't completely crash, but something will hang. When this occurs, the internal monitors might not recognize a problem. But if you have an external client making synthetic transactions and they start failing, you know that there is a problem.
- From the user perspective, a hung system is de facto a crashed system.
- It's extremely difficult to identify hung threads during development.
- Always make sure to have timeouts in your code, even though it requires you to do more error handling.
- Blocked threads are often caused by resource pools, and in particular database connection pools.

### Self-Denial Attacks

- **Self-Denial Attack**: When the system, or larger system (including humans) conspires against itself.
- Examples:
  - Marketing sends an offer to a select group of users. The email gets forwarded to millions of people who try to redeem the coupon code.
  - Electronics retailer sends marketing email for pre-orders of the Xbox 360, with exact details on the date that the official Xbox site would open for preorders. They included a deep link to the Xbox site, and after it launched, it crashed within 60 seconds because of how many visitors it had.
- Really though, it often _does_ have to do with marketing.
- How to avoid self-denial:
  - "Shared nothing" architecture (each server can run without knowing anything about the other servers)
  - "Pre-autoscale." Up your resources _before_ the marketing campaign is released

### Scaling Effects

- Square-cube law: explains why you'll never see a spider the size of an elephant. By the time it gets large enough to weigh that much, the legs just wouldn't be able to support it.
- Point-to-point communications (i.e., servers talking to each other). It's fine for a few services, but as you grow, and ever server needs to talk to every other server, it can crumble quickly.
- Unrelated: XP principle: "Do the simplest thing that will work."

### Unbalanced Capacities

- You need to actually test scenarios where your service gets overloaded with requests to make sure your front end degrades gracefully.
- For front end, test what happens when calls to the back end stop responding or get very slow.

### Dogpile

- We can learn a lot from how power is restored after a power outage. In the past, the surge of demand would often cause the power to go out only seconds after it was restored, because it would trip all the circuit breakers.
- **Dogpile**: when a bunch of servers impose a load all at once.
- Some common triggers:
  - Booting multiple servers at once
  - Running all cron jobs at the same time
  - When you push a config change to a bunch of places

### Force Multiplier

- Automated scaling can multiply mistakes, if it doesn't have the same beliefs about the state of the system that you do.
- Reddit had an outage because they turned off their auto scaler to upgrade a Zookeeper cluster. The package management system noticed that auto scaling was disabled and re-enabled it. The autoscaler then looked at the incomplete Zookeeper data and assumed that the services should be shut down to save money, causing the outage.
- Service discovery systems. If one of the nodes somehow loses contact with the services, it'll inform the other nodes that everything is down, and the other nodes will believe it.
- Make sure your infrastructure/auto scaling has controls that prevent it from multiplying force. Remember that infrastructure has beliefs about the state of the system and the desired state, and that they can be wrong.

### Slow Responses

- Often symptoms of memory leaks

### Unbounded Result Sets

- Design with cynicism: "What can system X do to hurt me?"
- Always include limits to DB queries.
- The caller should always indicate how much of a response it's prepared to accept.
- Develop and test with realistic data volumes. Dev and QA datasets are generally too small.
- Paginate results

## Ch. 5: Stability Antipatterns

"Not one of these will help your software pass QA, but they _will_ help you get a full night's sleep ... once your software lauches."

### Timeouts

- Networks are fallible. Everything is a distributed system nowadays, so everything has to grapple with the reality of networks.
- Simple: "You stop waiting for an answer once you think it won't come."
- "Well-placed timeouts provide fault isolation—A problem in some other service or device does not have to become your problem."
- Support for timeouts is becoming rarer and rarer in commercial client libraries.
- By adding all this error handling, it _does_ increase the complexity of your code. Nearly half of your code will be devoted to error handling. But that's what is necessary to make your system resilient in production.
- You can put the timout logic in a single place. For example, instead of explicitly handling the timeout in every place where you checkout a database connection from a resource pool, just use a common gateway that handles the timeouts for the calling code.
- Fast retries usually don't resolve the problem. Instead of retrying while the client is waiting, send a result, even if it's a failure.
- Slow retries are a good thing that can help the system recover. Queue the operation and try again later.
- Apply timeouts to integration points, blocked threads, and slow responses. In general, use them for outbound requests.

### Circuit Breaker

- Electricians use fuses to burn out and break the circuit so that the wires in the house don't ignite and burn the house down.
- You allow one system to fail and break the circuit, so that the entire system doesn't fail.
- "You can wrap dangerous operations with a component that can circumvent callso when the system is not healthy."
- You have some kind of component that keeps track of failed calls, and when the failed calls exceed a certain threshold, it "opens" the circuit. When call succeeds, it resets the fail count to 0.

1. A call succeeds, the circuit breaker stays closed, and keeps failure count at 0.
2. A call fails, the circuit breaker stays closed, but increments the failure count.
3. `n` calls fail, the circuit breaker opens the circuit, immediately failing calls without even attempting to perform the operation.
4. After a given period of time, the circuit goes "half-closed," and tries to actually perform the next request.
5. If it fails, the circuit breaker opens the circuit again. If it succeeds, the circuit breaker fully closes the circuit.

#### Options for what the Circuit Breaker can return when it's open

- Just an error saying what's going on
- The last cached response
- A generic response rather than a personalized one.
- Could call a secondary service instead.

Involve the stakeholders to help you decide how to handle calls when the circuit is open.

#### Counting faults

- We're more interested in _fault density_. In other words, we care more about 5 faults in the last 30 seconds than 5 faults in the last 5 hours.
- "Leaky Bucket" pattern: The counter increments faults when they happen, and decrements them over time, back down to zero.

#### Logging & Monitoring Circuit Breakers

- You need to log when the circuit breaker changes states
- The current state of the circuit breaker should be exposed for querying or monitoring
- You need some way to directly trip or reset the circuit breaker

---

- He recommends to use open-source circuit breaker libraries rather than writing one from scratch.

### Bulkheads

- In a ship, bulkheads are partitions that can be sealed to provide water-tight compartments, so that water can't leak from one section to another.
- Physical redundancy is the most common form of bulkheads.
- A load balancer can help with this. If one server goes down, the load balancer can direct traffic to a different one.

### Steady State

- Nothing is infinite.
- Log rotation
- Cache size limit
- DB/HTTP Connection Pools
- Data archiving and purging
- Pagination in APIs

### Fail Fast

Failure response is better than a slow response.

- Validate user input (on the front-end)

### Let it Crash

### Handshaking

- Rejecting incoming work, because of full load.

### Test Harnesses

- Accept connections, but never send data
- Refuse all connections
- Read/write is very slow
- Response is too large

### Decoupling Middleware

- Middleware = tools that inhabit a singularly messy space: integrating systems that were never meant to work together

### Create Back Pressure

- As a queue length reaches infinity, response time also reaches infinity.

## Ch. 7: Foundations

"Designing for production means designing for people who do operations."

### NICs and Names

#### Hostname

1. The name an operating system uses to identify itself (run `hostname` command)
2. The external name of a system which DNS takes and resolves to an IP address.

These are not the same thing.

DNS to IP address is a many-to-many relationship. A single domain name can map to multiple IP addresses, via a load balancer. And multiple domain names can point to the same IP.

A single server can have many network interfaces. NIC = Network Interface Controller.

You can have some interfaces for production traffic, and some for monitoring or operations. It's also good practice to perform backups on a separate network interface, since backups are short bursts of large volume, it can clog up production traffic.

You should specify not only the port number, but also the domain name where you want your server to listen to incoming traffic.

### Physical Hosts

Back in the day, you wanted each box in the data center to be designed for high reliability. Now we use load-balanced services with so much redundancy that the loss of a single box isn't a big deal, so they're designed to be as cheap as possible.

### Virtual Machines in the Data Center

### Containers in the Data Center

### Notes from presentation

- Don't use the JavaScript `.now` function; rely on Postgres's timing.
