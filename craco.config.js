const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // const isEnvDevelopment = env === 'development';
      // const isEnvProduction = env === 'production';
      webpackConfig.output.filename = 'static/js/[name].js';
      webpackConfig.output.chunkFilename = 'static/js/[name].chunk.js';
      webpackConfig.output.assetModuleFilename = 'static/media/[name][ext]';
      webpackConfig.optimization.runtimeChunk = false;
      return webpackConfig;
    },
  },
};