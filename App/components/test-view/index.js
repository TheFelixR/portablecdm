import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TestView extends Component {
  render() {
    return (
      <View style={style.testStyle}>
        <Text style={style.testText}>Testing!</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  testStyle: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 200
  }, 
  testText: {
    fontSize: 18,
    color: 'white',
    textAlignVertical: 'bottom'
  }
});