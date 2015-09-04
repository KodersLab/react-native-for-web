var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify')

class Text extends React.Component{
	render(){
		// deconstruct props and extract the needed ones.
		var {suppressHighlighting, style, ...props} = this.props;
		
		// classNames
		var classNames = ['text'];

		// handle suppress-highlighting if needed
		if(suppressHighlighting) classNames.push('suppress-highlighting');
		
		// return the component
		return <span {...props} className={classNames.join(' ')} style={browserifyStyle(style)}>
			{this.props.children}
		</span>;
	}
}

// export the component wrapped in radium
module.exports = Radium(Text);