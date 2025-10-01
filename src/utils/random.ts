export function getRandomInt(min: number, max: number): number {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

export function getRandomFloat(min: number, max: number, digits = 1): number {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(digits));
}

export function getRandomBoolean(): boolean {
  return Math.random() < 0.5;
}

export function getRandomItem<T>(items: T[]): T {
  return items[getRandomInt(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[], count: number): T[] {
  const copy = [...items];
  const result: T[] = [];
  const take = Math.min(count, copy.length);
  for (let i = 0; i < take; i++) {
    const idx = getRandomInt(0, copy.length - 1);
    result.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return result;
}
