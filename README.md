# TypeScript tutorial

## Lesson 2
Compile TS -> JS file
```
tsc sandbox.ts
```

## Lesson 3
when you initialise a variable and set a value to it, it can't be set to a value with a different type
```js
let character = 'mario';
character = 40;

// ❌ error TS2322: Type 'number' is not assignable to type 'string'.
```

## Lesson 4
Once an array is initialised with some values, only those type of values can be stored
```js
let names = ['luigi', 'mario', 'yoshi'];
names.push('toad');

// ✅
```
```js
let mixed = ['ken', 4, 'chun', 94, true];
mixed.push('ra');
mixed.push(10);

// ✅
```
```js
let names = ['luigi', 'mario', 'yoshi'];
names.push(40);

// ❌ error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

Once an object is initialised with some values, 
- the corresponding type of the key:value can't be changed (or *type casted*)
```js
let ninja = {
  name: 'mario',
  belt: 'black',
  age: 30
}

ninja.age = 40;
ninja.name = 'ryu';
// ✅
```
```js
let ninja = {
  name: 'mario',
  belt: 'black',
  age: 30
}

ninja.age = 'old';
// ❌ error TS2322: Type 'string' is not assignable to type 'number'.
```

- no new key:value pair can be pushed in
```js
let ninja = {
  name: 'mario',
  belt: 'black',
  age: 30
}

ninja.address = 'old';
// ❌ error TS2339: Property 'address' does not exist on type '{ name: string; belt: string; age: number; }'.
```
- when the variable is reinitialised with some other values, all key:value pairs must be included
```js
let ninja = {
  name: 'mario',
  belt: 'black',
  age: 30
}

ninja = {
  name: 'yoshi',
  belt: 'orange',
  // age: 50
}

// ❌ error TS2741: Property 'age' is missing in type '{ name: string; belt: string; }' but required in type '{ name: string; belt: string; age: number; }'.
```

## Lesson 5
You can define types of variables without assigning a value:
```js
let character: string;
let age: number;
let isLoggedIn: boolean;
let ninjas: string[];
let mixed: (string|number|boolean)[];
let ninjaOne: object;
let ninjaTwo: {
  name: string,
  age: number,
  beltColour: string
};

// ✅
```
💡 when you initialise a variable with an array of some type(s), set the value to `[]` so you can use the `.push` method in the future
```js
let ninjas: string[] = [];
ninjas.push('shaun');

// ✅
```
```js
let mixed: (string|number|boolean)[] = [];
mixed.push('hello');
mixed.push(20);
mixed.push(false);

// ✅
```

## Lesson 6
Type type `any` exists. Avoid using it since it mainly defeats the purpose of using types.

## Lesson 7
In a typical project, you have 2 main folders:
```
├── public
│   ├── index.html
│   ├── sandbox.js
│   └── styles.css
└── src
    └── sandbox.ts
```
1- `/public` gets deployed onto the main server 

2- you may have multiple fines in `/src`. Ideally, you would like to compile all `.ts` files easily

Solution: initialise a `tsconfig.json` file, configure it, and run it
```
tsc --init
tsc -w
```

## Lesson 8
The type `Function` exist
```js
let add: Function;

const add = (a: number, b: number) => {
  console.log(a + b)
}

add(5, 10);

// ✅
```
you can declare "optional" parameters by adding `?` after the parameter
```js
const add = (a: number, b: number, c?: number) => {
  console.log(a + b)
}

add(5, 10);
add(5, 10, 30);

// ✅
```
you can set default values to parameters

💡 set your required parameters first, and optional/default parameters last
```js
const add = (a: number, b: number, c?: number|string = 10) => {
  console.log(a + b)
  console.log(c)
}

// ✅
```
TS infers the return type of the function, but you can manually set it too
```js
const add = (a: number, b: number, c?: number|string): number => {
  return a + b
}

let result = add(5, 10); // the type of `result` is `number`

// ✅
```

## Lesson 9
if you happen to work with long or repeating types, you can define "type aliases"

```js
type StringOrNum = string | number;

const greet = (user: {name: string, uid: StringOrNum}) => {
  console.log(`${user.name} says hello`);
}

