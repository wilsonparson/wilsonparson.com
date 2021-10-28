---
title: 'Module 3: Modern Component Architecture'
---

- For almost every component he creates using styled components, he usually calls the outermost element `Wrapper`.
- The `article` HTML element isn't just for blog our journal articles. It's for anything that could be independently shared or reused. Some examples:
  - Blog post
  - Forum post
  - Product card
  - User comment
  - Interactive widget or gadget
  - Any other independent item of content.
- For the contact card component we built, he used an `article` as the outermost element.

## Global styles

- It doesn't really matter where you put the global styles element. Regardless of where it's rendered, it will be injected into the head of your document.
- He uses CSS resets.
- It can be a little tedious to create a component for paragraphs and for headings when you could just apply global styles. Need to weigh trade offs.
- He uses lots of CSS variables.