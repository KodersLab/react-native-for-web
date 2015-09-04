// This module is responsible for merging an array of nullish,
// styles or array of styles into a single plain object,
// this way we could even optimize the outgoing css
module.exports = (styles) => {
	// by default, return an empty object.
	var mergedStyle = {};
	
	// loop through styles
	for(var i = 0; i < styles.length; i++){
		// get current style
		var style = styles[i];
		// if style is nullish, continue the loop to the next one
		if(!style) continue;
		// merge into the merged one
		mergedStyle = {
			...mergedStyle,
			...style
		};
	}
	
	// return the styles as a new single object! :D
	return mergedStyle;
};