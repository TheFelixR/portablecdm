import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	selectPortCall, 
	updatePortCalls 
} from '../../actions';

import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Alert
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

class NewStart extends Component {

	componentWillMount() {
		this.loadPortCalls = this.loadPortCalls.bind(this);
		this.loadPortCalls()
				.then(this.props.bufferPortCalls);
	}

	loadPortCalls() {
		return this.props.updatePortCalls().then(() => {
				if(this.props.error.hasError) {
						navigate('Error');
				}
		});
	}
	
	render() {
		const { navigation, portCalls, selectPortCall } = this.props;
		const { navigate } = navigation;
		
		return (
			<View style={styles.container}>
			<TopHeader title="          Agent Start              " navigation={this.props.navigation} firstPage
			selectorIcon={{
				name: 'filter-list',
				color: colorScheme.primaryTextColor,
					onPress: () => navigate('FilterMenu'),
			}}/>
			<ScrollView>
			<List>
			{
				this.favoritePortCalls(portCalls).map( (portCall) => (
					<ListItem
						roundAvatar
						avatar={portCall.vessel.photoURL ? { uri: portCall.vessel.photoURL } : null}
						key={portCall.portCallId}
						title={portCall.vessel.name}
						badge={{ element: this.renderFavorites(portCall) }}
						titleStyle={styles.titleStyle}
						subtitleNumberOfLines={4}
						subtitle={this.getLastEvent(portCall) + '\n\n' +
							`StartTime : ${getDateTimeString(new Date(portCall.startTime))}`
						}
						subtitleStyle={styles.subTitleStyle}
						onPress={() => {
							selectPortCall(portCall);
							navigate(this.navigateStage(portCall));
						}}
						onLongPress={() => {
							this.navigateLongPress(portCall)
						}}
					/>
				))
			}
			</List>
			</ScrollView>
			</View>
		);
	}
	
	getLastEvent(portCall) {
		let info = `Last ${portCall.lastUpdatedTimeType}: ` + 
		getDateTimeString(new Date(portCall.lastUpdated)) + '\n' +
		portCall.lastUpdatedState.replace(/_/g,' ');
		return info;
	}
	
	navigateStage(portCall) {
		switch (portCall.stage) {
			case 'PLANNED':
			case 'UNDER_WAY':
				return 'TimeLineBefore';
			case 'ARRIVED' :
			case 'BERTHED' :
				//return 'Stage2View';
			case 'SAILED':
			case 'ANCHORED' :
				return 'Report';
			default:
				return 'TimeLine';
		}
	}
	
	navigateLongPress(portCall) {
		let { navigation, selectPortCall } = this.props;
		let { navigate } = navigation;
		return (
			Alert.alert(
				`Port Call for ${portCall.vessel.name}.`,
				`Choose view to navigate to below :`,
				[
					{
						text:'Show Report View',
						onPress: () => {
							selectPortCall(portCall);
							navigate('Report');
					}},
					{
						text:'Show TimeLine View',
						onPress: () => {
							selectPortCall(portCall);
							navigate('TimeLine');
					}},
					{
						text:'Show Map View',
						onPress: () => {
							selectPortCall(portCall);
							navigate('TimeLineBefore');
					}}
				]
			)
		)
	}
				
	renderFavorites(portCall) {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			{!!portCall.stage && <Text style={[styles.subTitleStyle, { fontSize: 11, marginLeft: 4 }]}>
			{portCall.stage.replace(/_/g, ' ')}
			</Text>}
			</View>
		);
	}
	
	isFavorite(portCall) {
		return this.props.favoritePortCalls.includes(portCall.portCallId) ||
		this.props.favoriteVessels.includes(portCall.vessel.imo);
	}
	
	sortFilters(a, b) {
		let { filters } = this.props;
		let invert = filters.order === 'ASCENDING';
		if (filters.sort_by === 'LAST_UPDATE') {
			if (a.lastUpdated > b.lastUpdated)
			return invert ? 1 : -1;
			else return invert ? -1 : 1;
		} else if (filters.sort_by === 'ARRIVAL_DATE') {
			if (a.startTime > b.startTime)
			return invert ? 1 : -1;
			else return invert ? -1 : 1;
		}
		return 0;
	}
	
	favoritePortCalls(portCalls) {
		return portCalls.filter(portCall => {
			if (this.isFavorite(portCall)) { return portCall; }
		}).sort((a, b) => this.sortFilters(a, b));
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
		error: state.error
	}
}

export default connect(mapStateToProps, {
	updatePortCalls,
	selectPortCall
})(NewStart);
