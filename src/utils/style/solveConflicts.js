// this function resolves properties conflicts, this means that style props
// like padding could exists while having a paddingBottom property.
// third party libraries like radium for inline-styles may not like this conflict
// so this function checks if there is a conflict and decouples the padding property
// in the remaining sub properties, resolving style conflicts.

// the list of the "may conflict" properties
var mayConflictProps = {
	padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
	margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
	borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
	borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
	borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius']
}

module.exports = (style) => {
	// create a new style object
	var solvedStyle = {};
	// loop through properties
	var propsKeys = Object.keys(style);
	for(var i = 0; i < propsKeys.length; i++){
		if(mayConflictProps.hasOwnProperty(propsKeys[i])){
			// translate props, atm we don't perform any check if it is actually needed...
			// just because it will be a waste of calculations
			var translateProps = mayConflictProps[propsKeys[i]];
			for(var j = 0; j < translateProps.length; j++){
				solvedStyle[translateProps[j]] = style[propsKeys[i]];
			}
		}else{
			// there is no conflict possible, so just pass the style prop
			solvedStyle[propsKeys[i]] = style[propsKeys[i]];
		}
	}

	// returns the new style object
	return solvedStyle;
};