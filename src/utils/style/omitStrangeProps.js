// this module loops through an array of styles, or an array of arrays, or nullish and omit declarations of
// a specified set of props that are not translable into css ones. (like resizeMode or tintColor, which are handled)
// by the Image component itself.

var stylesToOmit = ['tintColor', 'resizeMode'];

module.exports = (style) => {
	// create a new var for the exported style
	var omittedStyle = {};
	// loop through props
	for(var name in style){
		// copy over only the non omittable
		if(style.hasOwnProperty(name) && stylesToOmit.indexOf(name) === -1){
			omittedStyle[name] = style[name];
		}
	}
	// return the new style.
	return omittedStyle;
}