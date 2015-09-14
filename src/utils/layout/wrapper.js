var React = require('react');
var {findDOMNode} = require('react-dom');
var LayoutManager = require('./manager');


// get element x, y
function getCumulativeOffset(obj) {
    var left, top;
    left = top = 0;
    if (obj.offsetParent) {
        do {
            left += obj.offsetLeft;
            top  += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return {
        x : left,
        y : top
    };
};

// this functions returns the x, y, width and height of a given dom node
function getElementLayout(element){
	var rect = getCumulativeOffset(element);
	return {
		x: rect.x,
		y: rect.y,
		width: element.offsetWidth,
		height: element.offsetHeight
	}
}

module.exports = (Component) => {
	class LayoutHandler extends React.Component{
		constructor(props){
			super(props);
			// propopulate state
			this.state = {};
			
			// autobinding
			this._handleRedraw = this._handleRedraw.bind(this);
		}
		
		// subscription to the layout handler
		componentWillMount(){
			LayoutManager.attach(this._handleRedraw);
		}
		
		componentWillUnmount(){
			LayoutManager.detach(this._handleRedraw);
		}
		
		// inform the layout handler of an update
		componentDidUpdate(){
			LayoutManager.deferUpdate();
		}
		
		_handleRedraw(){
			// get new layout
			var l = getElementLayout(findDOMNode(this.refs.main));
			// if something has changed
			if(this.state.x !== l.x || this.state.y !== l.y || this.state.width !== l.width || this.state.height !== l.height){
				// trigger the onLayout event
				if(this.props.onLayout) this.props.onLayout({nativeEvent: {layout: l}});
				// update the current state with new sizes
				this.setState(l);
			}
		}
			
		render(){
			// deconstruct
			var {children, onLayout, ...props} = this.props;
			// return the component wrapped
			return <Component ref='main' {...props}>{children}</Component>;
		}
	}
	
	return LayoutHandler;
}