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
    throw new Error('Length of before and after options must be the same');
  }
  if (beforeOpts.length === 0) {
    throw new Error('Array length is 1 or more');
  }
  beforeOpts.forEach(function (beforeOpt, idx) {
    var afterOpt = afterOpts[idx];

    switch (true) {
      case typeof beforeOpt === 'string': {
        if (!typeof afterOpt === 'string') {
          throw new Error(
            'The after option ' +
              afterOpt +
              ' must be a string. If you want to apply the replace callback function, then use a RegExp for the before option'
          );
        }
        break;
      }
      case beforeOpt instanceof RegExp: {
        if (!typeof afterOpt === 'string' && !typeof afterOpt === 'function') {
          throw new Error(
            'The after option ' + afterOpt + ' must be either a string, or a function'
          );
        }
        break;
      }
      default:
        throw new Error('The before option ' + beforeOpt + ' must be either a string, or a RegExp');
    }
  });

  return function (css, result) {
    css.walkRules(function (rule) {
      beforeOpts.forEach(function (beforeOpt, idx) {
        var afterOpt = afterOpts[idx];

        if (typeof beforeOpt === 'string') {
          rule.selector = rule.selector.split(beforeOpt).join(afterOpt);
        } else {
          rule.selector = rule.selector.replace(beforeOpt, afterOpt);
        }
      });
    });
  };
};
