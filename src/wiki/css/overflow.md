---
title: Overflow
---

## Default overflow: `visible`

The content overflows out of the container, but it has **no effect on layout**.

## Scroll

On a Mac, it doesn't show the scrollbars (horizontal or vertical), but for Windows and Linux, it _does_. Luckily Mac has a setting that lets you "Always show" scrollbars, so that the experience is consistent among operating systems. Developers should turn on this setting so they don't unknowingly create weird experiences for Windows and Linux users. It'll make your experience on your computer less than ideal, but it's a good sacrifice that will make you better at your job.

## Auto

Recommended for most situations when you want an element to be scrollable. It adds a scrollbar when one is required.

There are tradeoffs, though. If you _know_ your content will always need a scrollbar, you can avoid a layout shift when `auto` adds the scrollbar by using `scroll`. Content is shifted about 15px when a scrollbar is added.

## Hidden

- Good for truncating text w/ ellipsis.
- You can also use it for artistic purposes (e.g., a portion of a circle that is only partially showing).
- Every time you use `hidden`, do yourself a favor and leave a comment to explain why.

## Scroll containers (gotcha)

When we set either `overflow-x` or `overflow-y` on an element, it turns that element into a "scroll container," which is a scrollable box. Children of a scroll container are locked inside that box; they can't ever spill outside of it. In other words, **you can't set `overflow-x: hidden` and `overflow-y: visible`**, and expect the contents to overflow out the bottom of the container. It will add a scrollbar. **There's no such thing as a scroll container that only scross in one axis**.

When we set `overflow: hidden`, we're actually just **removing the scrollbars**.

## Horizontal overflow

If you want inline/inline-block elements to not line wrap, so that you can use horizontal scrolling, you need to do `white-space: nowrap`.

CSSWG has called the spelling `nowrap` a mistake (should be `no-wrap`), but you can remember that it's one word by thinking of the word `nonsense`.

## Positioned layout

Generally the concept of overflow is mostly concerned with Flow layout, or something like Flexbox/Grid.

Overflow generally works the same for positioned layout, **as long as the overflow is set on the containing block**.

In order for a child to trigger the overflow, it needs to be contained by it. So `fixed` children, for example, won't trigger the overflow if their parent element has overflow set, because `fixed` elements' containing block is the viewport.
