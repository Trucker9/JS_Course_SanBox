'use strict';
//######################################################################
//############# Creating objects with Constructor functions
//######################################################################
/*
// Arrow function wont work because it does not have "this" keyword
// What "new" does ?
// 1. {}(empty object) is created
// 2. this = {}
// 3. {} linked to a prototype ->
// 4. return { ... }
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const ali = new Person('ali', 1990);
const naser = new Person('naser', 1200);
console.log(naser instanceof Person); // true
*/
//######################################################################
//############# Prototypes(every object has access to a property called prototype. we create methods there)
//######################################################################
/*
// Now tall the instances of Person have access to calcAge();

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};
ali.calcAge();
console.log(ali.__proto__);
console.log(ali.__proto__ === Person.prototype); // true ->  ".prototype" is for object implementation. each instance has it as "__proto__"
console.log(Person.prototype.isPrototypeOf(ali)); // true

// Now "firstName" is object's own property and "race" is a property of  prototype property.
Person.prototype.race = 'jew';
console.log(ali.race);
console.log(ali.firstName);
*/
//######################################################################
//############# Prototype Inheritance
//######################################################################
/*

console.log(ali.__proto__.__proto__); // Chain : ali -> Person.prototype -> Object.prototype -> null
console.log(ali.__proto__.__proto__.__proto__); // log: null

console.log(ali.__proto__.constructor); // log: Person

const arr = [1, 2, 3, 4, 5, 6];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.constructor); // true
console.log(arr.__proto__.__proto__.__proto__); // null
// So we can add methods to Array !
Array.prototype.myFunction = () => {}; // NOT A GOOD PRACTICE !

const h1 = document.querySelector('h1');
console.dir(h1); // Chain : h1 -> HTMLHeadingElement.prototype -> HTMLElement.prototype -> Element.prototype -> Node.prototype -> EventTarget.prototype -> Object.prototype -> null

// In JS, we can call methods on functions because functions are objects themselves !
console.dir(x => x + 1); // f.prototype -> Object.prototype -> null
*/
//######################################################################
//############# Coding Challenge #1
//######################################################################
/*


// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`New speed of ${this.make} is ${this.speed}`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`New speed of ${this.make} is ${this.speed}`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car2.brake();
*/
//######################################################################
//############# ES6 Classes
//######################################################################
/*

    // NOTES ABOUT CLASSES :
    // 1. Classes are not hoisted (can't be used before deceleration)
    // 2. Classes are first-class Citizens (can be sent to and returned from function because classes are some kind of functions behind the scenes)
    // 3. Body of class will be executed in "use strict" mode

class PersonES6 {
  constructor(fullName, birthYear) {
    this.fullName = fullName; // we wrote a fullName setter method and here it will be used (not like Java)
    this.birthYear = birthYear;
  }
  // All this functions will be added to prototype property.
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  // Creating setter for a property that already exist
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else alert('Wrong name inserted !');
  }
  // _fullname is new, we need to create a getter for this new property
  get fullName() {
    return this._fullName;
  }
  // NOTE about get and set. these two methods are not like classic Java methods.
  // A setter function is a function that's called implicitly when you do something like: someObject.property = 25;
  // A getter function is a function that's used when we want to get some property of the object.
  // so by using "someObject.property;" we are using the get function to read the property.
  // IN OTHER WORD, WHEN WE WANT TO SET THE PROPERTY, js USES SET METHOD AND WHEN WE WANT TO READ A PROPERTY, js USES GET METHOD THAT WE WROTE.

  // Static method (attaches to the constructor)
  static hey() {
    console.log('hey Stupid !');
  }
}
// or manually adding
PersonES6.prototype.greet = function () {
  console.log('Hey ' + this.fullName + '! ');
};

const jessica = new PersonES6('jessica', 1991);
jessica.greet();
jessica.calcAge();

jessica.fullName = 'Jessica Davis';
console.log(jessica.fullName);
*/
//######################################################################
//############# Static methods (attaching functions to constructor not prototype !)
//######################################################################
/*

// This function wont be inherited in instances is accessible like below
// Person.hey = function () {
//   console.log('Hey stupid !');
// };
// Person.hey();

//another static method is written in
*/
//######################################################################
//############# Object.create -> creates and empty object and sets the first argument is its prototype
//############# then with init(); we create the instance we want.
//######################################################################
/*

// Creating prototype object
const PersonProto = {
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },

  calcAge() {
    console.log(2022 - this.birthYear);
  },
};

// returns a new object that is linked to the proto that we passed there.
const steven = Object.create(PersonProto); // Passing proto
steven.init('steven', 1979);

console.log(steven.__proto__ === PersonProto); // log: true
*/
//######################################################################
//############# Coding challenge #2
//######################################################################
/*
// Coding Challenge #3

// 1. Re-create challenge 1, but this time using an ES6 class;
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

// DATA CAR 1: 'Ford' going at 120 km/h

// GOOD LUCK 😀


class CarES6 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`New speed ${this.speed}`);
  }
  brake() {
    this.speed -= 5;
    console.log(`New speed ${this.speed}`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = newSpeed * 1.6;
  }
}

const car3 = new CarES6('ford', 120);

car3.accelerate();
car3.brake();
console.log(car3.speedUS);
*/
//######################################################################
//############# Inheritance between classes : Constructor functions
//######################################################################

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // if needed this go to OOP video 15
  this.course = course;
};
// Object.create() makes the link between prototypes
// mike.__proto__.__proto__ = somePerson.__proto__
Student.prototype = Object.create(Person.prototype);
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.birthYear}`);
};
const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

Student.prototype.constructor = Person;

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

/*
 */
//######################################################################
//############# Coding challenge #3
//######################################################################
/*
 */
/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

//######################################################################
//############# Inheritance between classes : ES6
//######################################################################
class PersonES6 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2022 - this.birthYear);
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    }
  }
  // _fullname is new, we need to create a getter for this new property
  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('hey Stupid !');
  }
}

class StudentCL extends PersonES6 {
  // extends -> does all the linking job.
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // super -> constructor of the parent class
    this.course = course;
  }

  // Overwriting a method
  calcAge() {
    console.log("I'm 30");
  }
}
const martha = new StudentCL('Martha Jonas', 2012, 'Computer Science');
martha.calcAge();

//######################################################################
//############# Inheritance between classes : Object.create()
//######################################################################

const PersonProto = {
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },

  calcAge() {
    console.log(2022 - this.birthYear);
  },
};

// creating an empty object and setting its prototype to PersonProto
const StudentProto = Object.create(PersonProto);
// creating init() method to call on the instances of Student
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

const jay = Object.create(StudentProto); // NOW : Student -> Person -> Object -> null
jay.init('Jay Ford', 2010, 'Pornography');

StudentProto.introduce = function () {
  console.log(this.firstName);
};
jay.introduce();
jay.calcAge();
//######################################################################
//#############
//######################################################################
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields -> before constructor
// 2) Private fields -> before constructor with #
// 3) Public methods -> after constructor
// 4) Private methods -> before constructor with _
// (there is also the static version)

class Account {
  // 1) Public fields (available on instances)
  locale = navigator.language;

  // 2) Private fields (available on instances)
  #movements = [];
  #pin; // will be initialized in the constructor

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // Protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    // For chaining
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    // For chaining
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      // For chaining
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  // 4) Private methods
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

//######################################################################
//############# Inheritance between classes : Constructor functions
//######################################################################

//######################################################################
//############# Inheritance between classes : Constructor functions
//######################################################################

//######################################################################
//############# Inheritance between classes : Constructor functions
//######################################################################
