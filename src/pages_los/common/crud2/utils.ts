export const cacheWrapperKeyGen = (values) => {
  if (Array.isArray(values)) {
    return values.join("-");
  }
  return `${Math.random() * 100000}`;
};
