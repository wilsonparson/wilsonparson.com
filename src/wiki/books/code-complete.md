---
title: Code Complete
author: Steve McConnell
eleventyNavigation:
  key: Code Complete
---

## 5.3 Design Building Blocks: Heuristics

### Steps in designing objects (p. 87)

- Identify the objects and their attributes (methods and data).
- Determine what can be done to each object.
- Determine what can each object is allowed to do to other objects.
- Determine the parts of each object that will be visible to other objects—which parts will be public and which will be private.
- Define each object's public interface

> Abstraction is the ability to engage with a concept while safely ignoring some of its details—handling different details at different levels (p. 89).

> Encapsulation helps to manage complexity by forbidding you to look at the complexity (p. 90).

### Hide Secrets (Information Hiding)

Two reasons to hide information (p. 94):

1. Hiding **complexity** so that your brain doesn't have to deal with it unless you're specifically concerned with it.
2. Hiding **sources of change** so that when change occurs, the effects are localized.

> Minor changes to a system might affect several routines within a class, but they should not ripple beyond the class interface (p. 93).

> The interface to a class should reveal as little as possible about its inner workings (p. 94).

> Hiding a design decision makes a huge difference in the amount of code affected by a change (p. 95).

> While the road to programming hell is paved with global variables, class data presents far fewer risks (p. 95).

> Get into the habit of asking, "What should I hide?" You'll be surprised at how many difficult design issues dissolve before your eyes (p. 97).

### Identify Areas Likely to Change

Two areas likely to change that stood out to me (because of what I'm currently working on):

1. Business rules - try to keep them all contained and in the same place, rather than strewn througout your code.
2. Status variables - Use enums instead of booleans, and use getters rather than accessing the status variables directly.

### Keep Coupling Loose

#### Types of Coupling (best to worst) (p. 101-102)

- **Simple-data-parameter coupling** - simple data types passed as parameters. Normal and acceptable.
- **Simple-object coupling** - When a class or method instantiates another class. Fine.
- **Object-parameter coupling** - _Object1_ requires _Object2_ to pass it an _Object3_. Tighter than primitive data types, because it requires _Object2_ to know about _Object3_.
- **Semantic coupling** - When a class or method has some semantic knowledge of the inner workings of another class or method. Most "insidious" kind of coupling.
  - _Module1_ passes a control flag to _Module2_. This requires _Module1_ to make assumptions about what _Module2_ will do with the control flag.
  - _Module1_ expects global data to have been changed by _Module2_.

### Look for Common Design Patterns

If you stick to common design patterns, you can speak the same language as other engineers you're working with. Thinking in design patterns allows you to work from a list of constraints for solutions to your problem, rather than designing something completely from scratch. Finally, design patterns allow you to speak at a more abstract level about the architecture.

Nearly all the patterns he lists on p. 104 are unrecognizable to me 😳

### Guidelines for Using Heuristics

If you feel like you're getting stuck designing something, try a completely different approach:

- Write about it, instead of diagramming
- Try a brute force approach
- Take a walk
- Sketch with a pencil and let your brain follow

## 5.4 Design Practices

### Iterate

- When you finish a first attempt, don't stop! Your second attempt will always be better.
- There is an inherent balance between looking at the problem from the top (i.e., big picture, high-level considerations) and looking at the problem from the bottom (i.e., low-level details). Try to switch back and forth between the two, as each perspective strengthens the other and results in a more robust design.
- Don't feel guilty about iterating a ton, and having a bunch of artifacts that you end up throwing away.

### Top-down & Bottom-up Approaches

Top-down (decomposition) is generally easier for our brains, because we're naturally good at taking one large problem and breaking it down into smaller, manageable problems. Bottom-up (composition) is helpful because it helps you identify utility functionality and reuse code early. But it's pretty difficult (and not recommended by the authors) to solely rely on bottom-up composition. They aren't competing approaches, and you can switch back and forth between the two when needed.

#### When do you stop decomposing?

Just keep going until you become slightly irritated at how simple it is, and you realize that it would be easier to write the actual code than to decompose the design of the system one level deeper.

### Experimental Prototyping

Helps to combat the "wickedness" of design (the fact that you sometimes have to actually build something in order to design it).

> Writing the absolute minimum amount of throwaway code that's needed to answer a specific design question.

#### Pitfalls of Prototyping

- When you're not disciplined about writing the absolute _minimum_ amount of code
- When you don't treat the code as throwaway code.
  - One way to avoid this problem is to use a _different technology_ in the prototype than will be used in production. For example, mock up the UI with Powerpoint or some prototyping tool, rather than prototyping directly in the code. Or use an environment that is inherently ephemeral, like Code Sandbox.

### Collaborative Design

> Perfectionism loves isolation. It would prefer you go it alone, convincing you that relying on others is cheating.
>
> - _Finish: Give Yourself the Gift of Done_, by Jon Acuff

> Most of the worst decisions you've ever made were made alone.
>
> - _Finish: Give Yourself the Gift of Done_, by Jon Acuff

### How Much Design is Enough?

This depends on the team and the project. If the team is really experienced and familiar with the application area, you probably don't need to go into as much detail.

The author errs on the side of doing _too much_ design, because most of the design problems he has observed arose from stopping design too early. Another thought is that I read somewhere that the vast majority of bugs are do to missing or unclear requirements, rather than typos or incorrect code.

## 5.5 Comments on Popular Methodologies

Apparently the pendulum swings back and forth between it being on vogue to do design up front, or to do no design at all. The author advocates for doing "Enough Design Up Front." The extremes&mdash;designing every detail up front or doing no design at all&mdash;are not the way to go.

> The more dogmatic you are about applying a design method, the fewer real-life problems you are going to solve.
> &mdash;Plauger 1993

I think the quote above also applies to being dogmatic about how exactly your code should be written. Try to see the forest through the trees.

## 6.1 Class Foundations: Abstract Data Types (ADTs)

**Abstract Data Type** - a collection of data and operations that work on that data.

- Abstract data types help you "tap into the power of being able to work in the problem domain rather than at the low-level implementation domain" (p. 126).
- Increases flexibility
- Allows you to more easily change things in the future.
- Can even use ADTs for very simple things.
