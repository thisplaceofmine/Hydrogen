import typeOf from './typeOf';
 
const checkKeyValidity = (key: any): string | never => {
  let newKey = '';
  try {
    newKey = JSON.parse(newKey);
  } catch (e) {
    throw new Error('The callback function must return a string, number or valid JSON string');
  }
  return newKey;
};

type SameKey = 'replace' | 'throw' | 'ignore';

function keyMap(
  object: object,
  callback = (a: any) => a,
  config: { sameKey: SameKey; deep: boolean } = {
    sameKey: 'replace',
    deep: false,
  }
): object|never {
  console.log('object', object, typeOf(object));
  if (typeOf(object) !== 'object') {
    throw new Error('The first argument must be an object');
  }
  let output: Object = {};
  for (const entries of Object.entries(object)) {
    const [key, value] = entries;

    let newKey = '';
    newKey = checkKeyValidity(callback(key));

    if (!(newKey in object)) {
      output[newKey] = value;
      delete object[key];
    }

    switch (config.sameKey) {
      case 'replace':
        output[newKey] = value;
        delete object[key];
        break;
      case 'throw':
        throw new Error('The callback function must return a unique key');
      case 'ignore':
        break;
      default:
        throw new Error('The sameKey option must be replace, throw or ignore');
    }

    if (config.deep && typeOf(value) === 'object') {
      output[newKey] = keyMap(value, callback, config);
    }
  }
  return output;
}

module.exports = keyMap;
