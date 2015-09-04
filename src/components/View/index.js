var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify')

class View extends React.Component{
	render(){
		// deconstruct props and extract the needed ones.
		var {style, ...props} = this.props;
		
		// return the component
		return <div {...props} style={browserifyStyle(style)}>{this.props.children}</div>;
	}
}

// export the component wrapped in radium
module.exports = Radium(View);