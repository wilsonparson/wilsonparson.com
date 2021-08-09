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

---

## Part III: Design Principles

- SOLID applies to all code, not just OO code.
- Every software system allows grouping of data and functions, even if they aren't specifically called classes.
- These principles are for mid-level software; they're for programmers working at the module level.
- The next level up is apparently called "components."
- I didn't realize it was Uncle Bob himself that coined the SOLID acronym.
- He doesn't cover them in detail here, but he does in _Agile Software Development, Principles, Patterns, and Practices_.

## Ch. 7: SRP: The Single Responsibility Principle

Least well understood principle. **Not** "every module should do just one thing" (although there _is_ a principle like that). The main thing to keep in mind here is that it's literally about avoiding having two devs work in the same file to fulfill requests for different actors.

Historical description: "A module should have one, and only one, reason to change." The "reason to change" is users and stakeholders. So, worded another way: "A module should be responsible to one, and only one, user or stakeholder."

But there will likely be more than one actual stakeholder or user that wants the system changed in the same way. So we can use the word "actor" to refer to a group of users or stakeholders, resulting in the final version:

> A module should be responsible to one, and only one, actor.

Module = a source file.

Easier to understand principle if you look at symptoms of violating it.

### Symptom 1: Accidental Duplication

```typescript
class Employee {
  calculatePay() {}
  
  reportHours() {}
  
  save() {}
}
```

- `calculatePay` is responsible to accounting/CFO.
- `reportHours` is responsible to HR/COO.
- `save` is responsible to DBAs/CTO.

Putting these methods in the same class couples the three actors, so that the actions of one team could affect another. If the methods rely on shared functionality, then a request from one actor might require a change to the shared functionality, which will break the experience for another actor without them even knowing about the change.

**Separate the code that different actors depend on.**

### Symptom 2: Merges

Different actors could request changes to the same source file for different reasons, resulting in a merge conflict between teams.

### Solutions

```typescript
class PayCalculator {
  calculatePay(employeeData) {}
}

class HourReporter {
  reportHours(employeeData) {}
}

class EmployeeSaver {
  save(employeeData) {}
}

// If you don't want to instantiate and keep track of a bunch of separate classes,
// you can reunify them via a facade.
class EmployeeFacade() {
  save(employeeData) {
    employeeSaver.save();
  }
  // etc.
}
```

### Additional Notes

This works well in Node.js, since each file is actually called a module. Basically, make sure that each module is only responsible to one actor, and one actor only.

## Ch. 8: OCP: The Open-Closed Principle

> A software artifact should be open for extension but closed for modification.

- You should be able to change an artifact's behavior without changing it directly. This is the most fundamental reason that we study software architecture.
- The OCP guides us in designing classes and modules, but also at a higher level of components.
- A good software architecture would reduce the amount of changed code when a feature is added. Ideally, you should only have to add new code, and change zero code.

### Example: Financial Reporting Software

(See diagram on p. 72)

- **Interactor** - Gets data via `FinancialDataGateway` interface. Uses financial entities to generate the financial report. All dependencies flow to it. Receives financial report requests from **Controller** and returns responses. We protect the Interactor from all changes **because it contains the business rules, the highest level polices, the central concern.**
- **Controller** - Sends requests for financial reports to **Interactor**. Uses `FinancialReportPresenter` interface to pass the generated report to a presenter.
- **Presenter** - Implements `FinancialReportPresenter` interface. In this case we have two concrete presenters which fulfill that interface: `ScreenPresenter` and `PrintPresenter`. Each concrete presenter uses its own view model, and passes it to the view via an interface.
- **View** - Implements an interface that the presenter refers to. Builds the view.

All component dependency relationships are unidirectional. The dependency arrows point towards the components we want to protect from change.

"If component A should be protected from changes in component B, then component B should depend on component A."

"Architects separate functionality based on how, why, and when it changes, and then organize that separated functionality into a hierarchy of components. Higher-level components in that hierarchy are protected from the changes made to lower-level components."

In other words, the key to architecture is optimizing for change.

### Transitive Dependencies

Transitive dependencies are a violation of the general principle that software entities should not depend on things they don't directly use.

## Ch. 9: LSP: The Liskov Substitution Principle

- If we substitute a superclass object reference with an object of any of its subclasses, the program should not break.
- You should be able to substitute subtypes for base types.
- **The Square/Rectangle Problem** - The calling code needs to contain an if statement checking whether the rectangle is actually a square, so it violates the LSP.
- Originally thought of as a guide for the use of inheritance. But now it has grown to be used more broadly from and architectural standpoint. The main idea is that users depend on well-defined interfaces, and you should be able to substitute the implementation of those interfaces without breaking anything.
- Basically, any time you need to add a special conditional that does something differently given a certain type, that's probably a sign that the LSP has been violated.

## Ch. 10: ISP: The Interface Segregation Principle

If class A only calls one method of class B, but it references a concrete instance of class B, then class A will need to be recompiled every time a change is made to any methods on class B—even methods that class A doesn't call. But if you have class B implement an interface that class A uses, you only need to recompile class A if you change the interface. Better yet, if you separate out interfaces (instead of just one huge interface for class A), then there's an even smaller chance that B will need to recompile.

### Examples

In this scenario below, every time I make a change to `Ops.op3`, I need to recompile `User1`, `User2`, and `User3`:

```typescript
class Ops {
  op1() {}
  op2() {}
  op3() {}
}

class User1 {
  constructor(private ops: Ops) {}
  
  exec() {
    this.ops.op1();
  }
}

class User2 {
  constructor(private ops: Ops) {}
  
  exec() {
    this.ops.op2();
  }
}

class User3 {
  constructor(private ops: Ops) {}
  
  exec() {
    this.ops.op3();
  }
}
```

The interface segregation principle tells me to use separate interfaces, so that `User1` doesn't need to depend on `Ops.op3` if it doesn't call it:

```typescript
interface Op1 {
  op1(): void;
}

interface Op2 {
  op2(): void;
}

interface Op3 {
  op3(): void;
}

class Ops implements Op1, Op2, Op3 {
  op1() {}
  op2() {}
  op3() {}
}

class User1 {
  constructor(private ops: Op1) {}
  
  exec() {
    this.ops.op1();
  }
}

class User2 {
  constructor(private ops: Op2) {}
  
  exec() {
    this.ops.op2();
  }
}

class User3 {
  constructor(private ops: Op3) {}
  
  exec() {
    this.ops.op3();
  }
}
```

This business of forcing recompiling is not an issue in JavaScript, Ruby, and Python, because they are dynamically typed. This allows them to be more loosely coupled than statically typed languages. So why care about this rule?

There's a theme here that touches on architecture, not just code compilation. The theme is that **in general, it is harmful to depend on modules that contain more than you need**.

## Ch. 11: DIP: The Dependency Inversion Principle