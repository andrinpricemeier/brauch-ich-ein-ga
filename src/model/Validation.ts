export const isValidNumber = (value: string) => {
  const ret = /^[.0-9]+$/.test(value);
  return ret;
};
