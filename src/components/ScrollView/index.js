var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify');
var View = require('../View');

class ScrollView extends React.Component{
  constructor(props){
    super(props);
    
    // autobinding
    this.onScroll = this.onScroll.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }
  
  onScroll(){
    // if there is a timeout, stop
    if(this.scrollTimeout) return;
    // deconstruct
    var {onScroll, scrollEventThrottle = 0} = this.props;
    // else, setup it
    this.scrollTimeout = setTimeout(this.handleOnScroll, scrollEventThrottle);
  }
  
  handleOnScroll(){
    // reset the timeout
    this.scrollTimeout = null;    
    // deconstruct
    var {onScroll, scrollEventThrottle = 0} = this.props;
    // if there is on scroll, call it
    if(onScroll) onScroll();
  }
  
  render(){
    // set of classNames
    var classNames = ['scroll-view'];

    // descructuring utility data
    var {horizontal, contentContainerStyle, style, children, onScroll, ...props} = this.props;

    // apply style to correct scroll direction
    classNames.push(horizontal ? 'horizontal' : 'vertical');

    // return the component, use a View as a wrapper
    return <div onScroll={this.onScroll} className={classNames.join(' ')} style={browserifyStyle(style)}>
      <View style={browserifyStyle(contentContainerStyle)}>
        {children}
      </View>
    </div>;
  }
}

module.exports = Radium(ScrollView);