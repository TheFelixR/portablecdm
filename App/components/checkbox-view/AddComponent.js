import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Image,
} from 'react-native';

export default class AddComponent extends Component {
    constructor (props) {
        super(props);
        this.state = ({
            newTaskName: ''
        });
    }
    render() {
        return (
            <View style={styles.addContainer}>
                
                <TextInput style={styles.textInput}
                    placeholderTextColor='black'
                    placeholder='Enter task name'
                    onChangeText= {
                        (text) => {
                            this.setState({ newTaskName: text});
                        }
                    }/>

                    <TouchableHighlight
                        style={styles.touchableHighlight}
                        onPress={() => {
                            if (!this.state.newTaskName.trim()) { // if empty: do nothing
                                return;
                            }
                            // Call click event => use 'Container'
                            this.props.onClickAdd(this.state.newTaskName);

                        }}
                    >
                        <Image
                            style={styles.image}
                            source={require('../../assets/riseLogo.png')}
                        />
                    </TouchableHighlight>
                    

            </View>
        )
    }
}

const styles = StyleSheet.create({
    addContainer: {
        flex: 1,
        backgroundColor: 'tomato',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: 'white',
        height: 40,
        width: 200,
        margin: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        color: 'black'
    }, 
    touchableHighlight: {
        marginRight: 10,
    },
    image: {
        width: 40,
        height: 40
    }


});
