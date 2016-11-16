import webpack from 'webpack';
import path from 'path';
const webpackConfig={
	// context:__dirname,
	entry: 
	[
	'./app/script/app.jsx'
	],
	output: 
	{
		path: path.join(__dirname,'build'),
		publicPath:'/build/',
		filename: 'bundle.js'
	},
	devtool: 'inline-source-map',
	resolve:{
		modulesDirectory:['node_modules','app'],
		extensions:['','.js','.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				include:/app/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
                test: /\.(scss|sass)$/,
                loaders: ['style', 'css', 'sass']
            }
		]
	},
	plugins:[
		new webpack.NoErrorsPlugin()
	]
};
module.exports=webpackConfig;