import typeOf from './typeof';
 
type SameKey = 'replace' | 'throw' | 'ignore';
type Key = string | number | symbol;
type Config = {
  sameKey?: SameKey;
  deep?: boolean;
}

function keyMap(
  object: object,
  callback = (a: Key): Key => a,
  config: Config = {
    sameKey: 'replace',
    deep: true,
  }
): object|never {
  let output: Object = {};
  for (const entries of Object.entries(object)) {
    const [key, value] = entries;
    let newKey;
    newKey = callback(key);

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
    }

    if (config.deep && typeOf(value) === 'object') {
      output[newKey] = keyMap(value, callback, config);
    }
  }
  return output;
}

export default keyMap;
