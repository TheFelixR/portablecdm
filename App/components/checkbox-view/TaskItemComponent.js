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
        this.state = {
            checked:true
        }
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

        return (
            <Swipeout left={deleteBtn} style={styles.swipeout}>
                <View style={styles.container}>
                    <Text style={styles.listItem}>
                        {this.props.taskName}
                    </Text>
                    <CheckBox value={this.state.checked} onChange={()=>this.setState({ checked: !this.state.checked })}/>
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
        flexDirection: 'row',
        alignItems: 'center'

    },
    listItem: {
        color: 'black',
        padding: 10,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 },
        alignItems: 'center'
        
    }

});
