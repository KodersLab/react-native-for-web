var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify')

class PickerIOS extends React.Component{
	
	constructor(props){
		super(props);
		
		// bind the _onChange
		this._onChange = this._onChange.bind(this);
		
		// default state
		this.state = this._stateFromProps(props);
	}
	
	// props changed... maybe new items incoming?
	componentWillReceiveProps(nextProps) {
		this.setState(this._stateFromProps(nextProps));
	}
	
	// handles current items
	_stateFromProps(props = {}) {
		// pick the childrens
		var {children = []} = props;
		var items = [];
		
		React.Children.forEach(children, function (child, index) {
			items.push({value: child.props.value, label: child.props.label});
		});
		return {items};
	}
		
	// handles the call for the change events
	_onChange(event) {
		if (this.props.onChange) {
			this.props.onChange({nativeEvent: {newValue: event.target.value}});
		}
		if (this.props.onValueChange) {
			this.props.onValueChange(event.target.value);
		}
	}
	
	render(){
		// deconstruct props and extract the needed ones.
		var {onValueChange, selectedValue, style, children, ...props} = this.props;
		
		// classNames
		var classNames = ['picker-ios'];
		
		// create the options
		var {items = []} = this.state;
		var options = [];
		for(var i = 0; i < items.length; i++){
			options.push(<option value={items[i].value} key={i}>{items[i].label}</option>);
		}
		
		// return the component
		return <select {...props} value={selectedValue} onChange={this._onChange} className={classNames.join(' ')} style={browserifyStyle(style)}>
			{options}
		</select>;
	}
}

// export the component wrapped in radium
PickerIOS = Radium(PickerIOS);

// the picker item
class PickerIOSItem extends React.Component{
	// this component is only a placeholder
	render(){
		return null;
	}
}

// Append the PickerIOS.Item
PickerIOS.Item = PickerIOSItem;

// export the component
module.exports = PickerIOS;