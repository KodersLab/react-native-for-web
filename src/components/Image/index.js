var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify');
var mergeStyles = require('../../utils/style/mergeStyles');
var wrapLayout = require('../../utils/layout/wrapper');

class Image extends React.Component{
  constructor(props){
    super(props);
    // default image state
    this.image = null;
    this.state = {
      pending: false,
      loaded: false,
      currentUri: null
    };
    
    // autobinding
    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
  }
  
  // cancel an existing image being loaded
  _cancelLoadImage(){
    if(this.image){
      this.image.onload = null;
      this.image.onerror = null;
      this.image = null;
    }
  }
  
  _loadImage(uri){
    // if there is a previous image, then detach the event handlers to avoid double occurence
    this._cancelLoadImage();
    // create a new image source
    this.image = new window.Image();
    // attach the event listeners
    this.image.onload = this.onLoad;
    this.image.onerror = this.onError;
    this.image.src = uri;
  }
  
  _uriChanged(props){
    // if source is null, pass
    if(props === null) return this._cancelLoadImage();
    // checks if uri changed and return if not
    var {source: {uri}, onLoadStart, onProgress} = props;
    if(uri == this.state.currentUri) return;
    // trigger the loadImage function for the new image
    this._loadImage(uri);
    // triggers the onLoadStart
    if(onLoadStart) onLoadStart();
    // TODO: is there a on progress event?
    if(onProgress) onProgress({nativeEvent: {loaded: 0, total: 1}});
    // sets the new uri into the state
    this.setState({
        currentUri: uri,
        loading: true,
        pending: true
      });
  }
  
  onLoad(e){
    // loading has been successfull!
    var {onLoad, onLoadEnd} = this.props;
    // calls onLoad and onLoadEnd
    if(onLoad) onLoad();
    if(onLoadEnd) onLoadEnd();
    // sets the state
    this.setState({
        pending: false,
        loaded: true
      });
  }
  
  onError(e){
    // loading has failed!
    var {onError, onLoadEnd} = this.props;
    // calls event handlers
    if(onError) onError();
    if(onLoadEnd) onLoadEnd();
    // sets the state
    this.setState({
        pending: false,
        loaded: false
      });
  }
  
  // on componentDidMount e componentWillReceiveProps, call the uriChanged, and on componentDidUnmount detach
  componentDidMount(){
    this._uriChanged(this.props);
  }
  componentWillReceiveProps(props){
    this._uriChanged(props);
  }
  componentWillUnmount(){
    this._cancelLoadImage();
  }
  
  // actual image rendering
  render(){
    // deconstruct supported properties
    var {source: {uri}, defaultSource, resizeMode, capInsets, style, children, 
      onLoad, onLoadStart, onLoadEnd, onProgress, onError, ...props} = this.props;
      
    // default classNames
    var classNames = ['image'];
    
      
    // try to pick resizeMode from the style definition
    var mergedStyle = mergeStyles(style);
    if(!resizeMode && mergedStyle.resizeMode){
      var {resizeMode} = mergedStyle;
    }

    // get the props to be merged into style
    if(resizeMode) classNames.push('resize-mode-' + resizeMode);
    
    // switch between default background image and current one if it's loaded
    // TODO: this will trigger double image loading, one for the event triggers and one for the bg image
    //      maybe we should consider using some sort of "toDataUrl" of the image to avoid reloading,
    //      but this will consume a lot of resources, and maybe we should have an internal flag for that to happen.
    var defaultBackgroundImage = typeof defaultSource === 'undefined' ? 'none' : defaultSource.uri;
    var backgroundImage = typeof uri === 'undefined' || !this.state.loaded ? defaultBackgroundImage : 'url(' + uri + ')';

    // TODO: handle tintColor via canvas image manipulation if setted
    
    // WIP
    // if image is loaded and capInsets is set
    var insetEls = null;
    if(this.state.loaded && capInsets){
      insetEls = [
        <div key="tl" className="cap-insets-tl" style={{backgroundImage, width: capInsets.left, height: capInsets.top}} />,
        <div key="tr" className="cap-insets-tr" style={{backgroundImage, width: capInsets.right, height: capInsets.top}} />,
        <div key="bl" className="cap-insets-bl" style={{backgroundImage, width: capInsets.left, height: capInsets.bottom}} />,
        <div key="br" className="cap-insets-br" style={{backgroundImage, width: capInsets.right, height: capInsets.bottom}} />
      ]
    }

    return <div {...props} className={classNames.join(' ')} style={browserifyStyle({backgroundImage}, style)}>
      {insetEls}
      {children}
    </div>;
  }
}

Image = wrapLayout(Radium(Image));

Image.resizeMode = {
  cover: 'cover',
  contain: 'contain',
  stretch: 'stretch',
  none: 'none'
};

module.exports = Image;