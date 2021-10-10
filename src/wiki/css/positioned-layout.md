---
title: Positioned Layout
---

## Relative positioning

Relative positioning can be applied to both block and inline elements. The fact that it can apply to inline elements lets us do some interesting things, like making a bit of text appear to float slightly:

```html
<style>
  .floating-text {
    position: relative;
    top: -4px;
  }
</style>

<p>This text appears to <span class="floating-text">float a little bit</span>!</p>

```

## Absolute positioning

When we use absolute positioning on an element, we pull it out of flow. When the browser is laying out elements, it effectively pretends that it doesn't exist.

With positioned layout, the algorithm doesn't even pay attention to what we have `display` set to, unless it's `none`. (Relative positioning is an exception to this; it's sort of halfway because it tries to treat the element as it would have if it hadn't been taken out of flow.)

### Sizing with absolute positioning

