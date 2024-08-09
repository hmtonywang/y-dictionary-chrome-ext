const TerserPlugin = require("terser-webpack-plugin");

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
      webpackConfig.optimization.minimize = true;
      webpackConfig.optimization.minimizer = [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            keep_classnames: true,
            keep_fnames: true
          }
        })
      ];
      return webpackConfig;
    },
  },
};