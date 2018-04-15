export const validateInput = (object, exclude) => {
  const objKeys = Object.keys(object);
  let key;

  if (exclude) {
    for (let i = 0; i < objKeys.length; i += 1) {
      key = objKeys[i];

      if (!exclude.includes(key) && object[key] === '') {
        console.log(key + '->' + object[key]);
        return false
      }
    }
  } else {
    for (let i = 0; i < objKeys.length; i += 1) {
      key = objKeys[i];

      if (object[key] === '') {
        console.log(key + '->' + object[key]);
        return false
      }
    }
  }

  return true;
};