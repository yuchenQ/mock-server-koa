import { type } from 'ramda';

const OPTIONAL_MARK = '$';

const propsMatch = (target, input) => {
  const notMatch = Object.keys(target).find((key) => {
    const targetVal = target[key];

    if (key.includes(OPTIONAL_MARK)) {
      return false;
    }

    const pureKey = key.replace(OPTIONAL_MARK, '');
    const inputVal = input[pureKey];

    if (type(targetVal) === 'Object') {
      return !propsMatch(targetVal, inputVal);
    }

    return targetVal !== type(inputVal);
  });

  return !notMatch;
};

export default propsMatch;
