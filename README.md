# haste-resolver-webpack-plugin [![npm version](https://badge.fury.io/js/haste-resolver-webpack-plugin.svg)](http://badge.fury.io/js/haste-resolver-webpack-plugin)
> Haste resolver plugin for webpack

```
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');

module.exports = {
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: ['react-web', 'react-button']
    }),
  ]
};
```

## Options
* roots *Array*. Default is `[process.cwd()]`
* platform *String* - web/ios/android. Default is `web`
* blacklist *Array*. Directory or file to ignore.
* nodeModules *Array*. Node modules should crawl.
* preferNativePlatform *Boolean*. Default is `true`
