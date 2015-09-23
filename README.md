React Native for Web
=======

A set of classes and react components to make work your react-native app in a browser. (with some limitations obviously)
 - [Slack channel on reactiflux!](https://reactiflux.slack.com/messages/react-native-for-web/details/)
 - [GitHub repo](https://github.com/KodersLab/react-native-for-web)
 - [Read the docs](http://mattiamanzati.gitbooks.io/react-native-for-web/content/)
 - [Supported components list](http://mattiamanzati.gitbooks.io/react-native-for-web/content/docs/supported_components_&_props.html)
 
### Why use react-native-for-web?
 - To **reuse your dumb components and your styles** in the web admin version of your app (you can them rewrite or extend them after, when you have spread time to spend on them and the deadline is passed)
 - To **target react-native unsupported platforms** with no code changes via cordova; smart tvs, windows phone, desktop apps, chromebook, firefox os, etc...
 - To have a **temporary non-iOS version for other platforms** of your app, and then refine and extend the generated views after the app deadline
 - For **low-budget projects with multiple platforms as target**, you can choose iOS as a "master platform" and roll out the other version as webapp, when the client will have funds, you can enanche them 
 - To **develop using non-OSX PCs**, like Windows or Linux, since the majority of the debug or coding error of your app will be in the data-controller layer or in view data binding
 - **Browsers are a more friendly environment** for standard apps that does'nt require too much mobile-device features

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

### WARNING!
This package is in beta version! API will not change (as we are emulating the react-native ones) but lots of components or properties could be missing at the moment.
We encourage you to help us by reporting those errors or PR implementation of the missing ones! :D

### Thanks
Thanks to the Facebook team for it's awesome React-Native framework!