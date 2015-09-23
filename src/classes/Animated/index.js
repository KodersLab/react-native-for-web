var AnimatedImplementation = require('./lib/AnimatedImplementation');
var Image = require('../../components/Image');
var Text = require('../../components/Text');
var View = require('../../components/View');

module.exports = {
	...require('./lib/AnimatedWeb'),
	View: AnimatedImplementation.createAnimatedComponent(View),
	Image: AnimatedImplementation.createAnimatedComponent(Image),
	Text: AnimatedImplementation.createAnimatedComponent(Text)	
};