import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
	FlatList,
	TouchableWithoutFeedback,
	ListView,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
	Alert,
} from 'react-native'

import { 
	List, 
	ListItem, 
	Icon,
	Text,
	Divider
} from 'react-native-elements';

import TopHeader from '../top-header-view';

import { 
	fetchPortCallEvents,
	removeError 
} from '../../actions';

import { getDateTimeString } from '../../util/timeservices';
import colorScheme from '../../config/colors';

const timer = null;
const portCallId = null;

class Report extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}
	
	componentWillMount() {
		let portCallId = this.props.portCall.portCallId;
		timer = setInterval(() => this.loadOperations, 60000);
		
		this.loadOperations = this.loadOperations.bind(this);
		if (!!portCallId)
		this.loadOperations(portCallId);
	}
	
	loadOperations(portCallId) {
		this.props.fetchPortCallEvents(portCallId).then(() => {
			if(this.props.error.hasError) {
					this.props.navigation.navigate('Error');                   
			}
		}); 
	}
	
	componentWillUnmount() {
		clearInterval(timer);
	}
	
	render() {
		const { loading, operations, portCall, vessel, navigation } = this.props;
		const { navigate } = navigation;
		let { data } = this.state;
		
		if(!loading) data = operations;
		
		return(
			<View style={styles.container}>
			<TopHeader 
				title={`Report ${vessel.name}`}
				firstPage
				navigation={this.props.navigation} 
			/>
			<ScrollView>
			<List>
				<ListItem 
				  roundAvatar
					avatar={vessel.photoURL ? { uri: vessel.photoURL } : null}
					key={portCall.portCallId}
					title={
						`Vessel Name: ${vessel.name}\n` +
						`Start Time: ${getDateTimeString(new Date (portCall.startTime))}\n` +
						`Voyage Number: `}
					subtitleStyle={{fontSize:13}}
					subtitle={`${portCall.portCallId.replace('urn:mrn:stm:portcdm:port_call:', '')}`}
					titleNumberOfLines={3}
					titleStyle={styles.terminalStyle}
				/>
				<Divider 
					key={'div'}
					style={{ height: 10}}
				/>
			{
				data.map( (op) => {
					if(op.status === 'OK'  && op.startTimeType === 'ACTUAL')
						return (  //listitems for ACTUAL operation and all its non-dupe ACTUAL statements, ending in divider
							this.getOperationsItem(op, vessel, navigate)
								.concat(this.getStatementItems(op, navigate))
						);
				})	
			}
			</List>
			</ScrollView>
			</View>
		);
	}

	getOperationsItem(op, vessel, navigate) {
		return [
			<ListItem
				key={op.eventId}
				title={op.definitionId.replace(/_/g,' ')}
				titleStyle={styles.titleStyle}
				subtitle={	
					`AtArea: ${this.getLocName(op,vessel)}` +'\n'+
					//`ReportedBy: ${this.getReportedBy(op)}` +'\n'+
					`StartTime: ${getDateTimeString(new Date(op.startTime))}` +'\n'+
					`EndTime: ${getDateTimeString(new Date(op.endTime))}`}
				subtitleStyle={styles.subTitleStyle}
				subtitleNumberOfLines={5}
				onPress={() => {
					navigate('TimeLine');
				}}
			/>
		];
	}

	getStatementItems(op, navigate) {
		let { statements } = op;
		let listItems = [];
		let lastStatementDef = ['',''];
		for(var i in statements) {
			let statement = statements[i];
			tempDef = statement.reportedBy+statement.time;
			if(tempDef != lastStatementDef &&
				statement.timeType === 'ACTUAL') {
				listItems.push(
				<ListItem
					key={statement.messageId}
					title={statement.stateDefinition.replace(/_/g,' ')}
					titleStyle={styles.terminalStyle}
					subtitle={	
						`ReportedBy: ${statement.reportedBy
							.replace('urn:mrn:stm:user:legacy:','')}` +'\n'+
						`AtTime: ${getDateTimeString(new Date(statement.time))}`}
					subtitleStyle={styles.subTitleStyle}
					subtitleNumberOfLines={5}
					onPress={() => {
						navigate('TimeLine');
					}}
				/>);
				lastStatementDef = statement.reportedBy+statement.time; //remove dupes
			}
		}
		listItems.reverse().push( //reverse because statements[] order, adding divider
			<Divider 
				key={lastStatementDef}
				style={{ height: 10}}
			/>
		)
		return listItems;
	}

	getLocName(op,vessel) {
		let { atLocation } = op;
		if(!!atLocation) return atLocation.name;
		else return `Vessel, ${vessel.name}`;
	}

	getReportedBy(op) {
		let { statements } = op;
		for(var i in statements) {
			return statements[i].reportedBy.
			replace('urn:mrn:stm:user:legacy:','');
		}
	}
}

const styles = StyleSheet.create ({
	container: {
		flex: 1,
		backgroundColor: colorScheme.primaryColor
	},
	titleStyle: {
		color: colorScheme.quaternaryTextColor,
	},
	terminalStyle: {
		fontFamily: 'monospace',
		fontSize: 14,
		color: colorScheme.quaternaryTextColor,
	},
	subTitleStyle: {
		color: colorScheme.tertiaryTextColor,
	},
});

function mapStateToProps(state) {
	return {
		loading: state.portCalls.selectedPortCallIsLoading,
		operations: state.portCalls.selectedPortCallOperations,
		vessel: state.portCalls.vessel,
		portCall: state.portCalls.selectedPortCall,
		error: state.error,
	};
}

export default connect(mapStateToProps, {
	fetchPortCallEvents, 
	removeError
})(Report);