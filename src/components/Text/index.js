var React = require('react');
var {findDOMNode} = require('react-dom');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify');
var Touchable = require('../../utils/events/Touchable');

class Text extends React.Component{
	
	constructor(){
		super();
		
		// autobind
		this.onMouseUp = this.onMouseUp.bind(this);
	}
	
	_createPressListener(props){
		// create press listener only if really needed
		if(props.onPress){
			// create touchable instance if it does not exists atm
			if(!this.touchable){
				this.touchable = new Touchable(findDOMNode(this.refs.main));
				
				// binds events
				this.touchable.on('touchend', this.onMouseUp);
			}
		}
	}
	
	// bind event handlers
	componentDidMount(){
		this._createPressListener(this.props);
	}
	
	componentWillReceiveProps(props){
		this._createPressListener(props);
	}
	
	componentWillUnmount(){
		// if no touchable instance exists, return
		if(!this.touchable) return;
		// unbind touchable events
		this.touchable.off('touchend', this.onMouseUp);
		this.touchable.destroy();
		this.touchable = null;
	}
	
	onMouseUp(e){
		if(this.props.onPress) this.props.onPress();
	}
	
	render(){
		// deconstruct props and extract the needed ones.
		var {suppressHighlighting, style, children, ...props} = this.props;
		
		// classNames
		var classNames = ['text'];

		// handle suppress-highlighting if needed
		if(suppressHighlighting) classNames.push('suppress-highlighting');
		
		// return the component
		return <span {...props} ref='main' className={classNames.join(' ')} style={browserifyStyle(style)}>
			{children}
		</span>;
	}
}

// export the component wrapped in radium
module.exports = Radium(Text);