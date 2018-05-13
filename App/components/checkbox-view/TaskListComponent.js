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
            keyExtractor={(item, index) => item.taskName}
            >
            </FlatList>
        )
    }
}
