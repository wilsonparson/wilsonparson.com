---
title: Sticky Positioning
---

The idea is that as you scroll, an element can "stick" to the edge of the viewport. At that moment, it transitions from being relatively-positioned to fixed-positioned.

You have to specify at least one edge to stick to (`top` | `left` | `right` | `bottom`), or it won't work.

## Stays in their box

Sticky elements only stick while their container is in view. They will never follow the scroll outside of their parent's container. They remain contained by their parent.

## Offset

The value you provide for `top`, etc. controls the **minimum gap between the element and the edge of the viewport** while the container is in frame.

## Not incorporeal

Sticky elements are like relative or static elements: they are corporeal and take up space in flow.

## Horizontal stickiness

Sticky positioning works with horizontal scrolling as well.

## Browser support

- Supported in all major browsers!
- No more weird bugs with iOS Safari!
- Works with tables in all major browsers now too!

---

## Notes from Exercises

- You can add a feeling of "cushion" to your sticky header, if you have some extra padding in the header and then use a negative value for `top`, so that part of the header is off the viewport when sticky positioning kicks in.
- Again, **a sticky element can never leave the containing block of its parent.**

## Troubleshooting

- If you set `overflow` to anything on the parent of a sticky element, the sticky element now sticks in _that_ scroll container's context, not the viewport's context. So it won't work as you're expecting. **Sticky elements either stick to the main viewport scroll, on to an ancestor that manages overflow.**
- Make sure that your sticky element has room to move within its parent container. If the parent is too small, position sticky won't do anything.
- The sticky element might be stretched because of Flexbox or Grid, which would make it so it can't move in its parent container.
- Sometimes there might be a thin 1px gap between the element and the edge of the viewport in Chrome. Just give it `top: -1px` instead of `top: 0` to resolve it.
