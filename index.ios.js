'use strict';

var LinkingIOS = require('LinkingIOS');
var qs = require('qs');
var React = require('react-native');
var {
  StyleSheet,
  AppRegistry,
  Component,
  View,
  Text
} = React;

class MyApplication extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this._processURL = this._processURL.bind(this);
  }

  componentDidMount() {
    var url = LinkingIOS.popInitialURL();
    if (url) {
      this._processURL({url});
    }

    LinkingIOS.addEventListener('url', this._processURL);
  }

  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._processURL);
  }

  _processURL(e) {
    var url = e.url.replace('myapplication://', '').split('?');
    var path = url[0];
    var params = url[1] ? qs.parse(url[1]) : null;
    // qs has some issues with the __proto__ prop and adds it to the params
    // we just remove it again
    delete params.__proto__;

    this.setState({
      path,
      params
    });
    // do something here based on `path` and `params`
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Path</Text>
        <Text>{this.state.path}</Text>
        <Text style={styles.header}>Params</Text>
        {this.state.params && Object.keys(this.state.params).map((param, i) => {
          return <Text key={i}>{param}: {this.state.params[param]}</Text>;
        })}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 30
  },
  header: {
    fontWeight: '700'
  }
});

AppRegistry.registerComponent('myapplication', () => MyApplication);
