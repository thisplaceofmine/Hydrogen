// const typeOf = require('../dist/typeof');
import typeOf from '../dist/typeof';

describe('typeof', () => {
  it('should return the type of a variable', () => {
    expect(typeOf(1)).toBe('number');
    expect(typeOf('1')).toBe('string');
    expect(typeOf(true)).toBe('boolean');
    expect(typeOf(null)).toBe('null');
    expect(typeOf(undefined)).toBe('undefined');
    expect(typeOf({})).toBe('object');
    expect(typeOf([])).toBe('array');
    expect(typeOf(() => {})).toBe('function');
    // map
    expect(typeOf(new Map())).toBe('map');
    // set
    expect(typeOf(new Set())).toBe('set');
    // weakmap
    expect(typeOf(new WeakMap())).toBe('weakmap');
    // weakset
    expect(typeOf(new WeakSet())).toBe('weakset');
    // symbol
    expect(typeOf(Symbol('1'))).toBe('symbol');
    // date
    expect(typeOf(new Date())).toBe('date');
    // regexp
    expect(typeOf(new RegExp('1'))).toBe('regexp');
    // error
    expect(typeOf(new Error())).toBe('error');
    // promise
    expect(typeOf(new Promise(() => {}))).toBe('promise');
    // generator
    expect(typeOf(function* () {})).toBe('generatorfunction');
    // arraybuffer
    expect(typeOf(new ArrayBuffer(1))).toBe('arraybuffer');

  });
});