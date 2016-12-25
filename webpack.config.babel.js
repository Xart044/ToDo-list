import webpack from 'webpack';
import path from 'path';
const webpackConfig={
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
	devtool: 'cheap-module-eval-source-map',
	resolve:{
		modulesDirectory:['node_modules','app'],
		extensions:['','.js','.jsx']
	},
	module: {
        // preLoaders: [
	    // 	{
		 //        test: /\.(js|jsx)$/,
		 //        loaders: ['eslint'],
		 //        include: [
		 //          path.resolve(__dirname, "app"),
		 //        ],
	    //  	}
	    // ],
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
            },
            {
            	test: /\.json$/,
            	loader: 'json'
            },
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				loader: 'file'
			}
		]
	},
	plugins:[
		new webpack.optimize.OccurenceOrderPlugin()
	]
};
module.exports=webpackConfig;