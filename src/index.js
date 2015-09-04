var React = require('react');

// export the classes
React.StyleSheet = require('./classes/StyleSheet');
React.AppRegistry = require('./classes/AppRegistry');

// export the components
React.View = require('./components/View');
React.Text = require('./components/Text');

// TODO: consider using the spread operator to inject new classes?
module.exports = React;