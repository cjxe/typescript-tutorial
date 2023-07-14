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

