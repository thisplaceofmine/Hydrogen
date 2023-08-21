type SameKey = 'replace' | 'throw' | 'ignore';
type Key = string | number | symbol;
type Config = {
    sameKey?: SameKey;
    deep?: boolean;
};
declare function keyMap(object: object, callback?: (a: Key) => Key, config?: Config): object | never;
export default keyMap;
