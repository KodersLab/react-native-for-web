var React = require('react');
var {findDOMNode} = require('react-dom');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify');
var Touchable = require('../../utils/events/Touchable');

class TouchableWithoutFeedback extends React.Component{
  constructor(props){
    super(props);
    // autobinding
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  onMouseDown(e){
    // handle onPressIn
    var {delayPressIn = 0, onPressIn = false, delayLongPress = 500, onLongPress = false} = this.props;
    // there is no press in event, so do nothing
    if(!onPressIn) return;
    // call the event after a delay
    this.delayPressIn = setTimeout(() => {
      onPressIn(e);
      // setup the delay for a long press
      this.delayLongPress = setTimeout(() => onLongPress(e), delayLongPress);
    }, delayPressIn);
  }


  onMouseUp(e){
    // handle onPressOut
    var {delayPressOut = 0, onPressOut = false, onPress} = this.props;
    // call the event after a delay
    setTimeout(() => {
      // handle onPressOut first
      if(onPressOut) onPressOut(e);
      // handle the onPress event passed as a prop
      if(onPress) onPress(e);
    }, delayPressOut);
    this.reset();
  }
  
  reset(){
    // if there was a delay for press in, clear it
    if(this.delayPressIn){
      clearTimeout(this.delayPressIn);
      this.delayPressIn = null;
    }
    // if there was a delay for a long press, clear it
    if(this.delayLongPress){
      clearTimeout(this.delayLongPress);
      this.delayLongPress = null;
    }
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
    this.touchable.on('presscancel', this.reset);
  }

  componentWillUnmount(){
    // if no touchable instance exists, return
    if(!this.touchable) return;
    // unbind touchable events
    this.touchable.off('pressstart', this.onMouseDown);
    this.touchable.off('pressend', this.onMouseUp);
    this.touchable.off('presscancel', this.reset);
    this.touchable.destroy();
  }

  render(){
    // deconstruct from the props
    var {children} = this.props;
    
    // child style
    if(children){
      var {style} = children.props || {};
    }

    // returns the component
    return React.cloneElement(children, {
      ref: 'main',
      style: [styles.main].concat(Array.isArray(style) ? style : [style])
    });
  }
}

var styles = {
  main: {
    cursor: 'pointer',
    userSelect: 'none'
  }
};

module.exports = Radium(TouchableWithoutFeedback);