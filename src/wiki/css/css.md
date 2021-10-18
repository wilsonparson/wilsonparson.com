---
title: CSS
---

## `::before` and `::after`

They're just spans that are placed as the first/last child of the element in which they're declared. When you don't include content, the spans aren't rendered.

## Combinators

Name for the characters used for combining selectors. In a descendant selector, the space is the combinator.

## `hsl`

The new way to specify the alpha channel is with a slash separator:

```css
.box {
  color: hsl(200deg, 100%, 50% / 0.5);
}
```

## `font-size` on `html` element

You shouldn't set a `px` font size on the `html` element, because it will override the user's default font-size settings. If you really want to change the baseline font size, you should use ems or rems.

## `px` vs. `rem` & accessibility

There are two ways users can resize the text on the page:

1. Zoom in (cmd +)
2. Set a larger default font size

`px` will work just fine for the first approach, since the browser scales _everything_ in. It's akin to changing the display resolution. It will _not_ work fine for the second approach—you need `rem` or `em` for that to work. So overall, the best approach is probably to use `rem` for font size.

## When to use which units

- Typography --> `rem`
- Box-model properties (e.g., padding, margin, border, etc.) --> `px`
- Width/height: --> `px` or percentage
- Color --> `hsl`
- Rare cases where you want something to scale directly with font size --> `em`

## Line height

Minimum recommended value for body text is `1.5`.

## `inherit`

A common example of where you might use it is to prevent hyperlinks from having their default blue styles and instead inheriting their color from an ancestor, so that they have the same color as the surrounding text.

## Logical properties

- `margin-block-start` --> `margin-top`
- `margin-block-end` --> `margin-bottom`
- `margin-inline-start` --> `margin-left`
- `margin-inline-end` --> `margin-right`

These are less rigid that the directional styles because they work with different writing directions.

There are logical variants for padding, border, and overflow as well.

## Box model

4 layers:

1. Content
2. Padding
3. Border
4. Margin

`box-sizing: content-box` is the default, but `box-sizing: border-box` is much more intuitive.

Default styles to add to every project:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

### `em` vs. `px` for box model properties

For padding, margin, and border, Josh Comeau argues that pixel values are actually _more_ accessible than `em`s. If people scale up the font size in their browser settings, it doesn't necessarily make sense to add more space between elements as well. For horizontal padding especially, using ems will cause context with different font sizes to not line up along the left gutter. And using ems will make lines of text much shorter when the user bumps up the font size in their browser settings. But it _could_ make sense to use relative units for vertical padding... it depends on if you think blocks of text should have spacing between them scale when the font size increases.

### When you only pass three values to shorthand declarations

It just starts at the top and works clockwise, and then when it runs out of units, it determines the next unit by mirroring the opposite side.

```css
.box {
  padding: 10px 40px 20px;
}
```

In the example above, it sets top padding to 10px, right padding to 40px, bottom padding to 20px, and then it's out of values for padding left! Since it's out of values, it looks at the right padding and mirrors it, so 40px.

## Flow Layout

- This is the name of the default layout.

### Inline elements

- They "don't make a fuss."
- You can set horizontal margins and padding on them, but you can't change width or height.
- Exception: Replaced elements: img, video, canvas
  - These are technically inline, but they can affect block layout.
  - Think of them like foreign objects with an inline wrapper. The objects themselves can receive a height/width/etc.
- Exception: buttons
  - Technically inline, but can receive a width and height
- Inline elements are displayed as if the they're typography. For example, an image with have a little extra space below it because of line height. You can get around this by setting the element in question to display block, or by setting the line height to zero.
- Inline elements will respect HTML white space sensitivity. So if you have image tags on new lines in your code, the browser will add little spaces between them.
- Inline elements can wrap to new lines, which makes it easier to understand why certain box-model properties aren't applicable to them.

#### `box-decoration-break`

If you want add horizontal padding to an inline element, and you want the padding to apply on every wrapped line, you can use:

```css
.my-inline-element {
  box-decoration-break: clone;
}
```

The default value is `slice`, which only renders the horizontal padding at the very beginning and end of the element. So for wrapped lines, they wouldn't respect the padding.

`clone`: this value will apply the horizontal padding on every wrapped line.

### Border

- If you don't specify a border color, it'll use the _font's color_ by default. You can also specify this explicitly by using the `currentColor` keyword.
- There are actually a lot of border styles: solid, dotted, dashed, double, groove, ridge, inset, outset.

### Outline

- Outline is different from border in that it _doesn't affect layout_ (i.e., box model).
- Outlines are stacked outside the border, and can sometimes be used as a "second border."
- No such thing as `outline-radius`. But browsers are _just barely_ starting to automatically match the radius of outline corners to border radius.
- `outline-offset`: allows you to add a little bit of gap between the element and its outline.

### Margin

