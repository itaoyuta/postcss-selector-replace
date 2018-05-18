module.exports = function(opts) {
  if(!opts) return;
  if(!opts["before"] || !opts["after"] ) return;
  if(!Array.isArray(opts["before"]) || !Array.isArray(opts["after"]) ) return;
  if(opts["before"].length != opts["after"].length || opts["before"].length == 0) return;

  return function(css, result) {
    css.walkRules(function transformDecl(decl) {
      for(var i = 0; i < opts["before"].length; i += 1){
        decl.selector = decl.selector.replace(opts["before"][i], opts["after"][i]);
      }
    });
  }
};
