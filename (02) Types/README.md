# Types

### Object Types

```ts


// GOOD but BETTER to let TS infers the values

const person4: {
  name: string;
  age: number;
} = {
  name: 'Max',
  age: 30,
};

console.log(person4);
```

Let's say you have this JavaScript object:

```js
const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!',
  },
};
```

This would be the type of such an object:

```ts
{
  id: string;
  price: number;
  tags: string[ ];
  details: {
    title: string;
    description: string;
  }
}
```

---

### Array Types

```ts
let favoriteActivities: string[];
favoriteActivities = 'Sports'; // Type '"Sports"' is not assignable to type 'string[]'
favoriteActivities = ['Sports']; // OK
favoriteActivities = ['Sports', 1]; // Type 'number' is not assignable to type 'string'.
// any[] could be a solution - but you lose all the benefits of TS
```

```ts
const person = {
  name: 'Max',
  age: 30,
  hobbies: ['Sports', 'Cooking'], // (property) hobbies: string[]
};

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase()); // detect it is a string
  console.log(hobby.map()); // Property 'map' does not exist on type 'string'.
}
```

---

### Working with Tuples

Tuples are added by TypeScript = **fixed length array** (AND fixed type).

```ts
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // we need to overwrite the TS inference and a tuple is perfect here
} = {
  name: 'Max',
  age: 30,
  hobbies: ['Sports', 'Cooking'], // (property) hobbies: string[]
  role: [2, 'author'], // (property) role: (string | number)[]
};

// We want for role only 2 values, the type: number and the type: string

person.role.push('admin'); // Shouldn't be allowed
person.role[1] = 10; // // Shouldn't be allowed
```

---

### Working with Enums

Enums are added by TypeScript. Automatically **enumerated global constant identifiers**.

```ts
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

/**
 * // COMPILE version (JS)
 *
 * (function (Role) {
 *  Role[Role["ADMIN"] = 0] = "ADMIN";
 *  Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
 *  Role[Role["AUTHOR"] = 2] = "AUTHOR";
 * })(Role || (Role = {}));
 *
 */

const person = {
  name: 'Max',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN,
};

const isPersonAdmin = person.role === Role.ADMIN;
console.log('is person admin: ', isPersonAdmin);
```

```ts
enum Role {
  ADMIN = 6, // 6
  READ_ONLY, // 7
  AUTHOR, // 8
}
```


```ts
enum Role {
  ADMIN = 'ADMIN',
  READ_ONLY = 100,
  AUTHOR = 'AUTHOR',
}
```



### Union Types

```ts
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

```

---

### Literal Types

```ts
function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-text', // literal type
) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return resultConversion === 'as-number' ? +result : result.toString();
}

const combinedAges = combine(30, 26, 'as-numbe'); // Argument of type '"as-numbe"' is not assignable to parameter of type '"as-number" | "as-text"'.
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);
```

---

### Type Aliases & Object Types

```ts
type Whatever = number; // it works but we should avoid it
type Combinable = number | string; // a new type we're creating based on a union type
type ConversionDescriptor = 'as-number' | 'as-text'; // a new type we're creating based on a literal type

function combine(
  input1: Whatever | string,
  input2: Combinable,
  resultConversion: ConversionDescriptor,
) {
  let result;
  // ...
}
```

Type aliases can be used to **"create" your own types**. You're not limited to storing union types though - you can also provide an alias to a (possibly complex) object type. For examples:

```ts
type User = { name: string; age: number };
const u1: User = { name: 'Max', age: 30 }; // this works!
```

This allows you to **avoid unnecessary repetition** and manage types centrally.

For example, you can simplify this code:

```ts
function greet(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}
```

To:

```ts
type User = { name: string; age: number };

function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```


### Function Return Types & "void"

```ts
// function add(n1: number, n2: number): number
function add(n1: number, n2: number) {
  return n1 + n2;
}
```

```ts
function add(n1: number, n2: number): number {
  return n1 + n2;
}
```

`void` type = doesn't return anything

```ts
function add(n1: number, n2: number) {
  return n1 + n2;
}

// function printResult(num: number): void
function printResult(num: number) {
  console.log('Result: ' + num);
}

printResult(add(5, 12));
```

`undefined` is a valid type in TS (but it is not really useful here)

```ts
let someValue: undefined;
```

---

### Functions as Types

```ts
// it is valid but combineValues is any and we want to avoid it
let combineValues;
combineValues = add;
combineValues(5, 12);
```

```ts
let combineValues: Function;
combineValues = add;
combineValues(5, 12);
```

```ts
let combineValues: (a: number, b: number) => number;
combineValues = add; // OK
combineValues = printResult; // KO
// (1) Type '(num: number) => void' is not assignable to type '(a: number, b: number) => number'.
// (2) Type 'void' is not assignable to type 'number'.
combineValues(5, 12);
```

---

### Function Types & Callbacks

```ts
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(1, 3, (result) => {
  console.log(result);
});
```

---

### QUIZZ

#### Functions & Types

##### 1. Will this code compile?

```ts
function sendRequest(data: string, cb: (response: any) => void) {
  // ... sending a request with "data"
  return cb({ data: 'Hi there!' });
}

sendRequest('Send this!', (response) => {
  console.log(response);
  return true;
});
```

> Yes. Callback functions can return something, even if the argument on which they're passed does NOT expect a returned value.

##### 2. What's the idea behind a "function type"?

> Function types define the parameters and return type of  function.

##### 3. Which code snippet is better (i.e. which code should you write)?

a)

```ts
function sayHi(): void {
  // ...
}
```

b)

```ts
function sayHi(): undefined {
  // ...
}
```

> The answer is a because it doesn't force you to return anything if you don't want to return something

---

### The "unknown" Type

```ts
let userInput: unknown;
let userName: string;

userInput = 5; // OK
userInput = 'Max'; // OK
userName = userInput; // KO – Type 'unknown' is not assignable to type 'string'.
```

Make it work:

```ts
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
  userName = userInput;
}
```

≠ with `any`:

```ts
let userInput: any; // disable all type checking
let userName: string;

userInput = 5; // OK
userInput = 'Max'; // OK
userName = userInput; // OK
```

Using `unknow` is better than `any` because it keep an extra check / some type checking.

---

### The "never" Type

```ts
// Utility function which build error function
function generateError(message: string, code: number): never {
  throw { message, errorCode: code };
}

generateError('An error occured', 500);
```

This function above will never return any value. Only throw an error.
