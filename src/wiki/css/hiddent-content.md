---
title: Hidden Content
---

## display: none

- Effectively removed from the DOM.
- Cannot be clicked or focused.

**Should I manage it on React (render/don't render the element) or with CSS?**

- It it's dependent on screen width (i.e., media query), absolutely do it with CSS and not React. You _could_ do it with JS, but it doesn't work well with server-side rendering.
- If you have many many items and only need to render one, it might make sense to do it with JS so all the hidden elements are truly gone and don't hog memory.
- If you need to animate an element right after it renders, it's probably better to use CSS.

## visibility: hidden

- Still corporeal, just invisible. Like a cloak of invisibility.
- Not as commonly used, because you don't want a hole in your UI.
- Can be useful if you want an invisible child to control its parent's layout.
- Weird: Can be selectively undone by children. You can hide a parent element and the show the child while the parent is hidden.

## Opacity

- Elements with 0 opacity are still interactive.
- Helpful when an element's visibility needs to be animated (e.g., fade).


## Visually hidden

He used an approach with `clip` and negative margins to visually hide children for accessibility, similar to Bootstrap's `.sr-only` class. Apparently it's more reliable than aria attributes, which certain screen readers sometimes don't read.