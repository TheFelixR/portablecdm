import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions, 
  Image
} from 'react-native';

import {
    Text,
    Button,
    List,
    ListItem,
    Divider,
    Icon,
    Avatar,
} from 'react-native-elements';

import TopHeader from '../top-header-view';
import colorScheme from '../../config/colors';
import styles from '../../config/styles';



export default class TestView extends Component{
  render() {
    return(
     <View>
      <TopHeader title ='DevArea' firstPage navigation = {this.props.navigation} />
      <View style = {styles.containers.main}>
          <Text>Hello world bitch</Text>
      </View>
    </View>

    );
  }
 
}



