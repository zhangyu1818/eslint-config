// prettier/prettier - inconsistent formatting

// Missing semicolons (configured to not use semicolons)
export const greeting = "Hello, World!";

// Wrong quotes (should be single quotes)
export function add(a: number, b: number): number {
  return a + b;
}

// Inconsistent spacing
export const user={age:30,name:"John"};

// Wrong indentation
export const numbers=[
    1,
    2,
    3,
  4,
5
];

// Missing trailing comma
export const multilineObject = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john@example.com"
};

// Inconsistent line breaks
export function complexFunction(param1: string,param2: number,param3: boolean): string {
if(param3){return `${param1}: ${param2}`;}
return param1;}
