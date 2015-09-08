module.exports = {
    context: __dirname,
    entry: {
        'index.ios': ['./index.ios.js']
    },
    devtool: "source-map",
    output: {
        path: __dirname,
        filename: "bundle.web.js",
        sourceMapFilename: "bundle.web.map"
    },
    resolve: {
      alias: {
        "react-native": __dirname + "/../../src/"
      }
    },
    externals: [
        require(__dirname + "/../../src/macro/image")
    ],
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader"}
        ]
    }
};
