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

test('Option arrays length is the same', () => {
  expect(() => {
    replace({ before: ['[test1]', '[test2]'], after: ['[after1]'] });
  }).toThrow();
  expect(() => {
    replace({ before: ['[test1]'], after: ['[after1]', '[after2]'] });
  }).toThrow();
});

test('Replace pattern test', () => {
  const pluginTestOptions = { before: ['[test]'], after: ['^'] };

  expect(postcss(replace(pluginTestOptions)).process('h1{}').css).toBe('h1{}');
  expect(postcss(replace(pluginTestOptions)).process('[test]h1{}').css).toBe('^h1{}');
});

test('Replace pattern test with nesting', () => {
  const pluginTestOptions = { before: ['[test]'], after: ['^'] };

  expect(postcss(replace(pluginTestOptions)).process('.text1,.text2 {h1 {}}').css).toBe(
    '.text1,.text2 {h1 {}}'
  );
  expect(postcss(replace(pluginTestOptions)).process('.text1,.text2 {[test]h1 {}}').css).toBe(
    '.text1,.text2 {^h1 {}}'
  );
});

test('Advanced replace pattern test with regex', () => {
  const pluginTestOptions = { before: [/\bh\d/g], after: ['h1'] };

  expect(postcss(replace(pluginTestOptions)).process('p{}').css).toBe('p{}');
  expect(postcss(replace(pluginTestOptions)).process('h1{}').css).toBe('h1{}');
  expect(postcss(replace(pluginTestOptions)).process('h3{}').css).toBe('h1{}');
});

test('Advanced replace pattern test with callback', () => {
  function replaceCallback(match, p1) {
    const curNumber = Number(p1) || 0;
    const newNumber = (curNumber + 1) % 6 || 1;

    return `h${newNumber}`;
  }

  const pluginTestOptions = { before: [/\bh(\d)/g], after: [replaceCallback] };

  expect(postcss(replace(pluginTestOptions)).process('p{}').css).toBe('p{}');
  expect(postcss(replace(pluginTestOptions)).process('h1{}').css).toBe('h2{}');
  expect(postcss(replace(pluginTestOptions)).process('h6{}').css).toBe('h1{}');
});
