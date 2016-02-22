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

  var resolver = new Resolver({
    roots: roots,
    blacklistRE: blacklistRE,
    platform: options.platform,
    providesModuleNodeModules: options.nodeModules,
    preferNativePlatform: (typeof preferNativePlatform !== 'undefined')? preferNativePlatform: true,
  });

  this.getHasteMap = resolver.getHasteMap();
  this.platform = options.platform;
}

module.exports = HasteResolverPlugin;

HasteResolverPlugin.prototype.apply = function(compiler) {
  var getHasteMap = this.getHasteMap;
  var platform = this.platform;

  compiler.resolvers.normal.plugin("module", function(request, callback) {

    getHasteMap.then(function(hasteMap){
      var mod = hasteMap.getModule(request.request, platform);
      if (mod) {
        this.doResolve("file", {
          request: mod.path,
          query: request.query,
          directory: request.directory
        }, callback);
      } else {
        callback();
      }
      // TODO: require('./foo') when exist foo.web.js、foo.ios.js
    }.bind(this))

  })

};
