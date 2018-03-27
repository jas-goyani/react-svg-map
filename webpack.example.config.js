/*eslint-env node*/
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
	return {
		entry: './example/src/index.jsx',
		output: {
			path: path.resolve(__dirname, 'example/dist'),
			filename: 'index.js',
		},
		module: {
			rules: [{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					{
						loader: 'eslint-loader',
						options: {
							emitWarning: options.mode === 'development', // Avoid to block compilation when ESLint error
						}
					}
				],
			}, {
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'sass-loader'
				}]
			}, {
				test: /\.html$/,
				exclude: /node_modules/,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: true
					}
				}]
			}]
		},
		resolve: {
			extensions: ['.json', '.js', '.jsx'],
		},
		plugins: [
			new HtmlWebPackPlugin({
				template: './example/src/index.html',
				filename: './index.html'
			})
		]
	};
};
