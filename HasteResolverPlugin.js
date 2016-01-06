/**
 * Copyright (c) 2015-present, Yuanyan Cao. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';
var Resolver = require('haste-resolver');
var blacklist = require('./blacklist');

function HasteResolverPlugin(options) {
  options = options || {};
  var roots = options.roots || [process.cwd()];
  var blacklistRE = blacklist(options.platform || 'web', options.blacklist);

  var preferNativePlatform = options.preferNativePlatform;

  this.resolver = new Resolver({
    roots: roots,
    blacklistRE: blacklistRE,
    platform: options.platform,
    providesModuleNodeModules: options.nodeModules,
    preferNativePlatform: (typeof preferNativePlatform !== 'undefined')? preferNativePlatform: true,
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
