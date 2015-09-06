// This module is responsible for merging an array of nullish,
// styles or array of styles into a single plain object,
// this way we could even optimize the outgoing css

function mergeStyles(styles) {
	// if given is not an array, make it so
	styles = Array.isArray(styles) ? styles : [styles];
	
	// by default, return an empty object.
	var mergedStyle = {};
	
	// loop through styles
	for(var i = 0; i < styles.length; i++){
		// get current style
		var style = styles[i];
		// if style is nullish, continue the loop to the next one
		if(!style) continue;
		// if is array, flatten down
		if(Array.isArray(style)) style = mergeStyles(style);
		// merge into the merged one
		mergedStyle = {
			...mergedStyle,
			...style
		};
	}
	
	// return the styles as a new single object! :D
	return mergedStyle;
}

module.exports = mergeStyles;