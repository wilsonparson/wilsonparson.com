---
layout: ../../layouts/MarkdownLayout.astro
title: Lessons from building my first design system
date: 2022-10-02
updated: 2022-10-15
---

During my last six months working at Earnest, I worked as the Team Lead on Earnest's _Design Systems Team_, a brand new team that I pushed for us to create shortly after our new Head of Design joined the company. Our goal was to build a brand new design system, called _Nucleus_, that would replace the previous two design systems at Earnest, _Oahu_ and _Maui_.

Our team had me, another front-end engineer, and a visual designer. While we didn't get nearly as far building the design system as I had hoped before my time was up, we _were_ able to lay a decent foundation, and I personally learned and grew from the experience.

This post is a summary of the lessons I learned building _Nucleus_ between February and September of 2022.

- Remove your ego
- Don't build everything from scratch
- Use stuff that is already built
- Just go with sensible defaults
- Avoid analysis paralysis (waterfall)
- Work with a team to test things out early, but keep your expectations low for output
- You won't get it right the first time, so do the first time as soon as possible rather than delaying it out of fear of getting it wrong
  - Could quote _The Mythical Man-Month_ about this idea.
- Make sure design systems engineers have empathy for the consumers of the system.
  - "They're using it wrong. I don't know why they would do it that way."
  - "This component is done." (no testing, documentation or even stories)
  - Not being willing to test your own work
  - Blame-shifting: "No one ever told me this was a pain point."
  - Lazy API design:
    - "They could always just override it."
    - "It'll just work with global styles as long as the designer does it right."
    - If they want to render an H1 variant as a `<p>` tag, they'll be SOL. (not willing to reset user agent styles)
- Get real
- Avoid over-optimism and over-simplification
  - "Why do we need to build spacing utilities? They just need components."
  - It won't be right the first time. It won't.
  - It won't "just work" with global styles, and without spacing utilities and guardrails.

I just can't get over how much more flow I feel when I can write in markdown without restriction. I've given Wordpress a try, and it just feels too clunky to get my thoughts down. I've tried to remember that just because I know how to code doesn't mean that everything has to be coded. But when you get used to the speed and simplicity of writing in a text editor, it's so hard to go back. I really wanted to find a solution that would allow me to edit posts and publish them on my phone. I don't know if I can find that if I do a markdown blog...

I guess I technically could use _Working Copy_...
