var postcss = require('postcss');
var replace = require('../lib/replace');

test('Always requires argment', () => {
  expect(() => {
    replace();
  }).toThrow();
});

test('Be sure to have "before" and "after" object names', () => {
  expect(() => {
    replace({ before: [] });
  }).toThrow();
});

test('Objects "before" and "after" must be of type Array', () => {
  expect(() => {
    replace({ before: [], after: 0 });
  }).toThrow();
});

test('Array length is 1 or more', () => {
  expect(() => {
    replace({ before: [], after: [] });
  }).toThrow();
  expect(() => {
    replace({ before: ['[test]'], after: [] });
  }).toThrow();
});

test('Replace pattern test', () => {
  expect(postcss(replace({ before: ['[test]'], after: ['^'] })).process('h1{}').css).toBe('h1{}');

  expect(postcss(replace({ before: ['[test]'], after: ['^'] })).process('[test]h1{}').css).toBe(
    '^h1{}'
  );
});
