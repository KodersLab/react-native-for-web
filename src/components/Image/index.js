var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/browserifyStyle');

class Image extends React.Component{
  render(){
    var {resizeMode, backgroundImage, source: {uri}, style, ...props} = this.props;

    var backgroundSize = typeof resizeMode === 'undefined' ? 'cover' : resizeMode;
    var backgroundImage = typeof uri === 'undefined' ? 'none' : 'url(' + uri + ')';

    var elementStyle = {
		backgroundSize,
    	backgroundImage
    };

    // TODO: handle onLoad and onError events
    // TODO: handle tintColor via canvas image manipulation

    return <div {...props} className="image" style={browserifyStyle(elementStyle, style)}>
      {props.children}
    </div>;
  }
}

Image = Radium(Image);

Image.resizeMode = {
  cover: 'cover',
  contain: 'contain',
  stretch: 'stretch'
};

module.exports = Image;