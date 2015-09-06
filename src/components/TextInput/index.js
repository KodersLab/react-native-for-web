var React = require('react');
var Radium = require('radium');
var browserifyStyle = require('../../utils/style/browserify');

class TextInput extends React.Component{
  // onChange and onChangeText support
  onChange(e){
    if(this.props.onChangeText) this.props.onChangeText(e.target.value);
    if(this.props.onChange) this.props.onChange({nativeEvent: {text: e.target.value}});
  }

  // onFocus support
  onFocus(e){
    if(this.props.onFocus) this.props.onFocus(e);
  }

  // onBlur support
  onBlur(e){
    if(this.props.onBlur) this.props.onBlur(e);
  }
  
  componentDidMount(){
    // if wanted, do autofocus
    if(this.props.autoFocus) this.refs.main.focus();
  }

  render(){
    // by default, use a input[text]
    var tagName = 'input';
    var type = 'text';

    // copy over the same props to the new props for the input
    var {defaultValue, value, placeholder, multiline, secureTextEntry, 
		autoFocus, textAlign, style, children,
		onChange, onBlur, onFocus, onChangeText, ...props} = this.props;

    // init the classNames
    var classNames = ['text-input'];

    // handle the textAlign
    if(textAlign) classNames.push('text-align-' + textAlign);

    // If multiline, convert to a textarea
    if(multiline) tagName = 'textarea';

    // if needs password-like, convert to password field.
	// TODO: multiline password-like inputs?
    if(secureTextEntry && !multiline){
      type = 'password';
      tagName = 'input'; 
    }

    // return the input
    return React.createElement(tagName, {
      ref: 'main',
      className: classNames.join(' '),

      type,
      value,
      defaultValue,
      placeholder,
      style: browserifyStyle(style),

      onChange: (e) => this.onChange(e),
      onFocus: (e) => this.onFocus(e),
      onBlur: (e) => this.onBlur(e)
    }, null);
  }
}

module.exports = Radium(TextInput);