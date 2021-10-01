---
title: CSS
---

## `::before` and `::after`

They're just spans that are placed as the first/last child of the element in which they're declared. When you don't include content, the spans aren't rendered.

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
