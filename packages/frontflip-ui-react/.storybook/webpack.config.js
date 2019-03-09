const path = require('path');
const fs = require('fs')

// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  // Extend it as you need.

  // For example, add typescript loader:
  config.entry.style = [
    path.resolve(__dirname, '../src/style.scss')
  ]

  config.resolve.modules = [
    ...config.resolve.modules,
    'node_modules',
    path.resolve(__dirname, '../node_modules')
  ]
  
  config.module.rules.push({
    test: [/\.scss$/, /\.sass$/],
    use: [  {loader: 'style-loader'},
            {loader: 'css-loader'},
            {loader: 'postcss-loader'},
            {loader: 'sass-loader', options:{}}],
    include: path.resolve(__dirname, '../src')
  });

  return config;
  
};