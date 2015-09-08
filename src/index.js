var React = require('react');

// export the classes
React.StyleSheet = require('./classes/StyleSheet');
React.AppRegistry = require('./classes/AppRegistry');
React.PixelRatio = require('./classes/PixelRatio');
React.AsyncStorage = require('./classes/AsyncStorage');

// export the components
React.View = require('./components/View');
React.ScrollView = require('./components/ScrollView');
React.Image = require('./components/Image');
React.Text = require('./components/Text');
React.TextInput = require('./components/TextInput');
React.TouchableWithoutFeedback = require('./components/TouchableWithoutFeedback');
React.TouchableOpacity = require('./components/TouchableOpacity');
React.TouchableHighlight = require('./components/TouchableWithoutFeedback');

// TODO: consider using the spread operator to inject new classes?
module.exports = React;