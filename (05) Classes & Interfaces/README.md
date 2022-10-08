# Classes

---

### Shorthand Initialization

```ts
class Department {
    private id: string;
    private name: string;
    private employees: string[] = [];

    constructor(id: string, n: string) {
        this.id = id;
        this.name = n;
    }

    //...
}
```

The shortcut is:

```ts
class Department {
  private employees: string[] = [];

  constructor(private id: string, public name: string) {}

  describe(this: Department) {
    console.log(`Departement (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('d1', 'accounting');
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.describe();
accounting.printEmployeeInformation();
```
By adding the access modifiers to the constructor parameters, we can remove the initialization of the properties in the constructor body.

---

### "readonly" Properties

If the property won't change (NEVER), add `readonly` to it to enforce it.

```ts
class Department {
    // private readonly id: string;
    // private name: string;
    private employees: string[] = [];

    constructor(private readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
    }

    //...
}
```
---

### Inheritance

We might need more information for a specific type of department...For example, we have an IT dep which has an `id`, a `name` and `employees` but also `administrators` which is something only the IT dep will have. We might have the accounting dep which has an `id`, a `name` and `employees` but also a `report` (also specific only to the accounting dep).

> Note: YOU CAN ONLY INHERIT FROM ONE CLASS.

```ts
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string) {
      // super calls the constructer of the parent class
      // Here we are forwading the id to the parent class
      // and we are setting the name to 'IT' 
    super(id, 'IT'); // super is the first to be called before any this
    this.admins = admins;
  }
}
```

```ts
class ITDepartment extends Department {
    // Adding a new property
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
  }
}

const it = new ITDepartment('d1', ['Max']);
it.addEmployee('Max');
it.describe();
it.printEmployeeInformation();

// RES
// Departement (d1): IT
// 1
// ["Max"]
```

Inheritance in action:

```ts
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }
}
```

---

### Overriding Properties & The "protected" Modifier

Let's say we want to override `addEmployee` in `AccountingDepartment` class. We can't access `this.employees` because it is `private` in `Department` class.

```ts
class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
    }

    // This new implementation will override the one in the parent class 
    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }

        this.employees.push(name); // ERROR: Property 'employees' is private and only accessible within class 'Department'.
    }

    //...
}
```

If we want to access `employees` in class which extends `Department` class we should change `private` with `protected`. As a result, `employees` won't be accessible from outside BUT it can be accessed by the class which extend the "parent" class.

---

### Getters & Setters

A getter:

```ts
class AccountingDepartment extends Department {
    private lastReport: string;

    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    //...
}
// This will call the getter and not the property
accounting.mostRecentReport // you access it like a property not like you'll call a function
```

A setter:

```ts

class AccountingDepartment extends Department {
    //...
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }
    //...
}
// This will call the setter and not the property
accounting.mostRecentReport = 'Here is the last report...'; // you call it like a property not like you'll call a function
```

---

### Static Methods & Properties

A static property or static method allows you to add properties / methods which are not accessed on an instance of the class. As a result you don't need to call `new` class name first but you can access them directly on the class. Useful for utility functions you want to group or map to a class logically or global const in a class.

```ts
class Department {
    static fiscalYear = 2020;
    protected employees: string[] = [];

    constructor(private readonly id: string, public name: string) {
    }

    static createEmployee(name: string) {
        return {name: name};
    }

    //...
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);
```

Note: you  add a `static` property or method, you can't access them from your non static parts.

```ts

class Department {
    //...
    printEmployeeInformation() {
        console.log(this.employees);
        // `this` is not available in static context. this is used to access the instance of the class
        console.log(this.fiscalYear); // KO – Property 'fiscalYear' is a static member of type 'Department'
        console.log(Department.fiscalYear); // OK
    }
    //...
}

```

Because `this` does refer to the instance created based on the class. The static property is not available on the instance because the all idea behind `static` property or method is to be detached of the instance. You need to access it via the name of the class: `Department.fiscalYear`.

---

### Abstract Classes

You can easily override a method in a class which `extends` another one.

```ts
class AccountingDepartment extends Department {
    //...
    describe() {
        console.log('Accounting Department – ID: ', this.id); // note: we need to change id to protected in Department
    }

    //...
}

