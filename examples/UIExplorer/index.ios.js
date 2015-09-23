var React = require('react-native');
var {Text, View, ScrollView, TouchableOpacity, StyleSheet, AppRegistry} = React;

var EXAMPLES = [
  require('./examples/BorderExample'),
  require('./examples/ViewExample'),
  require('./examples/TextExample.ios'),
  require('./examples/ImageExample'),
  require('./examples/TouchableExample'),
  require('./examples/ScrollViewExample'),
  require('./examples/TextInputExample'),
  require('./examples/PickerIOSExample'),
  require('./examples/AsyncStorageExample'),
  require('./examples/PointerEventsExample'),
  require('./examples/LayoutExample'),
  require('./examples/LayoutEventsExample'),
  require('./examples/AnimatedExample')
];

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      example: null
    };
  }

  render(){
    // returns the component
    return this.state.example !== null? this.renderExample() : this.renderList();
  }

  // i'm doing an horrible thing... but in future this will be replaced by the official example source
  renderList(){
    var i = 0;
    var examples = EXAMPLES.map(example => {
      i++;
      return <TouchableOpacity key={i} onPress={() => this.setState({example})}>
        <View style={styles.button}>
          <Text style={styles.title}>{example.title}</Text>
          <Text style={styles.description}>{example.description}</Text>
        </View>
      </TouchableOpacity>;
    });
    return <ScrollView style={styles.expand}>{examples}</ScrollView>;
  }

  // renders the current example
  renderExample(){
    var {example: {title, description, examples}} = this.state;
    var examplesElements = [];
    
    if(!examples) examples = [ {render: () => <this.state.example />} ];

    for(var i = 0; i < examples.length; i++){
      var example = examples[i];
      examplesElements.push(<View key={i} style={styles.example}>
        <Text style={styles.title}>{example.title}</Text>
        <Text style={styles.description}>{example.description}</Text>
        <View style={styles.workspace}>{example.render()}</View>
      </View>);
    }

    return <View style={styles.expand}>
      <TouchableOpacity onPress={() => this.setState({example: null})}>
        <View style={styles.header}>
          <Text style={[styles.white, styles.title]}>{title}</Text>
          <Text style={[styles.white, styles.description]}>{description}</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.expand}>
        {examplesElements}
      </ScrollView>
    </View>;
  }
}

var styles = StyleSheet.create({
  header: {
    backgroundColor: '#2980b9',
    padding: 15
  },
  white: {
    color: '#ffffff'
  },
  expand: {
    flex: 1
  },
  button: {
    padding: 15
  },
  workspace: {
    padding: 15
  },
  example: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('uiexplorer', () => App)
