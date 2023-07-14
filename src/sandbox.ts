type StringOrNum = string | number;
type objWithName = { name: string, uid: StringOrNum};

const greet = (user: {name: string, uid: StringOrNum}) => {
  console.log(`${user.name} says hello`);
}