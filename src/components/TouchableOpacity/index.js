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
    this.touchable.on('pressstart', this.onMouseDown);
    this.touchable.on('pressend', this.onMouseUp);
    this.touchable.on('presscancel', this.onMouseUp);
  }

  componentWillUnmount(){
    // if no touchable instance exists, return
    if(!this.touchable) return;
    // unbind touchable events
    this.touchable.off('pressstart', this.onMouseDown);
    this.touchable.off('pressend', this.onMouseUp);
    this.touchable.off('presscancel', this.onMouseUp);
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
      <View style={(Array.isArray(style) ? style : [style]).concat([{opacity: this.state.opacity}])}>
        {this.props.children}
      </View>
    </TouchableWithoutFeedback>;
  }
}

module.exports = TouchableOpacity;