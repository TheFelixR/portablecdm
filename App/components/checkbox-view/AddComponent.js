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

import {
    SearchBar,
		Icon,
} from 'react-native-elements';

import colorScheme from '../../config/colors';

export default class AddComponent extends Component {
    constructor (props) {
        super(props);
        this.state = ({
            newTaskName: '',
            initiated: false
        });
        console.log(this.props.tasks);
        if(!this.state.initiated){
            this.addCheckBox("Book tugboat");
            this.addCheckBox("Book pilot");
            this.addCheckBox("Book port");
            this.addCheckBox("Book slugboat");
            this.state.initiated = true;
            console.log(this.state.initiated);
        }



    }


    _onPressedHandler = () => {
        if (!this.state.newTaskName.trim()) { // if empty: do nothing
            return;
        }
        // Call click event => use 'Container', look at AddContainer for additional information.
        this.props.onClickAdd(this.state.newTaskName);
    }

    addCheckBox(name) {
        this.props.onClickAdd(name);
    }


    render() {
        return (
            <View style={styles.addContainer}>

                <SearchBar
                    containerStyle = {styles.searchBarContainer}
                    inputStyle = {{backgroundColor: colorScheme.primaryContainerColor}}
                    lightTheme
                    placeholderTextColor = {colorScheme.tertiaryTextColor}
                    placeholder='Enter task name'
                    onChangeText= { text => {this.setState({ newTaskName: text})}}
                    clearIcon
                />

                    <TouchableHighlight
                        style={styles.touchableHighlight}
                        onPress={this._onPressedHandler}
                        underlayColor={colorScheme.primaryColor}
                    >
                        <Icon
												name='add-circle'
					              size = {50}
					              underlayColor='transparent'
					              color= {colorScheme.primaryContainerColor}
                        />
                    </TouchableHighlight>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    addContainer: {
        backgroundColor: colorScheme.primaryColor,
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
    searchBarContainer: {
        backgroundColor: colorScheme.primaryColor,
        flex: 4,
        marginRight: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    touchableHighlight: {
        marginRight: 10,
    },
    image: {
        width: 40,
        height: 40
    }


});
