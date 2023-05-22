declare const checkKeyValidity: (key: any) => string | never;
type SameKey = 'replace' | 'throw' | 'ignore';
declare function keyMap(object: any, callback?: (a: any) => any, config?: {
    sameKey: SameKey;
    deep: boolean;
}): object | never;
