---
title: Promises
eleventyNavigation:
  key: Promises
---

## Calling `.then()` on a Promise that has already resolved

Since promises have state, the promise will immediately call the function passed to `.then`.

See [stack overflow question](https://stackoverflow.com/questions/32059531/what-happens-if-a-promise-completes-before-then-is-called#:~:text=A%20promise%20has%20state%2C%20which,fulfilled%20after%20they%20were%20attached.)
