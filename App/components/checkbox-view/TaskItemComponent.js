import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';

export default class TaskItemComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.touchableOpacity}
                    onPress = { () => {
                        //Call this action in a container
                    }}
                />
                <Text style={styles.listItem}>
                    {this.props.taskName}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        margin: 20,
        color: 'red'//this.props.completed == true ? 'darkgreen' : 'black'
    },
    touchableOpacity: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0, 
        right: 0
    }


});
