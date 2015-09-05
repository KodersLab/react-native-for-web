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
  }

  // bind event handlers
  componentDidMount(){
    // create touchable instance
    if(!this.touchable){
      this.touchable = new Touchable(findDOMNode(this.refs.main));
    }
    // binds events
    this.touchable.on('touchstart', this.onMouseDown.bind(this));
    this.touchable.on('touchend', this.onMouseUp.bind(this));
    this.touchable.on('touchcancel', this.onMouseUp.bind(this));
  }

  componentWillUnmount(){
    // if no touchable instance exists, return
    if(!this.touchable) return;
    // unbind touchable events
    this.touchable.off('touchstart', this.onMouseDown.bind(this));
    this.touchable.off('touchend', this.onMouseUp.bind(this));
    this.touchable.off('touchcancel', this.onMouseUp.bind(this));
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