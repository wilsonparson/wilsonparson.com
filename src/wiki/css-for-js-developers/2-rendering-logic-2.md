---
title: 'Module 2: Rendering Logic II'
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

## Stacking Contexts

### Flow Layout

- You can force elements to overlap using negative margins.
- The elements "below" other elements in the DOM tree will show up on top.
- But **content is painted separately from the background**. 😱
  - Background colors and borders are truly meant to be _in the background_, while the content floats on top.
  - Flow layout isn't really built with layering in mind.

### Positioned Layout

- As a general rule, _positioned elements will always render on top of non-positioned ones_.
  - First, all non-positioned elements are rendered.
  - Then, all positioned elements are rendered on top.
- If _both_ siblings use positioned layout, then DOM order matters again.

### z-index

- For when you want the layered order to be different from the DOM order.
- Only works with positioned elements. It has no effect on elements in Flow layout.
- Default value is `auto`, which is `0`.
- Must be integers.
- Can be negative.
  - But negative z-indexes introduce additional complexity without offering much benefit.

### Introduction to stacking contexts

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

### How to create stacking contexts

1. Use positioned layout on an element.
2. Set a z-index.

As long as these two things are true, the element will have a stacking context.

#### Other ways to create stacking contexts

- Set `opacity` to less than `1`
- Set position to `fixed` or `sticky` (no need for z-index to create a new stacking context with these positions)
- Apply a `mix-blend-mode` other than `normal`
- Adding `z-index` to a child inside a `display: flex` or `display: grid` container
- Using `transform`, `filter`, `clip-path`, or `perspective`
- Explicitly creating a context via `isolation: isolate`.

There's a "CSS Stacking Context Inspector" in Chrome extensions that adds another tab to your devtools.

### Managing z-index

- Often, z-index can be avoided if you just use the right DOM order for the layering you're wanting.
  - Be careful about accessibility when you do this, though.
- Intentionally bundle elements together under a parent, and give that parent a new stacking context. This will help you avoid the bugs where one of your elements randomly floats on top of the fixed header.
- Instead of using positioned layout and setting z-index on an element, you can create a stacking context by doing `isolation: isolate`.
  - This is nice because it creates a stacking context without requiring us to set a z-index.
  - This can be particularly nice for components. You don't want the z-index to bleed out of the component and affect other things. `isolation: isolate` allows you to have a single stacking context for your component.
  - You should think about using this on a parent element whenever you add a `z-index` to a child element, because it helps you avoid those weird, unexpected bugs.

### Portals

- In general, they're a solution to the z-index problem.
- They allow you to render a component as a sibling to your `#root` app container in the DOM tree.
- This is helpful for things like modals.
- If you want to make sure your app elements are in a different stacking context than what's in your portal, you can use `#root { isolation: isolate; }` to create a stacking context for the app explicitly.

## Overflow

### Default overflow: `visible`

The content overflows out of the container, but it has **no effect on layout**.

### Scroll

On a Mac, it doesn't show the scrollbars (horizontal or vertical), but for Windows and Linux, it _does_. Luckily Mac has a setting that lets you "Always show" scrollbars, so that the experience is consistent among operating systems. Developers should turn on this setting so they don't unknowingly create weird experiences for Windows and Linux users. It'll make your experience on your computer less than ideal, but it's a good sacrifice that will make you better at your job.

### Auto

Recommended for most situations when you want an element to be scrollable. It adds a scrollbar when one is required.

There are tradeoffs, though. If you _know_ your content will always need a scrollbar, you can avoid a layout shift when `auto` adds the scrollbar by using `scroll`. Content is shifted about 15px when a scrollbar is added.

### Hidden

- Good for truncating text w/ ellipsis.
- You can also use it for artistic purposes (e.g., a portion of a circle that is only partially showing).
- Every time you use `hidden`, do yourself a favor and leave a comment to explain why.

### Scroll containers (gotcha)

