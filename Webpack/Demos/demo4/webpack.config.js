module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
	    // {  test: /\.(jpe?g|png|gif|svg)$/i,
	    // 	loader: "url-loader?limit=8192&name=./[name].[ext]?[hash]"
	    // }
	    {
	    	 test: /\.(png|jpg)$/, 
	    	 loader: 'url-loader?limit=8192' 
	    }
    ]
  }
};