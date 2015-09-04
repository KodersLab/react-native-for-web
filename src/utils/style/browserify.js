// this module takes a react native style array/object and translates it into a browser friendly style
// atm this function does not apply vendor specific prefixes, and on the library this function is demanded
// to radium library, but on the future may be demanded to some other library and perform build time optimizations.

var mergeStyles = require('./mergeStyles');
var decoupleBidirectionalProps = require('./decoupleBidirectionalProps');
var solveConflicts = require('./solveConflicts');
var applyPxIfNeeded = require('./applyPxIfNeeded');

module.exports = (...styles) => {
	return applyPxIfNeeded(
		solveConflicts(
			decoupleBidirectionalProps(
				mergeStyles(styles)
			)
		)
	);
};