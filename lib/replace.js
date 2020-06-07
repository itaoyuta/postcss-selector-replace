module.exports = function (opts) {
  var beforeOpts, afterOpts;

  if (!opts || typeof opts !== 'object') {
    throw new Error('Always requires argment');
  }

  beforeOpts = opts['before'];
  afterOpts = opts['after'];

  if (!beforeOpts || !afterOpts) {
    throw new Error('Be sure to have "before" and "after" object names');
  }
  if (!Array.isArray(beforeOpts) || !Array.isArray(afterOpts)) {
    throw new Error('Objects "before" and "after" must be of type Array');
  }
  if (beforeOpts.length !== afterOpts.length) {
    throw new Error('Number of before and after options must be the same');
  }
  if (beforeOpts.length === 0) {
    throw new Error('Array length is 1 or more');
  }

  return function (css, result) {
    css.walkRules(function (rule) {
      var i;

      for (i = 0; i < beforeOpts.length; i++) {
        rule.selector = rule.selector.replace(beforeOpts[i], afterOpts[i]);
      }
    });
  };
};