const leave = (user: {name: string, uid: StringOrNum}) => {
  console.log(`${user.name} has left`);
}

// ✅
```
```js
type StringOrNum = string | number;
type objWithName = { name: string, uid: StringOrNum};

const greet = (user: objWithName) => {
  console.log(`${user.name} says hello`);
}

const leave = (user: objWithName) => {
  console.log(`${user.name} has left`);
}

// ✅
```

## Lesson 10
it is possible to decalre functions parameter, its types and its return value without defining the body of the function. These declarations are called "function signatures"

they are useful when working with interfaces, documenting and working with an IDE
```js
let greet: (a: string, b:string) => void; // signature. `a` and `b` means the function `greet` will have 2 parameters in the future

greet = (name: string, greeting: string) => {
  console.log(`${name} says ${greeting}`);
}

// ✅
```

## Lesson 11
TS doesn't know if the HTML element you are trying to get exists, so it can refer the return type as `null`. To overcome this and access **existing** the keys inside the object, you can append `!` suffix at the end of the variable
```js
const anchor = document.querySelector('a');

console.log(anchor.href);

// ❌ error TS18047: 'anchor' is possibly 'null'.
```
```js
const anchor = document.querySelector('a')!;

console.log(anchor.href);
// ✅
```
sometimes TS can't detect the type of the element (i.e., when selecting an HTML by querying with a class name), so you can type cast the type `Element` to `HTMLFormElement` using the syntax  <variable> `as` <type>. This helps when using an IDE (i.e., autocomplete dropdown comes up)
```js 
// 🚨 look at the file `index.html` to understand what `querySelector` method is selecting
const form = document.querySelector('.new-item-form') as HTMLFormElement;
const type = document.querySelector('#type') as HTMLSelectElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
// ✅
```

## Lesson 12
🚨 When initialising a class in TS, you have to set a value to the introduced properties (e.g., next to them, in the constructor)
```js
class Invoice { 
  client: string;
  details: string;
  amount: number;
};

// ❌ properties are not set 
```
```js
// classes
class Invoice { 
  client: string = '';
  details: string = '';
  amount: number = 5;
};

// ✅
```
```js
// classes
class Invoice { 
  client: string;
  details: string;
  amount: number;

  constructor(c: string, d: string, a: number) {
    this.client = c;
    this.details = d;
    this.amount = a;
  }
};

// ✅
```

## Lesson 13
you can change how the properties inside the classes can be accessed or modified by using the "access modifiers"
```js
class Invoice { 
  private client: string;
  private details: string;
  readonly amount: number;

  constructor(c: string, d: string, a: number) {
    this.client = c;
    this.details = d;
    this.amount = a;
  }
};

const invoiceOne = new Invoice('mario', 'work on the mario youbsite', 250);
console.log(invoiceOne.client)

// ❌ error TS2341: Property 'client' is private and only accessible within class 'Invoice'.
```
💡 if you use access modifiers before the properties, you can directly define the class properties inside the constructor
```js
class Invoice { 
  constructor(
    readonly client: string,
    private details: string,
    public amount: number,
  ){}

  format() {
    return `${this.client} owes £${this.amount} for ${this.details}`;
  }
};
```
### Access modifiers
- **public** *(default behaviour)*: property can be accessed within the class and outside of the class
- **private**: property can be accessed within the class, but not outside of the class
- **readonly**: property can be accessed with the class and outside of the class BUT can't be changed (both inside the class and outside the class)
- **protected**: Similar to the private access modifier, except that protected properties can be accessed using their deriving classes.
#### Example of a class extending another class
![example of a class extending another class](/docs/extends-classes-diagram.png)
```js
class Person{
    constructor(personName, personAge, gender){
        this.personName = personName;
        this.personAge = personAge;
        this.gender = gender;   
    }
 
    get personInfo(){
        return (`The name of person is ${this.personName} of Age
                ${this.personAge} and gender is ${this.gender}`);
    }  
}
 
class Student extends Person{
    constructor(personName, personAge, gender, standard, collegeName){
       super(personName, personAge, gender);
       this.standard = standard;
       this.collegeName = collegeName;
    }
 
    get studentInfo(){
        return (`The name of student is ${this.personName} and in
               ${this.standard} from College ${this.collegeName}`);
    }
 
