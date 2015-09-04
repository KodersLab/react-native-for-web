// this module is responsible for apply a px suffix if property is numeric
// and if the property name in react native is treated as a number but on
// the css version it actually needs a unit to be fully valid.

// the list of the properties that needs a px suffix
var propsThatNeedsPx = [
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderWidth',
    'borderTopWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'bottom',
    'height',
    'left',
    'margin',
    'marginBottom',
    'marginTop',
    'marginLeft',
    'marginRight',
    'marginHorizontal',
    'marginVertical',
    'padding',
    'paddingVertical',
    'paddingHorizontal',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'right',
    'shadowRadius',
    'top',
    'width',
    'fontSize',
    'lineHeight'
  ];

module.exports = (style) => {
	// create a new style object
	var suffixedStyle = {};
	// loop through properties
	var propsKeys = Object.keys(style);
	for(var i = 0; i < propsKeys.length; i++){
		// apply suffix if value is numeric
		suffixedStyle[propsKeys[i]] = propsThatNeedsPx.indexOf(propsKeys[i]) > -1 && typeof style[propsKeys[i]] === 'number' ?
			style[propsKeys[i]] + 'px' :
			style[propsKeys[i]];
	}
	
	// returns the new style object
	return suffixedStyle;
};