When we set either `overflow-x` or `overflow-y` on an element, it turns that element into a "scroll container," which is a scrollable box. Children of a scroll container are locked inside that box; they can't ever spill outside of it. In other words, **you can't set `overflow-x: hidden` and `overflow-y: visible`**, and expect the contents to overflow out the bottom of the container. It will add a scrollbar. **There's no such thing as a scroll container that only scross in one axis**.

When we set `overflow: hidden`, we're actually just **removing the scrollbars**.

### Horizontal overflow

If you want inline/inline-block elements to not line wrap, so that you can use horizontal scrolling, you need to do `white-space: nowrap`.

CSSWG has called the spelling `nowrap` a mistake (should be `no-wrap`), but you can remember that it's one word by thinking of the word `nonsense`.

### Positioned layout

Generally the concept of overflow is mostly concerned with Flow layout, or something like Flexbox/Grid.

Overflow generally works the same for positioned layout, **as long as the overflow is set on the containing block**.

In order for a child to trigger the overflow, it needs to be contained by it. So `fixed` children, for example, won't trigger the overflow if their parent element has overflow set, because `fixed` elements' containing block is the viewport.

## Sticky Positioning

The idea is that as you scroll, an element can "stick" to the edge of the viewport. At that moment, it transitions from being relatively-positioned to fixed-positioned.

You have to specify at least one edge to stick to (`top` | `left` | `right` | `bottom`), or it won't work.

### Stays in their box

Sticky elements only stick while their container is in view. They will never follow the scroll outside of their parent's container. They remain contained by their parent.

### Offset

The value you provide for `top`, etc. controls the **minimum gap between the element and the edge of the viewport** while the container is in frame.

### Not incorporeal

Sticky elements are like relative or static elements: they are corporeal and take up space in flow.

### Horizontal stickiness

Sticky positioning works with horizontal scrolling as well.

### Browser support

- Supported in all major browsers!
- No more weird bugs with iOS Safari!
- Works with tables in all major browsers now too!

### Notes from Exercises

- You can add a feeling of "cushion" to your sticky header, if you have some extra padding in the header and then use a negative value for `top`, so that part of the header is off the viewport when sticky positioning kicks in.
- Again, **a sticky element can never leave the containing block of its parent.**

### Troubleshooting

- If you set `overflow` to anything on the parent of a sticky element, the sticky element now sticks in _that_ scroll container's context, not the viewport's context. So it won't work as you're expecting. **Sticky elements either stick to the main viewport scroll, on to an ancestor that manages overflow.**
- Make sure that your sticky element has room to move within its parent container. If the parent is too small, position sticky won't do anything.
- The sticky element might be stretched because of Flexbox or Grid, which would make it so it can't move in its parent container.
- Sometimes there might be a thin 1px gap between the element and the edge of the viewport in Chrome. Just give it `top: -1px` instead of `top: 0` to resolve it.

## Hidden content

### display: none

- Effectively removed from the DOM.
- Cannot be clicked or focused.

**Should I manage it on React (render/don't render the element) or with CSS?**

- It it's dependent on screen width (i.e., media query), absolutely do it with CSS and not React. You _could_ do it with JS, but it doesn't work well with server-side rendering.
- If you have many many items and only need to render one, it might make sense to do it with JS so all the hidden elements are truly gone and don't hog memory.
- If you need to animate an element right after it renders, it's probably better to use CSS.

### visibility: hidden

- Still corporeal, just invisible. Like a cloak of invisibility.
- Not as commonly used, because you don't want a hole in your UI.
- Can be useful if you want an invisible child to control its parent's layout.
- Weird: Can be selectively undone by children. You can hide a parent element and the show the child while the parent is hidden.

### Opacity

- Elements with 0 opacity are still interactive.
- Helpful when an element's visibility needs to be animated (e.g., fade).


### Visually hidden

He used an approach with `clip` and negative margins to visually hide children for accessibility, similar to Bootstrap's `.sr-only` class. Apparently it's more reliable than aria attributes, which certain screen readers sometimes don't read.

### Character creator exercise

- With fixed positioning, keep in mind that your top/left/right/bottom values can be percentages.
- You can also add margins on top of top/left/right/bottom.