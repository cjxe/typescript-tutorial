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
