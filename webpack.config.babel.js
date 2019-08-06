import path from 'path';
import { warmup as threadLoaderWarmup } from 'thread-loader';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

export default () => {
  const BUILD_DIR = path.resolve(__dirname, 'dist');
  const SOURCE_DIR = path.resolve(__dirname, 'src');

  threadLoaderWarmup({}, ['babel-loader']);

  return {
    mode: 'production',
    entry: `${SOURCE_DIR}/index.js`,
    output: {
      path: BUILD_DIR,
      filename: 'index.js',
    },
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
      extensions: ['.js'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
      ],
    },
    module: {
      rules: [{
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader?cacheDirectory'],
      }],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 5,
          },
        }),
      ],
    },
    plugins: [new CleanWebpackPlugin()],
  };
};