    get grade(){
        return this._grade;
    }
 
    set grade(grade){
        console.log("Inside the setter Function")
        this._grade = grade;
    }
}
```
#### Example of using the `protected` access modified
```js
class Employee {
    public empName: string;
    protected empCode: number;

    constructor(name: string, code: number){
        this.empName = name;
        this.empCode = code;
    }
}

class SalesEmployee extends Employee{
    private department: string;
    
    constructor(name: string, code: number, department: string) {
        super(name, code);
        this.department = department;
    }
}

let emp = new SalesEmployee("John Smith", 123, "Sales");
emp.empCode; //Compiler Error
```
- **static**: a static property is **shared among all instances** of a class
```js
class Employee {
    static headcount: number = 0; // this value is the same for EVERY `Employee` class

    constructor(
        private firstName: string,
        private lastName: string,
        private jobTitle: string) {

        Employee.headcount++;
    }
}
```

## Lesson 14
🚨 When importing modules (i.e., functions from other files) import the `.js` file
```js
import { Invoice } from './classes/Invoice';

// ❌
```
```js
import { Invoice } from './classes/Invoice.js';

// ✅
```

### Misc problem
The app is requesting multiple js files
![multiple file requests](/docs/multiple-js-requests.png)
this is a problem in bigger apps since multiple requests use too many server resources and thats why you would like to avoid it if possible. This can be solved by bundling the app to a single js file using **webpack**

## Lesson 15
A new type declaration other than `type` is `interface`. They are very similar to types. The main difference is `interface` is mutable (i.e., can be extended) and `type` is immutable. Some examples below that the type declaration `interface` supports but `type` doesn't:
```js
interface BaseInterface {
  // Properties and methods
}

interface ExtendedInterface extends BaseInterface {
  // Additional properties and methods
}
```
```js
type BaseType = {
  // Properties and methods
};

type ExtendedType = BaseType & {
  // Additional properties and methods
};

```
```js
interface MyInterface {
  prop1: string;
}

interface MyInterface {
  prop2: number;
}

const obj: MyInterface = {
  prop1: "Hello",
  prop2: 42,
};
```

## Lesson 16
You can use the `implements` keyword to indicate the a class implements a given interface
```js
export interface HasFormatter {
  format(): string;
}

export class Payment implements HasFormatter { 
  constructor(
    readonly recipient: string,
    private details: string,
    public amount: number,
  ){}

  format() {
    return `${this.recipient} is owed £${this.amount} for ${this.details}`;
  }
};
```

`extends` means:
The **new class is a child**. It gets benefits coming with inheritance. It has all the properties and methods of its parent. It can override some of these and implement new ones, but the parent stuff is already included.

`implements` means:
The **new class** can be treated as **the same "shape"**, but **it is not a child**. It could be passed to any method where Person is required, regardless of having a different parent than Person.
-
Classes `implement` interfaces. Classes `extend` classes. Interfaces extend interfaces.

## Lesson 17
code to render the HTML page

## Lesson 18
Generics enable types (classes, types, or interfaces) to act as parameters. It helps us reuse the same code for different types of input since the type itself is available as a parameter.
```js
function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity<string>("myString");
```

Generics are used when you want declare multiple different variables using the same type for most properties and change the type of >=1 property while initialising it 
```js
const addUID = (obj: object) => {
  let uid = Math.floor(Math.random() * 100);
  return {...obj, uid};
}

let docOne = addUID({name: 'yoshi', age: 40});

console.log(docOne.name);

// ❌ error TS2339: Property 'name' does not exist on type '{ uid: number; }'.
```
```ts
const addUID = <T>(obj: T) => {
  let uid = Math.floor(Math.random() * 100);
  return {...obj, uid};
}

let docOne = addUID({name: 'yoshi', age: 40});
let docTwo = addUID('hello'); // but the problem is T is too general now

console.log(docOne.name);

// ✅
```
```ts
const addUID = <T extends {name: string}>(obj: T) => {
  let uid = Math.floor(Math.random() * 100);
  return {...obj, uid};
}

let docOne = addUID({name: 'yoshi'});
let docTwo = addUID({name: 'yoshi', age: 40});

console.log(docOne.name);

// ✅
```