import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';

import {
	View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class TaskItemComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        // Buttons
        let deleteBtn = [
            {
                text: 'X',
                backgroundColor:'red',
                color: 'white',
            }
        ]

        let completeBtn = [
            {
                text: '✓',
                backgroundColor:'green',
                color: 'white',
            }
        ]

        return (
            <Swipeout left={deleteBtn} right={completeBtn} style={styles.swipeout}>
                <View style={styles.container}>
                    <Text style={styles.listItem}>
                        {this.props.taskName}
                    </Text>
                </View>
            </Swipeout>
        )
    }
}

const styles = StyleSheet.create({
    swipeout: {
        backgroundColor: 'white',
        marginTop:10,
    },
    container: {
    },
    listItem: {
        color: 'black',
        padding: 10,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 }
    }

});
