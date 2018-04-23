import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
} from 'react-native-elements';

import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Alert,
} from 'react-native';

import TopHeader from '../top-header-view';
import colorScheme from '../../config/colors';

export default class TestView extends Component {

    constructor(props) {
        super(props);
        let nr = Math.floor(Math.random() * 7)
        this.state = {
            'names':['John', 'Jonatan', 'Oskar', 'David', 'Emil', 'Daniel', 'Bruno'],
            'nr': nr
        }
    }
    updateNr = () => {
        let nr = Math.floor(Math.random() * 7)
        this.setState({nr: nr})
     }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TopHeader title='Poco Loco' firstPage navigation={this.props.navigation} />    
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText} onPress={this.updateNr}>
                        HOLA SENIOR: {'\n'}
                        {'        '}{this.state.names[this.state.nr]}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorScheme.backgroundColor,
    },
    infoContainer: {
        flex:1,
        backgroundColor: 'black',
        justifyContent:'center',
        alignItems:'center'
    },
    infoText: {
        fontSize: 14,
        color: 'white',
        paddingTop: 50,
        paddingLeft: 20,
        fontWeight: 'bold',
        fontSize: 30
    }
})