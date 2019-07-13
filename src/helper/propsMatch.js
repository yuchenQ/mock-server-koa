import type from './type';

const OPTIONAL_MARK = '$';

const propsMatch = (target, input) => {
  const notMatch = Object.keys(target).find((key) => {
    const targetVal = target[key];
    const pureKey = key.replace(OPTIONAL_MARK, '');

    if (key.includes(OPTIONAL_MARK) && !input[pureKey]) {
      return false;
    }

    const inputVal = input[pureKey];

    if (type(targetVal) === 'Object') {
      return !propsMatch(targetVal, inputVal);
    }

    return targetVal !== type(inputVal);
  });

  return !notMatch;
};

export default propsMatch;