- When you give an element a negative margin, it affects the flow of all the elements around it. For example, if you give it `margin-top: -20px`, then all the elements following it will shift up to fill the space displaced by the element you've given the negative margin.
- `auto` seeks to fill the maximum available space.
- `auto` isn't necessarily outdated for centering things. Although you can use Flexbox and Grid, there are some scenarios where `auto` is still most appropriate. An example would be if you just want to center all the block quotes in a blog post.
- Negative margins are handy for when you want an element to straddle a border for aesthetic effect.
- I've always avoided negative margins because they can be used in hacky ways when a better solution is available, but sometimes they _are_ the most straightforward solution. For example, if you want all of your content to have some padding, but you want images to span the whole width of the viewport, it's actually a little cleaner to just use negative margins on your images (or on containers around the images) than to specify the margin/padding for every individual piece of content.
  - You have to wrap images in a wrapper element so that your image can have `width: 100%` and will fill the space of the wrapper element. If you apply the negative margins to the image itself, it'll still have `width: 100%` of its parent container, and that still obeys the parent's padding, so the image won't stretch across the entire viewport.

### `inline-block`

- Allows you to "drop a block element into an inline context."
- Internally it acts like a block element, but externally, it acts like an inline element.
- Internally, we have the full scale of CSS flexbility, but the parent element treats it like an inline element.
- Doesn't line wrap.

## Width Algorithms

- Block-level elements do _not_ have a default width of 100%. They have a default width of `auto`.
- Percentage-based widths are based on **the parent element's content space**.
  - For example if the body is 400px wide, and you give a child element 100% width, the child element will be 400px wide, regardless of any other circumstances. So even if the child element has a margin, it'll still be 400px wide, and will overlap out of the body because of the margin.
- `auto` width is very similar to `auto` margin: it's a hungry value that will grow as much as it's able to, but no more. In other words, it'll respect margins.
  - Another way of looking at it is that `auto` width is context-aware, while 100% width is not.

### Keyword width values

#### `min-content`

- You want the content to become as small as it can, _based on the child contents_.
- This is an _intrinsic_ value, because it's focused on the element itself. _Extrinsic_ values, like `auto` focus on the space made available by the parent.
- `min-content` aggressively breaks text onto new lines at every white space or hyphenated word.

#### `max-content`

- Opposite strategy of `min-content`: it _never_ adds any line breaks.
- The element's width will be the smallest value that contains the content without breaking it up.
- Doesn't pay any attention to the parent. It's _intrinsic_.
- Produces a nice effect where you can "highlight" the text by providing a background that only stretches the width of the content.
  - But this can be risky: if the content is ever wider than the parent element, it'll just bleed right out of the right side of it.
  - Which leads us to the next keyword...

#### `fit-content`

- A perfect Goldilocks solution
- Based on the size of the children content
- If the width of the children content can fit within the parent container, it behaves just like `max-content`, not adding any line breaks.
- If the content is too wide to fit in the parent, it adds line breaks as needed to ensure it never exceeds the available space. In this case it behaves just like `width: auto`.
- This lets us achieve the "only highlighting the content width, and nothing more" effect.

### Max-width wrapper utility

This is a utility that you'll find yourself using all the time in projects. It looks something like this:

```css
.max-width-wrapper {
  max-width: 400px;
  margin-inline: auto;
  /* For smaller viewports, we don't want child elements to go right to the
    edge of the viewport. */
  padding-inline: 32px;
}
```

## Height Algorithms

Height behaves kind of like `width: min-content`: it shrinks as small as it can, while containing the children.

### Why `height: 100%` often doesn't work

```html
<body>
  <section></section>
</body>
```

```css
section {
  background: blue;
  height: 100%;
}
```

In the scenario above, `height: 100%` will have no effect. This is because by default, the height of an element is determined by its children contents. Our style is telling `section` to set its height to 100% of the `body` height, but the `body` height is determined by the `section` element, which is 0.

The solution:

```css
html,
body {
  min-height: 100%;
}

section {
  background: blue;
  min-height: 100%;
}
```

You have to set `min-height: 100%` starting at the root element: `html`. This will tell `html` to fill the entire viewport height. Then you can do the same with `body`, and however many child elements you want.

> Note: Josh Comeau recommends `height: 100%` on the `html` and `body` elements, but when your content becomes taller than the viewport, I noticed that the `body` doesn't grow with it, only `html` does. So in other words, your content is bleeding out of your `body` if it's longer than one screen height. It doesn't seem to have a visible effect on anything, but you might as well make your body the same height as the `html` by using `min-height`.

In general, height tends to look _down the tree_ to determine its value, while width tends to look _up the tree_ to determine its value.

#### Why not use `100vh`?

I've used `min-height: 100vh` on projects before, but apparently it doesn't work as expected on mobile. When you scroll on a mobile device, the address bar and footer controls slide away, yielding their space to the content. This means that scrolling changes the viewport height.

