/**
 * Get random number from min to max (inclusive)
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get random float from min to max
 */
export function getRandomFloat(min: number, max: number, decimals: number = 1): number {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
}

/**
 * Get random element from array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[getRandomInt(0, array.length - 1)];
}

/**
 * Get random items from array
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

