const webpack = require('webpack');

require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');

module.exports = withCSS(
  withSass({
    webpack: (config, { dev }) => {
      if (dev) {
        config.module.rules.push({
          test: /\.js$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: ['/node_modules/', '/.next/'],
        });
      } else {
        // Unshift polyfills in main entrypoint.
        const originalEntry = config.entry;
        // eslint-disable-next-line no-param-reassign
        config.entry = async () => {
          const entries = await originalEntry();
          if (entries['main.js']) {
            entries['main.js'].unshift('./utils/polyfills.js');
          }
          return entries;
        };
      }

      const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
      }, {});

      config.plugins.push(new webpack.DefinePlugin(env));

      return commonsChunkConfig(config, /\.(sass|scss|css)$/);
    },
    useFileSystemPublicRoutes: false,
  }),
);
