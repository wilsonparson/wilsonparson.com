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

#### Failure Modes
