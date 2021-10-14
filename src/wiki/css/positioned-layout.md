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

<p>
  This text appears to <span class="floating-text">float a little bit</span>!
</p>
```

## Absolute positioning

When we use absolute positioning on an element, we pull it out of flow. When the browser is laying out elements, it effectively pretends that it doesn't exist.

With positioned layout, the algorithm doesn't even pay attention to what we have `display` set to, unless it's `none`. (Relative positioning is an exception to this; it's sort of halfway because it tries to treat the element as it would have if it hadn't been taken out of flow.)

### Sizing with absolute positioning

- Absolutely positioned elements want to be as small as they can. They'll shrink to fit the content.
- However, if you have a _ton_ of content, the size of the element will stop when it hits the edge of its containing block.
- If it _can't_ line wrap, though, the element's box will stay within the containing block, but its content will bleed out of the actual box.
- In the example below, the `.abs` div's border will remain 32px from the right edge of the viewport, but the content will overflow out of it.
- Absolutely positioned elements are extremely compliant. They will try to do exactly what properties we give it.
- But if we give it some leeway (e.g., we don't give it a width or a `right` value), when it has a lot of content, it'll expand its width as far as it can, right up to the edge of the containing block, and then it will wrap to a new line if it can.

```html
<style>
  .abs {
    position: absolute;
    top: 32px;
    left: 32px;
    right: 32px;
    border: 2px solid slateblue;
  }
</style>

<div class="abs">
  Lookatme!Iamaverylongsentencewithfartoomanywordsandletterstofitonasinglelineintheavailablespace.
</div>
```

### Centering trick with absolute positioning

This will center an element vertically and horizontally in the viewport:

```css
.box {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100px;
  height: 100px;
  margin: auto;
  background: deeppink;
}
```

There are 4 important ingredients to do this:

1. absolute positioning
2. Equal distances from each edge (ideally 0px)
3. A fixed size (you have to define height and width)
4. Hungry margins (i.e., `margin: auto`)

Why this works:

`margin: auto` is hungry, so all the different margins compete with each other and push the element right into the center. With flow layout this works horizontally, but with absolute position it works in all directions!

You can use Flexbox and Grid to do this as well, but apparently he still uses this trick a ton for prominent bits of UI, like modals, drawers, dialog boxes, etc. So there must be scenarios where it's helpful.

## Containing blocks

- Absolute elements can only be contained by _other_ elements using Positioned layout (`relative`, `absolute`, `fixed`, `sticky`).
- To decide what an absolutely positioned element's containing block is, the algorithm just climbs up the DOM tree looking for the nearest ancestor using positioned layout. If it doesn't find any, it will use the "initial containing block," which is the viewport.
- When positioning absolute elemets according to a containing block, the algorithm ignores the containing block's padding. Padding is a concern of Flow layout, and absolute elements are _taken out of flow_.

It appears that margins trump directional values in absolute positioning:

```css
.box {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 0;
  margin-bottom: -100px;
}
```

The code above will move the box outside of its containing box.

**When you place an absolute element _without_ specifying the top/left/right/bottom, it sits where it would otherwise sit in its in-flow position, but it's incorporeal. It doesn't take up any space.**

### Exercises

#### Bubble border

- You can use `position: absolute` to add fun whimsical touches to things, like a bubble border.
- When you want a child to have the same property as a parent, remember to use `inherit`!

#### Tooltip

- Good idea to make the tooltip a child of the trigger element, so that it's easier to position it.
- Remember that you can have `border-color` inherit from `color` if you don't specify a color for your border (e.g., `border: 2px solid`).

## Fixed Positioning

Similar to absolute positioning, but even _more_ rebellious: it can _only_ be contained by the viewport. It doesn't care about containing blocks at all.

You can center a fixed element using the same trick we used for absolute positioning:

```html
<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 85%;
    height: 200px;
    margin: auto;
  }
</style>

<div>
  <div class="modal">Hello World</div>
</div>
```

You need the same ingredients:

1. Position absolute or fixed
2. All sides set to 0
3. Explicit dimensions
4. Auto margins

### Fixed position w/o anchor points

If we don't specify a top/left/right/bottom, then the fixed position element just sits where it would normally sit in flow layout. And just like absolutely positioned elements, it's incorporeal.

### The transform exception

An exception to the rule of fixed elements being fixed in the viewport is if an ancestor element uses the `transform` property. If that is the case, that element becomes the containing block for the fixed element. It essentially becomes an absolutely-positioned element.

**Transformed ancestors cannot have fixed descendants.**

Side note: sometimes the fastest way to find a culprit element that is breaking something for descendants is to run scripts that traverse the DOM, looking for the culprit.

Another side note: You can change the environment of your browser console so that it runs in the context of an iframe. There's a little dropdown that defaults to `top` above your console.
