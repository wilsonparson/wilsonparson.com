---
title: GraphQL
---

## Barebones Working GraphQL Setup

```javascript
// index.js

import express from 'express';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => "Hi, I'm Wilson." };

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(8080, () => {
  console.log('Running on server post localhost:8080/graphql');
});
```

If you run this and go to `localhost:8080/graphql`, it should pull up the GraphiQL interface. There you can check the **Docs** in the right panel to see your schema, and to make a query you can use:

```
query {
  hello
}
```

## Schemas

When you create an operation in GraphQL you need to do two parts:

1. Create the schema
2. Create the resolver

- **Schema** - defines the type of the data you expect to receive
- **Resolver** - does the work of actually getting the data
- You use the `buildSchema` export from `graphql`.

In your schema you'll generally have a bunch of different types, and then you'll have a `Query` type, which will reference those types as you define the shape of how a consumer can query:

```javascript
const schema = buildSchema(`
  type Friend {
    id: ID
    firstName: String
    lastName: String
    gender: String
  }

  type Query {
    friend: Friend
  }

  type Mutation {
    createFrind(input: FriendInput): Friend
  }
`);
```

## Object types & fields

- `!` suffix means required

## Mutations

- Mutations are GraphQL's term for updating data
- There is an `input` type

```javascript
const schema = buildSchema(`
  type Friend {
    id: ID
    firstName: String
    lastName: String
    gender: String
    email: String
  }

  type Query {
    friend: Friend
  }

  input FriendInput {
    firstName: String
    lastName: String
    gender: String
    email: String
  }

  type Mutation {
    createFriend(input: FriendInput): Friend
  }
`);
```

## Resolvers

Resolvers are functions that respond to queries and mutations. Generally people keep them in a different file than the schemas.

## Scalar types

The basic built-in types in GraphQL. `ID` is a built-in scalar type.

- `ID`
- `String`
- `Int`
- `Boolean`
- `Float`
- `ISO8601DateTime`
- `ISO8601Date`
- `JSON`
- `BigInt`

## Enum Types

Lets you restrict inputs or query options to a specific list of values.

```
enum Gender {
  male
  female
  other
}
```

A really low-effort way of restricting input.

## You have to specify fields in queries

One thing that I keep forgetting is that when you query for an object or an array in GraphQL, it doesn't default to returning all the keys of the object(s) you're asking for. You _have_ to define exactly which fields you want on the objects or the query will fail.

This will not work if `friend` is an object:

```
query {
  friend
}
```

You have to specify exactly which fields you want:

```
query {
  friend {
    id
  }
}
```

Also, when you return something from a mutation, it will require the consumer to define what they want returned, or else the mutation will error out.

This won't work:

```
mutation {
  createFriend(input: {
    firstName: "Wilson",
    lastName: "Parson",
    gender: male,
    email: "wilson.parson@gmail.com",
  })
}
```

You have to define which fields you want returned from the mutation:

```
mutation {
  createFriend(input: {
    firstName: "Wilson",
    lastName: "Parson",
    gender: male,
    email: "wilson.parson@gmail.com",
  }) {
    firstName,
    lastName
  }
}
```

## Using GraphQL Tools

The approach we've taken so far with defining our schemas as strings is a simple approach, but doesn't have a lot of tooling capabilities in IDEs.

Now we're going to install `graphql-tools`.

Instead of `buildSchema` you'll use `makeExecutableSchema` from `graphql-tools`.
