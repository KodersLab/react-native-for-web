var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify');
var mergeStyles = require('../../utils/style/mergeStyles');

class Image extends React.Component{
  constructor(){
    super();
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
  
  _loadImage(uri = null){
    // if there is a previous image, then detach the event handlers to avoid double occurence
    if(this.image){
      this.image.onload = undefined;
      this.image.onerror = undefined;
      this.image = null;
    }
    // if null is passed, it was just a reset
    if(uri === null) return;
    // create a new image source
    this.image = new window.Image();
    // attach the event listeners
    this.image.onload = this.onLoad;
    this.image.onerror = this.onError;
    this.image.src = uri;
  }
  
  _uriChanged(props){
    // if source is null, pass
    if(props === null) return this._loadImage(null);
    // checks if uri changed
    var {source: {uri}} = props;
    if(uri == this.state.currentUri) return;
    // trigger the loadImage function for the new image
    this._loadImage(uri);
    // deconstruct the needed props
    var {onLoadStart, onProgress} = this.props;
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
  
  // on componentDidMount e componentDidUpdate, call the uriChanged, and on componentDidUnmount detach
  componentDidMount(){
    this._uriChanged(this.props);
  }
  componentDidUpdate(){
    this._uriChanged(this.props);
  }
  componentWillUnmount(){
    this._uriChanged(null);
  }
  
  // actual image rendering
  render(){
    // deconstruct supported properties
    var {source: {uri}, defaultSource, resizeMode, style, children, 
      onLoad, onLoadStart, onLoadEnd, onProgress, onError, ...props} = this.props;
      
    // default classNames
    var classNames = ['image'];
    
      
    // try to pick resizeMode from the style definition
    var mergedStyle = mergeStyles(style);
    if(!resizeMode && mergedStyle.resizeMode){
      var {resizeMode, ...style} = mergedStyle;
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

    return <div {...props} className={classNames.join(' ')} style={browserifyStyle({backgroundImage}, style)}>
      {children}
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