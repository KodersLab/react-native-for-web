// this module takes a react native style array/object and translates it into a browser friendly style
// atm this function does not apply vendor specific prefixes, and on the library this function is demanded
// to radium library, but on the future may be demanded to some other library and perform build time optimizations.

var mergeStyles = require('./mergeStyles');
var decoupleBidirectionalProps = require('./decoupleBidirectionalProps');
var solveConflicts = require('./solveConflicts');
var applyPxIfNeeded = require('./applyPxIfNeeded');
var omitStrangeProps = require('./omitStrangeProps');

function browserifyStyle(style){
	// if it is nullish, skip and return
	if(!style) return style;
	// if it is an array, recurse it.
	if(Array.isArray(style)) return style.map((item) => browserifyStyle(item));
	// else, browserify the single item
	return applyPxIfNeeded(
		solveConflicts(
			decoupleBidirectionalProps(
				omitStrangeProps(
					style
				)
			)
		)
	);
}

module.exports = (...styles) => {
	return mergeStyles(
		browserifyStyle(styles)
	);
};