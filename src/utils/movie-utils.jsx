export const isArrayNotEmpty = array => {
  return Array.isArray(array) && array.length > 0;
};

export const isArrayEmpty = array => !isArrayNotEmpty(array);

export const isStringEmpty = str => typeof str !== 'string' || str?.trim().length === 0;

export const isStringNotEmpty = str => !isStringEmpty(str);
