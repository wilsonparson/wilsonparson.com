---
title: React
eleventyNavigation:
  key: React
---

## React Tutorial

I've felt a sudden desire to build a really strong foundation in React, so I'm going back to the fundamentals and going through the official React tutorial on reactjs.org. Below are some notes from my learnings.

### Don't prematurely lift state

A pattern I've noticed with the tutorial is that it first instructs you to maintain each square's state individually and then has you refactor the code and lift state later. In fact, they say that "lifting state into a parent component is common when React components are refactored." I have a tendency to get ahead of myself and start lifting state before I've even built anything, which makes things really confusing. I'm going to try to keep state as local as possible when building, even if I have a suspicion I'll have to lift it later.

> In React, it’s conventional to use `on[Event]` names for props which represent events and `handle[Event]` for the methods which handle the events.

The tutorial also has you lift state when you add time travel at the end. So it _does_ seem like you often end up lifting state when you add a new feature, which is why it's hard to know exactly how high the final state will be when you're first starting to build the components. It's easier to start with state as low as possible and move up from there when you have to.

### Another angle on controlled components

I had always associated the concept of "controlled components" with form elements only, but in the tutorial they refer to the `<Square />` components as "controlled components" once we lifted state out of them and passed click handlers down to them. They are "controlled components" because the parent `<Board />` component has complete control over them. It tells them what to render, and also what to do when they're clicked.

### Why immutability in state

React uses `Object.is` to compare state when deciding whether to re-render. If you just mutate a value on the state object, `Object.is` will determine that the state is the same, and will tell React that it doesn't need to re-render. If you want React to re-render properly, you have to make sure the updated state references a **completely different object**.

### Not everything needs to be "State"

I have noticed that in the official tutorial there are a lot of places where I would have thought to store some derived value as state, but they just calculate it in the `render()` method. Which is an important principle: anything values can be calculated from other state shouldn't be stored as state, but should be calculated during render.

### Stupid is sometimes simplest

I like how they stick to simple syntax in the tutorial. There are spots where I would have reached for fancier things like string interpolation with backticks, but they just concatenate, and it turns out to be more readable in these particular cases. Another example is using long-form conditionals instead of ternaries:

```javascript
// this
let status;
if (winner) {
  status = 'Winner: ' + winner;
} else {
  status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
}

// instead of this
const status = winner
  ? `Winner: ${winner}`
  : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
```

### TypeScript is awesome, but really slows down tinkering

After using TypeScript for a React-based prototype at work, using plain JavaScript for this tutorial is a breath of fresh air. I've become aware of how much time I've spent updating props interfaces and return value interfaces. There _is_ a point, however, when suddenly having TypeScript is a huge help and boon to my development experience, and I think it's early than most people think. But the flexibility that JS adds is really nice for quick stuff like this.

Some ways I could still use TypeScript but not slow myself down:

- Don't use props interfaces at first
- Don't use return types at first
- Use `unknown` or `any` liberally why playing around

### Don't put components in separate files (at first)

It's really helpful to just keep the components all in the same file at first, before refactoring. I'm realizing that I've wasted a lot of time updating imports when I could have just worked in a single file until it became unwieldy.

### Consider storing JSX in separate variables rather than inlining them

They show an example where they map the move history to an ordered list of buttons. They could have inlined it, but they stored the whole expression in a variable called `moves` and then just used `<ol>{moves}</ol>`. There's always pros and cons, but keeping it in a separate variable makes the markup a little cleaner. Also, they do all this inside the `render()` method. They could have made this a separate `MovesList` component or something, but they just stored it as a JSX expression.

### Where to resume...

- [ ] I technically finished the whole tutorial, but I'm tired so I sort of just copied the changes they made through this final section: https://reactjs.org/tutorial/tutorial.html#implementing-time-travel. I need to go back and read through each change and make sure I understand the logic behind the changes. This has turned out to be not just a tutorial on React, but an insightful, eye-opening view into how other people go about solving problems using JavaScript and React. They use a lot of strategies I wouldn't have thought of very easily by myself!

- [ ] Also I want to put in the effort to make the additional changes they recommend for further practice. 💪

- [ ] Finally, I want to rewrite the whole thing to use hooks.
