import keyMap from '../dist/keyMap';


describe('keyMap', () => {
  it('Run the keyMap function on each key', () => {
    expect(keyMap({ a: 1, b: 2 }, (key) => String(key).toUpperCase() ?? key)).toEqual({ A: 1, B: 2 });
  });

  // it('throw an error if the first argument is not an object', () => {
  //   expect(() => keyMap(1, () => {})).toThrow();
  // });
});
