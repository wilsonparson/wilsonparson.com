---
title: 'Module 3: Modern Component Architecture'
---

- For almost every component he creates using styled components, he usually calls the outermost element `Wrapper`.
- The `article` HTML element isn't just for blog our journal articles. It's for anything that could be independently shared or reused. Some examples:
  - Blog post
  - Forum post
  - Product card
  - User comment
  - Interactive widget or gadget
  - Any other independent item of content.
- For the contact card component we built, he used an `article` as the outermost element.

## Global styles

- It doesn't really matter where you put the global styles element. Regardless of where it's rendered, it will be injected into the head of your document.
- He uses CSS resets.
- It can be a little tedious to create a component for paragraphs and for headings when you could just apply global styles. Need to weigh trade offs.
- He uses lots of CSS variables.

## Dynamic styles (w/ styled-components)

Three ways:

1. Inline styles
2. Interpolation (official styled-components recommendation)
3. CSS Variables

Using CSS variables is an interesting approach that adds more transparency. It's not as flexible as interpolation, which isn't limited to interpolating values alone, but can interpolate anything between the backticks. Here's an example of using CSS variables:

```tsx
const Button = ({ color, onClick, children }) => {
  return (
    <Wrapper onClick={onClick} style={{ '--color': color }}>
      {children}
    </Wrapper>
  );
};
const Wrapper = styled.button`
  color: var(--color);
  padding: 16px 24px;
`;
```

With interpolation, if the resulting value is falsey, styled-components just doesn't set that property at all. For example, if `isCurrent` is `false` in the following example, `color` simply won't be set:

```tsx
const Wrapper = styled.button`
  color: ${(props) => props.isCurrent && 'deeppink'};
`;
```

## Global styles

The global styles will be applied to the app whenever a global style component is rendered. This means that you can apply global styles only when a particular component is rendered. The most common use case, though, is to just render it in the `App` component so that it's present all throughout the app.

## Component libraries

> A component library is a collection of generic, reusable components that can be dropped in to multiple applications. It's a way to ensure consistency between products, and it can help boost new development speed, since you have a suite of drop-in primitives and don't have to build everything from scratch.

The way he describes a component library matches what I feel Maui should be, but not what it currently is.

He's very skeptical about the idea that most front-end developers won't have to write CSS, because it will all be done by the design system engineer.

It can seem like using a pre-existing component library is a huge advantage if you're not a designer, but in reality all you're doing is using really good LEGO blocks without instructions, which results in a product without cohesion. The truth is, you have an advantage with starting from scratch because you can make things cohesive. That said, open-source component libraries can be good for things like prototyping or hackathons.

There _is_ a middle ground, though, like Reach UI or Radix UI. These component libraries only provide functionality, and no styles.

### Breadcrumbs

- `text-decoration: revert;` - Sets the text-decoration to whatever it would normally do, before you changed it.
- The breadcrumb example from WAI, they didn't add an actual slash between links, but a right border that was transformed.

### Buttons

You can use CSS variables passed in as inline styles, and then refer to them in your styled-components:

```tsx
const SIZES = {
  small: {
    '--font-size': '0.875rem',
  },
  medium: {
    '--font-size': '1rem',
  },
  large: {
    '--font-size': '1.125rem',
  },
};

const Button = ({ children, size }) => (
  <Wrapper style={SIZES[size]}>{children}</Wrapper>
);

const Wrapper = styled.button`
  font-size: var(--font-size);
`;
```

Another thing to remember is that since components are just functions, you can pass them around and assign them to variables, which makes it easy to return different JSX from a component based on logic:

```tsx
const Button = ({ children, variant }) => {
  let Component;
  if (variant === 'primary') {
    Component = PrimaryButton;
  } else if (variant === 'secondary') {
    Component = SecondaryButton;
  }

  return <Component>{children}</Component>;
};
```

You can use the polymorphic `as` prop with dynamic expressions:

```tsx
const Button = ({ href, children }) => {
  return <Wrapper as={href ? 'a' : 'button'}>{children}</Wrapper>;
};

const Wrapper = styled.button``;
```

### Escape hatches

If you want to be be able to compose your own component as a styled-component, all you need to do is add the `className` prop to your component, since styled-components relies on CSS classes for styling:

```tsx
// Vanilla React component
const MyButton = ({ children, className }) => (
  <button className={className}>{children}</button>
);

const MyStyledButton = styled(MyButton)`
  color: deeppink;
`;
```

This is a good escape hatch to build into the components of your component library, because it doesn't make it _impossible_ to craft your own styles, but there _is_ friction when you do it. It's great for one-off cases where you don't want to modify the core API of your component just for one use case.

## Single source of styles
