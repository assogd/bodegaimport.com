export const generateKey = Math.random().toString(36).slice(2);

export const compSum = (arr) =>
  arr.map((d) => d.density).reduce((partialSum, a) => partialSum + a, 0);
