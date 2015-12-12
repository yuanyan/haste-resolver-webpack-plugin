var Resolver = require('haste-resolver');
var blacklist = require('./blacklist');

function HasteResolverPlugin(options) {
  options = options || {};
  var projectRoots = options.projectRoots || [process.cwd()];
  var blacklistRE = blacklist(options.platform || 'web', options.blacklist);

  this.resolver = new Resolver({
    projectRoots: projectRoots,
    blacklistRE: blacklistRE
  });
}

module.exports = HasteResolverPlugin;

HasteResolverPlugin.prototype.apply = function(compiler) {
  var resolver = this.resolver;

  compiler.resolvers.normal.plugin("module", function(request, callback) {

    resolver.getHasteMap(function(hasteMap){
      if (hasteMap[request.request]) {
        this.doResolve("file", {
          request: hasteMap[request.request].path,
          query: request.query,
          directory: request.directory
        }, callback);
      } else {
        callback();
      }
    }.bind(this))

  })

};
