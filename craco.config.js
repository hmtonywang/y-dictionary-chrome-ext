const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // const isEnvDevelopment = env === 'development';
      // const isEnvProduction = env === 'production';
      webpackConfig.entry = {
        main: './src/index.js',
        content: './src/content.js',
        background: './src/background.js',
      };
      webpackConfig.output.filename = '[name].js';
      webpackConfig.optimization.runtimeChunk = false;
      return webpackConfig;
    },
  },
};