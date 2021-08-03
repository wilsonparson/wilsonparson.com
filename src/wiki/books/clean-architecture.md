---
title: Clean Architecture
eleventyNavigation:
  key: Clean Architecture
---

## Foreword

- Physical architecture must account for gravity; software architecture doesn't.
- "If you think good architecture is expensive, try bad architecture."
- "Architecture is the decisions that you wish you could get right early in a project, but that you were not necessarily more likely to get them right than any other."
- Good architecture "recognizes the softness of software and Ames to preserve it as a first-class property of the system."

## Preface

- The rules of software architecture are the same no matter the situation. They are independent of every other variable.
- The rules of software architecture haven't changed despite our computers being 10^22 times more powerful than they were when he started writing code in the 60s. And it's made of the same stuff: `if` statements, assignments, and `while` loops.

## Introduction

- It's not that hard to write code that works. But it's extremely hard to get software _right_. It requires a level of dedication and discipline that most programmers never dreamed they'd need. (So most probably don't ever get there.) It also requires a passion for the craft and a desire to be a professional.
- When you get software right, something magical happens: you don't need tons of programmers to maintain it.

## Ch 1: What is Design and Architecture?

- No difference between the two.
- "The goal of software architecture is to minimize the human resources required to build and maintain the system."
- If the effort to maintain a system grows with each new release, then it's a bad design. If it stays the same and is generally low, then it's a good design.
- "We can clean it up later; we just have to get to market first!" But things never get cleaned up later, because market pressures never abate.
- As the messy code base builds, productivity progresses asymptotically to a halt.
- Making messes is always slower than staying clean, even in the short term.
- "The only way to go fast, is to go well."

### Behavior vs. Architecture

There are two values that software provides to stakeholders: (1) behavior, and (2) architecture. Behavior is the obvious one: that the software fulfills the functional requirements. Architecture is more often neglected. It is building the system in a way that keeps software soft, meaning it's easy to change. "The difficultly in making such a change should be proportional only to the scope of the change, and not to the _shape_ of the change."

It's more important to have a program that doesn't work but that can change, than to have one that works but which is impossible to change. The reason is that if you can change the one that doesn't work, you can make it work. But if you can't change it at all, then it won't work to adapt to new requirements.

Business managers are not equipped to understand the importance of architecture. It's harder for them to see how poor architecture starts to slow you down. That's what software developers were hired to do. So it's up to the developer to assert the importance of architecture over the urgency of features. You have to see the long game and understand that all things considered, you will produce more with a better architecture. It's similar to getting out of the mindset of "we don't have enough time to test."

It's always a struggle between the development team fighting for what they think is best for the company, versus management doing the same thing, and marketing, and sales, etc.

Good developers unabashedly squabble with other stakeholders as equals over architecture. If architecture comes last, the system will become costlier and costlier to develop.

## Ch. 5: Object-Oriented Programming

### Encapsulation?

- We actually had perfect encapsulation with C. You declared data structures and functions in header files and then implemented them in implementation files.
- C++ actually _broke_ encapsulation because the compiler requires that you declare all member variables (private and public) in your header file.
- Public, private, and protected keywords are a hack that allows you to encapsulate members but still expose them to the compiler.
- Java and C# stopped using header/implementation altogether, weakening encapsulation even more.

### Inheritance?

- Inheritance: redeclaring a group of variables and functions in an enclosing scope.
- C programmers could do this manually long before there was an OO language.

### Polymorphism?

- Polymorphism: using pointers to point to functions.
- It was possible in C, but much more dangerous.
- Allows programs to work interchangeably with different I/O devices. I/O devices are now plugins to our program.

### Dependency Inversion

- In the status quo, the flow of dependency matches the control flow of the program itself.
- Polymorphism allows for dependency inversion.
- You can invert dependencies by inserting an interface between the calling and receiving code.
- That's the true power of OOP.
- "OO is the ability, through the use of polymorphism, to gain absolute control over every source code dependency in the system."
- OO allows us to use plugin architecture, where the different drivers and frameworks can plug into our business rules.

## Ch. 6: Functional Programming

- Variables do not change.
- All race conditions, deadlock conditions, and concurrent update problems are due to mutable variables.
- The more memory we have, and the faster our machines are, the less we need mutable state.

### Event Sourcing

- A strategy where you store the transactions, but not the state. When the state is needed, you just apply all the transactions.
- An example would be a bank account that doesn't store the mutable balance, but when the balance is required, it takes the sum of all the transactions that have ever occurred.
- This is how Git works.