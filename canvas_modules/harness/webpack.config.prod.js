/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* eslint max-len: 0*/
/* eslint global-require:0 */

// Modules

var path = require("path");
var webpack = require("webpack");
var I18NPlugin = require("@dap/portal-common-i18n").I18nPlugin;
var babelOptions = require("./scripts/babel/babelOptions").babelClientOptions;
var constants = require("./lib/constants");
var SassLintPlugin = require("sasslint-webpack-plugin");

// Entry & Output files ------------------------------------------------------------>

var entry = {
	canvas: "./src/client/index.js",
	vendor: ["babel-polyfill", "react", "react-dom"]
};

var output = {
	path: path.join(__dirname, "dist"),
	publicPath: constants.APP_PATH,
	filename: "/js/[name].[hash].js",
	chunkFilename: "/js/chunk.[name].[id].[chunkhash].js"
};


// Loaders ------------------------------------------------------------>

var loaders = [
	{
		test: /\.json$/,
		loader: "json-loader"
	},
	{
		test: /\.js(x?)$/,
		loader: "babel",
		exclude: /node_modules/,
		query: babelOptions
	},
	{
		test: /\.s*css$/,
		loaders: [
			"style",
			"css",
			"sass",
			"postcss"
		]
	},
	{
		test: /\.(?:png|jpg|svg|woff|ttf|woff2|eot)$/,
		loaders: [
			"file?name=graphics/[hash].[ext]"
		]
	}
];


// Plugins ------------------------------------------------------------>
var plugins = [
	new webpack.DefinePlugin({
		"process.env.NODE_ENV": "'production'"
	}),
	new webpack.optimize.OccurenceOrderPlugin(),
	new I18NPlugin("en"),
	new SassLintPlugin({
		configFile: ".sass-lint.yml",
		context: "./src/components",
		glob: "**/*.scss",
		quiet: false,
		failOnWarning: true,
		failOnError: true
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new webpack.optimize.CommonsChunkPlugin({
		name: "vendor"
	}),
	new webpack.NoErrorsPlugin()
];

// Postcss ------------------------------------------------------------>

var postcss = [
	require("stylelint"),
	require("autoprefixer")
];

// Exports ------------------------------------------------------------>


module.exports = {
	entry: entry,
	// Uncomment this to see details of Webpack build failures
	stats: {
		errorDetails: true
	},
	// Uncomment below to help debug a production build
	// debug: true,
	// devtool: "source-map",
	// devtoolModuleFilenameTemplate: "[resource]",
	resolve: {
		modulesDirectories: ["web_modules", "node_modules"]
	},
	output: output,
	module: {
		loaders: loaders
	},
	plugins: plugins,
	postcss: postcss
};
