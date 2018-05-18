module.exports = function(opts) {
  if(!opts){ 
    throw new Error("must type object"); 
  }
  if(!opts["before"] || !opts["after"] ){ 
    throw new Error("object name must before or after"); 
  }
  if(!Array.isArray(opts["before"]) || !Array.isArray(opts["after"]) ){ 
    throw new Error("before and after object type must use Array"); 
  }
  if(opts["before"].length != opts["after"].length || opts["before"].length == 0){
    throw new Error("Array length is 1 or more"); 
  }

  return function(css, result) {
    css.walkRules(function transformRules(rule) {
      for(var i = 0; i < opts["before"].length; i += 1){
        rule.selector = rule.selector.replace(opts["before"][i], opts["after"][i]);
      }
    });
  }
};
