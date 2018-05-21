import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    FlatList,
    Alert
} from 'react-native';

import  TaskItemContainer from '../../containers/checkboxes/TaskItemContainer';

export default class TaskListComponent extends Component {

    render() {
        return (
            <FlatList 
            data={this.props.tasks}
            renderItem={({item, index}) => {
            return (
                        <TaskItemContainer {...item}>

                        </TaskItemContainer>
                    );     
                }}


        // WE probably should not add the taskName as key, since there will be duplicate fixes.
            keyExtractor={(item, index) => item.taskName}
            >
            </FlatList>
        )
    }
}
