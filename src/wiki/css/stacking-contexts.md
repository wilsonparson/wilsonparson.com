---
title: Stacking Contexts
---

## Flow Layout

- You can force elements to overlap using negative margins.
- The elements "below" other elements in the DOM tree will show up on top.
- But **content is painted separately from the background**. 😱
  - Background colors and borders are truly meant to be _in the background_, while the content floats on top.
  - Flow layout isn't really built with layering in mind.

## Positioned Layout

- As a general rule, _positioned elements will always render on top of non-positioned ones_.
  - First, all non-positioned elements are rendered.
  - Then, all positioned elements are rendered on top.
- If _both_ siblings use positioned layout, then DOM order matters again.

## z-index

- For when you want the layered order to be different from the DOM order.
- Only works with positioned elements. It has no effect on elements in Flow layout.
- Default value is `auto`, which is `0`.
- Must be integers.
- Can be negative.
  - But negative z-indexes introduce additional complexity without offering much benefit.

## Introduction to stacking contexts

- z-index values are not global. They don't compare across your application.
- When you create a new stacking context, it means that any child of that element will only be compared with other children of that element.

```html
<style>
  header {
    position: relative;
    z-index: 2;
  }
  main {
    position: relative;
    z-index: 1;
  }
  .tooltip {
    position: absolute;
    z-index: 99999;
  }
</style>

<!-- z-index is "2.0" -->
<header>My site</header>
<!-- z-index is "1.0" -->
<main>
  <!-- z-index is "1.9999" -->
  <div class="tooltip">My tooltip</div>
  <p>Some main content</p>
</main>
```

In the case of the code above, `.tooltip` is part of the stacking context created by `<main>`, which means that it'll only be compared with other children of `<main>` to decide how it should render. You can only compare the tooltip and the paragraph, and decide which one goes on top. That's it.

Since `<main>` has a smaller z-index than `<header>`, there's nothing that `<main>`'s children can do to appear on top of `<header>`.

The easiest way to fix the problem above is to make sure that `.tooltip` is not inside a stacking context. In other words, remove the z-index from `<main>`.

## How to create stacking contexts

1. Use positioned layout on an element.
2. Set a z-index.

As long as these two things are true, the element will have a stacking context.

### Other ways to create stacking contexts

- Set `opacity` to less than `1`
- Set position to `fixed` or `sticky` (no need for z-index to create a new stacking context with these positions)
- Apply a `mix-blend-mode` other than `normal`
- Adding `z-index` to a child inside a `display: flex` or `display: grid` container
- Using `transform`, `filter`, `clip-path`, or `perspective`
- Explicitly creating a context via `isolation: isolate`.

There's a "CSS Stacking Context Inspector" in Chrome extensions that adds another tab to your devtools.

## Managing z-index

- Often, z-index can be avoided if you just use the right DOM order for the layering you're wanting.
  - Be careful about accessibility when you do this, though.
- Intentionally bundle elements together under a parent, and give that parent a new stacking context. This will help you avoid the bugs where one of your elements randomly floats on top of the fixed header.
- Instead of using positioned layout and setting z-index on an element, you can create a stacking context by doing `isolation: isolate`.
  - This is nice because it creates a stacking context without requiring us to set a z-index.
  - This can be particularly nice for components. You don't want the z-index to bleed out of the component and affect other things. `isolation: isolate` allows you to have a single stacking context for your component.
  - You should think about using this on a parent element whenever you add a `z-index` to a child element, because it helps you avoid those weird, unexpected bugs.

## Portals

- In general, they're a solution to the z-index problem.
- They allow you to render a component as a sibling to your `#root` app container in the DOM tree.
- This is helpful for things like modals.
- If you want to make sure your app elements are in a different stacking context than what's in your portal, you can use `#root { isolation: isolate; }` to create a stacking context for the app explicitly.
