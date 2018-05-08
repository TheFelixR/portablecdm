import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPortCall } from '../../actions';

import {
	View,
	Text,
	StyleSheet,
	ScrollView,
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

class Checkboxes extends Component {

	constructor(){
		super();
		this.state={
			dentist:false,
			book:false,
			medical:false
		}
	}

	render() {
		
		return (
			<View style={styles.container}>

				<TopHeader title="          Checkboxes              " navigation={this.props.navigation} firstPage/>
				<View style={{ flexDirection: 'row' }}>
					<CheckBox value={this.state.dentist} onChange={()=>this.setState({ dentist: !this.state.dentist })}/>
					<Text style={{marginTop: 5}}> Dentist</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<CheckBox value={this.state.medical} onChange={()=>this.setState({ medical: !this.state.medical })}/>
					<Text> Medical Assistance</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<CheckBox value={this.state.book} onChange={()=>this.setState({ book: !this.state.book })}/>
					<Text> Booking Departure</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorScheme.primaryColor
	},
	titleStyle: {
		color: colorScheme.quaternaryTextColor,
	},
	subTitleStyle: {
		color: colorScheme.tertiaryTextColor,
	},
})

function mapStateToProps(state) {
	return {
		portCalls: state.cache.portCalls,
		favoritePortCalls: state.favorites.portCalls,
		favoriteVessels: state.favorites.vessels,
		filters: state.filters,
		error: state.error,
	}
}

export default connect(mapStateToProps, {
	selectPortCall,
})(Checkboxes);
