// You could just use something like 'Lodash' for this really.
export const keyExists = (arr, queryKey) =>
  arr.some(({ key }) => key === queryKey);
