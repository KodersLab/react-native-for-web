var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify')

class Text extends React.Component{
	
	// bind event handlers
	componentDidMount(){
		// create touchable instance
		if(!this.touchable){
			this.touchable = new Touchable(findDOMNode(this.refs.main));
		}
		// binds events
		this.touchable.on('touchend', this.onMouseUp.bind(this));
	}
	
	componentWillUnmount(){
		// if no touchable instance exists, return
		if(!this.touchable) return;
		// unbind touchable events
		this.touchable.off('touchend', this.onMouseUp.bind(this));
		this.touchable.destroy();
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