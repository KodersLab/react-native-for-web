// this module is responsible for decoupling bidirectional props.
// this means that props like paddingVertical and paddingHorizontal
// will be translated in it's correlate version on top/bottom and left/right

// Property that has Vertical and Horizontal properties that does'nt exists on the web
var doubleDirectionProps = {
  paddingVertical: ['paddingTop', 'paddingBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  marginHorizontal: ['marginLeft', 'marginRight']
};
  
// given a style and a direction, returns the style that should be applied to emulate it
function decoupleStyleProp(prop, value){
  // create a new object to be returned
  var returnedStyle = {};
  // check if property supports double
  if(doubleDirectionProps.hasOwnProperty(prop)){
    // loop trough prop to assign to emulate the prop
    var emulateProps = doubleDirectionProps[prop];
    for(var i = 0; i < emulateProps.length; i++){
      // set the value for the emulated property
      returnedStyle[emulateProps[i]] = value;
    }
  }else{
    // this is not a double direction prop
    returnedStyle[prop] = value;
  }
  // return the style
  return returnedStyle;
}

module.exports = (style) => {
	// create a new style object
	var decoupledStyle = {};
	// loop through properties
	var propsKeys = Object.keys(style);
	for(var i = 0; i < propsKeys.length; i++){
		// bump into decoupled
    decoupledStyle = {
      ...decoupledStyle,
      ...decoupleStyleProp(propsKeys[i], style[propsKeys[i]])
    };
	}
	
	// returns the new style object
	return decoupledStyle;
};