var postcss = require('postcss');
var replace = require('../lib/replace');

test('only array options', () => {
  expect(() => {replace()}).toThrow();
});

test('object name must use before and after', () => {
  expect(() => {replace({"before": []})}).toThrow();
});

test('object name must use before and after', () => {
  expect(() => {replace({"before": [], "after": 0})}).toThrow();
});

test('Array length is 1 or more', () => {
  expect(() => {replace({"before": [], "after": []})}).toThrow();
  expect(() => {replace({"before": ['[test]'], "after": []})}).toThrow();
});

test('replace pattern test', () => {
  expect(postcss(replace({'before': ['[test]'], 'after': ['^']})).process('h1{}').css)
    .toBe('h1{}');

  expect(postcss(replace({'before': ['[test]'], 'after': ['^']})).process('[test]h1{}').css)
    .toBe('^h1{}');
});
