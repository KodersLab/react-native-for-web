React Native for Web
=======

A set of classes and react components to make work your react-native app in a browser. (with some limitations obviously)
 - [Slack channel on reactiflux!](https://reactiflux.slack.com/messages/react-native-for-web/details/)
 - [GitHub repo](https://github.com/KodersLab/react-native-for-web)
 - [Read the docs](http://mattiamanzati.gitbooks.io/react-native-for-web/content/)

### WARNING!
This package is in beta version! API will not change (as we are emulating the react-native ones) but lots of components or properties could be missing at the moment.
We encourage you to help us by reporting those errors or PR implementation of the missing ones! :D

### What limitations?
Since it is all plain JavaScript, any native binary module won't be supported.
By the way we are planning to provide an extra folder that will contains polyfills and workaround for the exposed api of some of these modules.

### Check out the examples!
- [Sample App](http://koderslab.github.io/react-native-for-web/examples/SampleApp/)
- [TicTacToe](http://koderslab.github.io/react-native-for-web/examples/TicTacToe/)
- [UIExplorer](http://koderslab.github.io/react-native-for-web/examples/UIExplorer/)

NOTE: The main UIExplorer app has been changed since the official UIExplorer app includes native binary components and non supported components at the moment.

### How can i install this?
- Move into your react-native project folder and install react-native-for-web
```
npm install react-native-for-web
```
- Setup a webpack.config.js file for your project
- Inside your webpack configuration, alias the react-native package to the react-native-for-web package, and setup the external for the image loader.
```javascript
{
  // other webpack config
  resolve: {
    alias: {
      "react-native": "react-native-for-web"
    }
  }
  // setup the macro to resolve require("image!...")
  externals: [
    require("react-native-for-web/src/macro/image")
  ],
}
```
- Run webpack
- Create an HTML document, with a div with an id="app" including the bundled webpack script and linking the css stylesheet node_modules/react-native-for-web/style.css
- Report any error to let us improve and help you! :D

### Building the library
Move into the package folder and run in your terminal:
```
npm run build
```