const OPTIONAL_MARK = '$';

const propsMatch = (target, input) => {
  const notMatch = Object.keys(target).find((key) => {
    const targetVal = target[key];

    if (key.includes(OPTIONAL_MARK)) {
      return false;
    }

    const pureKey = key.replace(OPTIONAL_MARK, '');
    const inputVal = input[pureKey];

    if (Array.isArray(targetVal)) {
      return !Array.isArray(inputVal);
    }

    if (typeof targetVal === 'object') {
      return !propsMatch(targetVal, inputVal);
    }

    return typeof targetVal !== typeof inputVal;
  });

  return !notMatch;
};

export default propsMatch;
