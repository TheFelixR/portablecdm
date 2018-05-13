import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPortCall, addNewTask } from '../../actions';

import {
	View,
	Text,
	StyleSheet,
	CheckBox
} from 'react-native';

import {
	Button,
	List,
	ListItem,
	Icon,
} from 'react-native-elements';

import colorScheme from '../../config/colors';
import TopHeader from '../top-header-view';
import { getDateTimeString } from '../../util/timeservices';

import AddContainer from '../../containers/checkboxes/AddContainer';
import TaskListContainer from '../../containers/checkboxes/TaskListContainer';

class Checkboxes extends Component {

	render() {
		
		return (
			<View style={styles.container}>
				<TopHeader title="To do" 
					navigation={this.props.navigation} firstPage
				/>

				<AddContainer/>
				<TaskListContainer/>


			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorScheme.primaryContainerColor,
	},
})

function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps, {
})(Checkboxes);
