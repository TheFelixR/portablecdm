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
            activerowkey : null,
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
                onPress: () => {  console.log('deleted!')               }
            }
        ]


        const swipesettings = {
            right : deleteBtn,
            onClose : (secID,rowID,direction) =>{
                if(this.state.activerowkey != null){
                    this.state.activerowkey = null;
                }
                this.setState
                console.log('onClose, active rowkey after setting : ' + this.activerowkey);
            },
            onOpen : (secID,rowID,direction) =>{
                if (this.state.activerowkey == null){
                    this.state.activerowkey = rowID;
                }
                console.log('onOpen, active  rowkey :' + this.state.activerowkey);
            },
            
            style : styles.swipeout,
        }

        return (
            <Swipeout {...swipesettings} >
                <View style={styles.container}>
                    <CheckBox checked={this.state.checked} onPress={()=> this.setState({checked: !this.state.checked})}/>
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
        flexDirection: 'row',
        alignItems: 'center'

    },
    listItem: {
        color: 'black',
        alignItems: 'right',
        padding: 10,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 },
        alignItems: 'center',
        fontSize:   10,
        fontWeight: 'bold'
     
        
    }

});
