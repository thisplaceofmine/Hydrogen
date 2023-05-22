const checkKeyValidity = (key) => {
    let newKey = '';
    try {
        newKey = JSON.parse(newKey);
    }
    catch (e) {
        throw new Error('The callback function must return a string, number or valid JSON string');
    }
    return newKey;
};
function keyMap(object, callback = (a) => a, config = {
    sameKey: 'replace',
    deep: false,
}) {
    console.log('object', object, typeOf(object));
    if (typeOf(object) !== 'object') {
        throw new Error('The first argument must be an object');
    }
    let output = {};
    for (const entries in Object.entries(object)) {
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
