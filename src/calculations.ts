import type { FuncType } from "./types";

const lnTaylor = (x: number, iterations: number = 40) => {
  let result = 0;

  let sign = 1;
  for (let i = 1; i < iterations; i++) {
    result += sign * (x - 1) ** i / i;
    sign *= -1;
  }

  return result;
}

const ln2 = lnTaylor(5/4, 100) + lnTaylor(8/5, 100);

console.log("Approx ln(2): ", ln2);
console.log("Real ln(2): ", Math.log(2));
console.log("Difference: ", Math.abs(ln2 - Math.log(2)));

function factorial(x: number): number {
  if (x <= 0) return 1;
  if (x <= 2) return x;

  return x * factorial(x - 1);
}

type FType = (a: number, b: number) => number;

type FunctionsType = Record<FuncType, FType>;

const sin = (x2: number) => {
  let x = x2 % (2 * Math.PI);
  let result = 0;
  for (let i = 0; i < 40; i++) {
    result += ((-1) ** i) * (x ** (2 * i + 1)) / factorial(2 * i + 1);
  }

  return result;
}

const cos = (x2: number) => {
  let x = x2 % (2 * Math.PI);
  let result = 0;
  for (let i = 0; i < 40; i++) {
    result += ((-1) ** i) * (x ** (2 * i)) / factorial(2 * i);
  }

  return result;
}

const ln = (x: number) => {
  if (x === 2) return ln2;

  let b = 1;
  let bExp = 0;
  while (b < x) {
    b *= 2;
    bExp++;
  }

  let x2 = x / b;
  
  return lnTaylor(x2) + bExp * ln2;
}

const naturalExp = (x: number) => {
  let result = 0;
  for (let i = 0; i < 40; i++) {
    result += (x ** i) / factorial(i);
  }
  return result;
}

export const twoParams: Record<FuncType, boolean> = {
  sin: false,
  cos: false,
  tan: false,
  csc: false,
  sec: false,
  cot: false,
  arctan: false,
  ln: false,
  exp: true,
  naturalExp: false,
  logBase: true
}

function arctanTaylor(val: number) {
  let result = 0;

  for (let i = 0; i < 40; i++) {
    result += ((-1) ** i) * (val ** (2 * i + 1)) / (2 * i + 1);
  }

  return result;
}

const arctanConst = 0.5;
const arctanConstValue = arctanTaylor(arctanConst);

const functions: FunctionsType = {
  sin,
  cos,
  tan: x => sin(x) / cos(x),
  csc: x => 1 / sin(x),
  sec: x => 1 / cos(x),
  cot: x => cos(x) / sin(x),
  arctan: x => {
    if (x <= 0.7) return arctanTaylor(x);

    const newVal = (x - arctanConst) / (1 + x * arctanConst);

    return arctanConstValue + arctanTaylor(newVal);
    
  },
  ln: (x) => ln(x),
  exp: (x, b) => naturalExp(x * ln(b)),
  logBase: (x, b) => ln(x) / ln(b),
  naturalExp
};

export const actualFunctions: FunctionsType = {
  sin: (x, a) => Math.sin(x),
  cos: (x, a) => Math.cos(x),
  tan: (x, a) => Math.tan(x),
  csc: (x, a) => 1 / Math.sin(x),
  sec: (x, a) => 1 / Math.cos(x),
  cot: (x, a) => 1 / Math.tan(x),
  ln: (x, a) => Math.log(x),
  exp: (x, a) => a ** x,
  logBase: (x, a) => Math.log(x) / Math.log(a),
  arctan: (x, a) => Math.atan(x),
  naturalExp: x => Math.exp(x)
}

export default functions;