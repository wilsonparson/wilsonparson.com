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
