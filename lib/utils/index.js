export const generateKey = Math.random().toString(36).slice(2);

export const compSum = (arr) =>
  arr.map((d) => d.density).reduce((partialSum, a) => partialSum + a, 0);

export const orderWines = (slices, wines) => {
  const slicedWineIds = slices
    .filter((a) => a.variation === "wine")
    .map((b) => b.primary.reference.id);

  const filteredWines = wines.filter((a) =>
    slicedWineIds.some((b) => b != a.id)
  );

  return slices.concat(filteredWines);
};
