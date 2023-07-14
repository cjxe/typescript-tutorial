// explicit types
let character: string;
let age: number;
let isLoggedIn: boolean;

age = 40;
isLoggedIn = true;

// arrays
let ninjas: string[] = [];
ninjas.push('shaun');

// union types
let mixed: (string|number|boolean)[] = [];
mixed.push('hello');
mixed.push(20);
mixed.push(false);

// objects
let ninjaOne: object;
ninjaOne = {
  name: 'yoshi',
  age: 30
};

let ninjaTwo: {
  name: string,
  age: number,
  beltColour: string
}