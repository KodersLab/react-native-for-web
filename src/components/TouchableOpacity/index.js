var React = require('react');
var TouchableWithoutFeedback = require('../TouchableWithoutFeedback');
var View = require('../View');
var Touchable = require('../../utils/events/Touchable');
var {findDOMNode} = require('react-dom');

class TouchableOpacity extends React.Component{
  constructor(){
    super();
    this.state = {
      opacity: 1
    };
    
    // autobinding
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  // bind event handlers
  componentDidMount(){
    // create touchable instance
    if(!this.touchable){
      this.touchable = new Touchable(findDOMNode(this.refs.main));
    }
    // binds events
    this.touchable.on('touchstart', this.onMouseDown);
    this.touchable.on('touchend', this.onMouseUp);
    this.touchable.on('touchcancel', this.onMouseUp);
  }

  componentWillUnmount(){
    // if no touchable instance exists, return
    if(!this.touchable) return;
    // unbind touchable events
    this.touchable.off('touchstart', this.onMouseDown);
    this.touchable.off('touchend', this.onMouseUp);
    this.touchable.off('touchcancel', this.onMouseUp);
    this.touchable.destroy();
  }

  onMouseUp(){
    this.setState({opacity: 1});
  }

  onMouseDown(){
    // deconstruct active opacity
    var {activeOpacity = 0.2} = this.props;
    // set the state
    this.setState({opacity: activeOpacity});
  }

  render(){
    // deconstruct style and other
    var {style, activeOpacity, ...props} = this.props;

    return <TouchableWithoutFeedback ref='main' {...props}>
      <View style={[{opacity: this.state.opacity}].concat(Array.isArray(style) ? style : [style])}>
        {this.props.children}
      </View>
    </TouchableWithoutFeedback>;
  }
}

module.exports = TouchableOpacity;