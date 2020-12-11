import { promocodeSymbols } from './promocode.symbols';

export function randomInteger(min, max): number {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function randomString(length): string {
  const randomChars = promocodeSymbols;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
