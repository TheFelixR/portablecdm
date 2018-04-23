import React, { Component } from 'react';

import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	ScrollView,
	Modal,
	Platform,
} from 'react-native';

import {
	Text,
	SearchBar,
	Button,
	List,
	ListItem,
	Icon,
} from 'react-native-elements';

import TopHeader from '../top-header-view';
import PortCall from '../portcall-list-view';
import colorScheme from '../../config/colors';

export default class NewStart extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			
			<View style={styles.container}>
			<TopHeader title="New Start" navigation={this.props.navigation} firstPage/>
			<ScrollView>
			<List>
			{
				<ListItem
				roundAvatar
				avatar={'../../assets/riseLogo.png'}
				key={123}
				title={'Gothia Boat'}
				titleStyle={styles.titleStyle}
				subtitle={'2018/01/01 13:37'}
				subtitleStyle={styles.subTitleStyle}
				/> 
			}
			{	
				<ListItem
				roundAvatar
				avatar={'../../assets/riseLogo.png'}
				key={124}
				title={'I am the Captain now!'}
				titleStyle={styles.titleStyle}
				subtitle={'2018/01/01 13:37'}
				subtitleStyle={styles.subTitleStyle}
				/>
			}
				</List>
				</ScrollView>
				</View>
			);
		}
	}
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colorScheme.primaryColor
		},
		// Search bar and filter button
		containerRow: {
			flexDirection: 'row',
			alignItems:'center',
			marginTop: 10,
			paddingLeft: 15,
			paddingRight: 0,
		},
		searchBarContainer: {
			backgroundColor: colorScheme.primaryColor,
			flex: 4,
			marginRight: 0,
			borderBottomWidth: 0,
			borderTopWidth: 0,
		},
		// Filter button container
		buttonContainer: {
			flex: 1,
			marginRight: 0,
			marginLeft: 0,
			alignSelf: 'stretch',
		},
		iconStyle: {
			alignSelf: 'stretch',
		},
		titleStyle: {
			color: colorScheme.quaternaryTextColor,
		},
		subTitleStyle: {
			color: colorScheme.tertiaryTextColor,
		},
	})