```

But sometimes you **don't want just to offer the option to override a method**. You instead want to force the dev working on an extending class to implement or to override a certain method.

```ts
abstract class Department {
    //...
    abstract describe(this: Department): void;
}
```

Note: an `abstract class` cannot be instantiated themselves. It is only useful for the inheriting class (to be forced to implement specific methods).

---

### Singletons & Private Constructors

The singleton pattern restricts the instantiation of a class and ensures that only one instance of the class exists. Singleton pattern restricts the instantiation of a class and ensures that only one instance of the class exists.

For example, we know there is only one accounting dep. We can make the construtor `private` – `private constructor(..
.)`. **It ensures we can't call `new` on the class**, so it is only accessible inside the class.

```ts
class AccountingDepartment extends Department {
    private lastReport: string;

    // a private constructor ensures we can't call new on the class
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    //...
}
```

The solution to get access to a `private` constructor is to use a `static` method.

```ts
class AccountingDepartment extends Department {
    //...
    private static instance: AccountingDepartment; // we create a private static field

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        //...
    }

    // we create a static method
    static getInstance() {
        if (AccountingDepartment.instance) { // we check if the "instance" exists
            return this.instance; // if yes, we return it
        }
        this.instance = new AccountingDepartment('d2', []); // Otherwise, we call the private constructor, to create the new instance
        return this.instance;
    }

    //...
}
```
Calling: 
```ts
const accounting1 = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
// accounting1 and accounting2 will be the same object / the same instance
```

---

# Interfaces

### A First Interface

In its simple version, an interface describes the structure (and the the concrete values) of an object. We can use to describe how the object should look like. We don't assign any value to it. We can use it as a type to type check for object which have to get that structure.

```ts
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}
// Defining how user1 object will look like
let user1: Person;

user1 = {
  name: 'Max',
  age: 30,
  greet(phrase: string) {
    console.log(`${phrase} from ${this.name}`);
  },
};

console.log(user1);
console.log(user1.greet('Hi there –'));
```

---

### Using Interfaces with Classes

What is the ≠ between `interface` and `type`?

```ts
// INTERFACE
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

// VS

// TYPE
type Person = {
  name: string;
  age: number;

  greet(phrase: string): void;
};
```

You can implement an interface in a class. An interface can be used as a contract that a class can implement.

```ts
interface Greetable {
  name: string;
  greet(phrase: string): void;
}
// Here we are forcing the existance of the greet method and the name property
class Person implements Greetable {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(`${phrase} from ${this.name}`);
  }
}

let user1: Greetable; // OK
user1 = new Person('Max'); // OK
```

> Note: YOU CAN ONLY INHERIT FROM ONE CLASS BUT YOU CAN IMPLEMENT MORE THAN ONE INTERFACE.

An interface is a bit like an abstract class. But the main difference is interface doesn't have any details about the implementation at all. And the abstract class has a mix between how the object should like and implementation as well.

---

### Readonly Interface Properties

You can add `readonly` to a property in an interface. Only be set once, and it is readonly after => immutable.

```ts
interface Greetable {
  readonly name: string;
  greet(phrase: string): void;
}
```

---

### Extending Interfaces

You can also implement inheritance in interfaces.

```ts
interface Named {
  readonly name: string;
}

interface Greetable {
  greet(phrase: string): void;
}

class Person implements Greetable, Named {
    //...
}
```
Can be converted to:
```ts
interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
    
}
```

An interface can inherit from more than one interface (≠ than for class).

```ts
interface Greetable extends Named, AnotherInterface {
    //...
}
```

---

### Using Interfaces as Function Types

```ts
// TYPE
type AddFn = (a: number, b: number) => number;

// INTERFACE (alternative)
interface AddFn {
  (a: number, b: number): number; // no method name, same as above
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
```

---

### Optional Parameters & Properties

```ts
interface Named {
  readonly name?: string; // optional name in interface
  outputName?: string; // optional property
  myMethod?(): void; // optional method
}

//...

class Person implements Greetable {
    name?: string; // optional name in class

    constructor(n?: string) { // n?
        if (n) { // check if n exists
            this.name = n;
        }
    }
}
```

---

### Compiling Interfaces to JavaScript

In es5 we can't see any reference to any of our interface. JavaScript doesn't know the interface concept. We can use it to improve our code but there is no output for the interface. Pure dev feature, to better code, to improve the structure and readibility. At runtime, no trace of interface.

---