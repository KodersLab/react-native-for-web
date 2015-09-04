var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/browserifyStyle');

class Image extends React.Component{
  constructor(){
    // default image state
    this.image = null;
    this.state = {
      pending: false,
      loaded: false,
      currentUri: null
    };
  }
  
  _loadImage(uri = null){
    // if there is a previous image, then detach the event handlers to avoid double occurence
    if(this.image){
      this.image.removeEventListener('load', this.onLoad.bind(this));
      this.image.removeEventListener('error', this.onError.bind(this));
      this.image = null;
    }
    // if null is passed, it was just a reset
    if(uri === null) return;
    // create a new image source
    this.image = new Image();
    this.image.src = uri;
    // attach the event listeners
    this.image.addEventListener('load', this.onLoad.bind(this));
    this.image.addEventListener('error', this.onError.bind(this));
  }
  
  _uriChanged(props){
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
  componentDidUnmount(){
    this._uriChanged(null);
  }
  
  // actual image rendering
  render(){
    // deconstruct supported properties
    var {source: {uri}, defaultSource, resizeMode, style, 
      onLoad, onLoadStart, onLoadEnd, onProgress, onError, ...props} = this.props;
      
    // default classNames
    var classNames = ['image'];

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