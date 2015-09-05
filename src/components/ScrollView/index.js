var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify');
var View = require('../View');

class ScrollView extends React.Component{
  render(){
    // set of classNames
    var classNames = ['scroll-view'];

    // descructuring utility data
    var {horizontal, contentContainerStyle, style, children, ...props} = this.props;

    // apply style to correct scroll direction
    classNames.push(horizontal ? 'horizontal' : 'vertical');

    // return the component, use a View as a wrapper
    return <div className={classNames.join(' ')} style={browserifyStyle(style)}>
      <View style={browserifyStyle(contentContainerStyle)}>
        {children}
      </View>
    </div>;
  }
}

module.exports = Radium(ScrollView);