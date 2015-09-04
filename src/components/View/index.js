var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify')

class View extends React.Component{
	render(){
		// deconstruct props and extract the needed ones.
		var {pointerEvents, style, ...props} = this.props;
		
		// classNames
		var classNames = ['view'];
		
		// if pointer events available, push them into the class
		if(pointerEvents) classNames.push('pointer-events-' + pointerEvents);
		
		// return the component
		return <div {...props} className={classNames.join(' ')} style={browserifyStyle(style)}>
			{this.props.children}
		</div>;
	}
}

// export the component wrapped in radium
module.exports = Radium(View);