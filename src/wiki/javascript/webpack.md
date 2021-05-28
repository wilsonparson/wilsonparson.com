---
title: Webpack
eleventyNavigation:
  key: Webpack
---

## Webpack Module Federation

- _Local modules_ - part of the current build
- _Remote modules_ - loaded from a container at runtime
- _Chunk loading_ - an import statement that actually downloads a chunk of JavaScript code at runtime
- _Container_ - Not Docker. It's an entry you make in the webpack config which exposes asynchronous access to specific modules.
- _Overrides_ - The app consuming the container can override modules within the container with its own, local, modules. This only works for modules that the container has declared as overridable. (I wonder if this is how you do local development. Maybe you just override the container's modules with your local modules when you're working in isolation, and then your production config wouldn't override the container's modules, but would use them instead.) Overriding is a one-way operation: the consumer has the control.

Versioning

Required versions are inferred, unless you turn the setting off. I believe this means it will help us keep up to date on our versioning.