To avoid flickering UI issues, browsers like iOS Safari and Chrome Android will set `vh` equal to the _maximum viewport height_, after scrolling, which means that when the page first loads and you haven't scrolled, `100vh` is actually taller than the viewable area. Using `min-height: 100%` produces a better experience.

## Margin Collapse (or Margin Overlap)

Think about it like "stay 6 feet away from eachother." If the requirement is just for us to stay 6 feet away from each other, we don't need to stay 12 feet away—our 6 feet of personal space can overlap!

Margin collapse is also the reason why if you give top margin to, say, an `h2` element inside of a parent element, it will move the entire parent element down, instead of just the heading.

### Rules of Margin Collapse

#### Only vertical (i.e., block-direction) margins collapse

The historical reason for this is that in the early days when margin collapse was implemented, HTML wasn't intended for layouts, but for documents.

When you change the writing mode to `writing-mode: vertical-lr`, though, it behaves as you would expect. Margins in the direction of the blocks collapse. This something I'll probably never have to worry about though.

#### Margins only collapse in Flow layout

They don't collapse inside a flexbox, for example.

#### Only adjacent elements collapse

So if you have a `br` between two paragraphs that have margins, the margins won't collapse.

#### The bigger margin wins

```css
p {
  margin-bottom: 16px;
}

p + p {
  margin-top: 8px;
}
```

In this scenario, there will be 16px between the paragraphs. This one feels intuitive if you think about it like personal space. The person that needs more personal space is the only one you care about.

#### Nesting doesn't prevent collapsing

```html
<style>
  p {
    margin-block: 48px;
  }
</style>

<div>
  <p>Paragraph One</p>
  <div>
    <p>Paragraph Two</p>
  </div>
</div>
```

The margins between the first and second paragraph **will still collapse**, even though the second paragraph is nested inside a div!

Most of us have a misconception about how margins work. **Margin is intended to increase the distance between siblings. It is _not_ meant to increase the gap between a child and its parent's bounding box. That's what padding is for.**

Margin will always try to increase the distance between siblings, **even if it means _transferring_ the margin to the parent element.**

This only happens when margins are _touching_, though. So you might have been able to successfully space a first child from its parent's bounding box, but _only if it wasn't touching another margin above it_.

##### Examples of nested margins that _don't_ collapse

###### Blocked by padding or border

```html
<style>
  p {
    margin-block: 48px;
  }

  div {
    padding-bottom: 16px;
  }
</style>

<div>
  <p>Paragraph One</p>
</div>
<p>Paragraph Two</p>
```

The bottom padding on the `div` makes it so that the margins between the two `p`s aren't touching. A border will have the same effect.

###### Blocked by a gap

```html
<style>
  p {
    margin-block: 48px;
  }

  div {
    height: 200px;
  }
</style>

<div>
  <p>Paragraph One</p>
</div>
<p>Paragraph Two</p>
```

The fixed height of the parent `div` creates a gap of dead space between the two paragraphs' margins, so the margins don't collapse.

#### Margins can collapse in the same direction

They don't have to be opposing margins between adjactent elements.

```html
<style>
  .parent {
    margin-top: 72px;
  }
  .child {
    margin-top: 24px;
  }
</style>
<div class="parent">
  <p class="child">Paragraph One</p>
</div>
```

This is an extension of the previous rule. The child's top margin will be swallowed up by the parent's top margin. \*\*This happens even with elements that have no margin. 0 margin combined with 32px margin will collapse to 32px, since 32 is bigger.

#### More than two margins can collapse

This occurs if you have collapsing margins between parents and children, _and_ between adjacent elements.

#### Negative margins collapse as well

When two elements have overlapping negative margins, the one with the most significant negative margin wins the battle.

When negative and positive margins overlap, the resulting margin is the sum (i.e., -24px + 24px = 0).

To "cancel out" a margin (maybe on a legacy component or something you can't control), you can just wrap it in a parent and apply a negative margin on the parent.

#### Multiple positive and negative margins

Here's what the algorithm looks like:

1. Find the largest positive margin
2. Find the largest negative margin (i.e., most significant negative margin)
3. Add the two numbers together

### Using Margin Effectively

Josh really likes the idea of "margin considered harmful," but the reality is that unless you're starting a brand new project and the entire team is onboard, you'll be stuck with margin.

> Margin is like putting glue on something before you've decided what to stick it to, or if it should be stuck to anything.
> --Heydon Pickering

The idea is that you shouldn't put margin on components, because you don't know how the component will be used (unless it really is a one-off component). Reusable components should be as unopinionated as possible. The solution: **layout components**. The idea is that _components aren't allowed to have an "external margin"_. Instead, components are grouped using layout components like `Stack` from Braid's design system.