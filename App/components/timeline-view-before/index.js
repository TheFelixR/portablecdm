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
    WebView,
    Dimensions,
} from 'react-native'

import {
    List,
    ListItem,
    Icon,
    Text
} from 'react-native-elements';

import TopHeader from '../top-header-view';
import OperationView from '../timeline-view/sections/operationview';

import {
    fetchPortCallEvents,
    changeFetchReliability,
    removeError,
    toggleFavoritePortCall,
    toggleFavoriteVessel,
} from '../../actions';
import { getTimeDifferenceString, getDateTimeString } from '../../util/timeservices';
import colorScheme from '../../config/colors';



const timer = null;
const portCallId = null;

class TimeLineViewBefore extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(['row 1, row 2']),
            refreshing: false,
            showExpiredStates: false,
        }

        this.goToStateList = this.goToStateList.bind(this);
    }

    componentWillMount() {
        portCallId = this.props.portCallId;
        timer = setInterval(() => this.loadOperations, 60000);

        this.loadOperations = this.loadOperations.bind(this);
        if (!!portCallId)
            this.loadOperations();
    }

    loadOperations() {
        this.props.fetchPortCallEvents(portCallId).then(() => {
            if(this.props.error.hasError) {
                if(this.props.error.error.title == "RELIABILITY_FAIL") {
                    Alert.alert(
                        'Unable to fetch reliabilities!',
                        'It can easily be turned on or off in the settings. Would you like to turn it off now?',
                        [
                            {text: 'No', onPress: () => this.props.navigation.navigate('PortCalls'), style: 'cancel'},
                            {text: 'Yes', onPress: () => {
                                this.props.changeFetchReliability(false);
                                this.props.removeError();
                                this.loadOperations(); //Maybe dangerous?
                            }}
                        ],
                        {cancelable: false},
                    );
                } else {
                    this.props.navigation.navigate('Error');
                }
            }
        });
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    goToStateList = () => {
        this.props.navigation.navigate('FavoriteStates');
    }

    render() {
        const { loading, operations, vesselName, mmsi, etb } = this.props;
        const {params} = this.props.navigation.state;
        let { dataSource } = this.state;
        console.log(etb);
        const mapHeight = Dimensions.get('window').height;

        if(!loading) dataSource = dataSource.cloneWithRows(operations);

        return(

            <View style={{flex: 1, backgroundColor: colorScheme.primaryContainerColor}}>
                <TopHeader
                    title = 'Location'
                    firstPage
                    navigation={this.props.navigation}
                    rightIconFunction={this.goToStateList}
                    leftIcons={this.createFavoriteIcons()}
                    selectorIcon={this.createShowHideExpiredIcon()}/>
                <View
                    style={styles.headerContainer}
                >
                    <Text style={styles.headerText}>{vesselName}</Text>
                    {operations.reliability >= 0 &&
                        <Text style={styles.headerTitleText}><Text style={{fontWeight: 'bold'}}>Reliability: </Text>{operations.reliability}%</Text>
                    }
                </View>

                <Text style={styles.headerText2}>ETB: {getDateTimeString(new Date(etb))}</Text>

                <WebView
                source={{ html: this.createMap(mapHeight - 158,mmsi) }}
                />


            </View>
        );
    }

    createMap(height,mmsi) {
      return "<script type='text/javascript'>" +
             "width='99.9%';" +
             "height='" + height + "';"+
             "border='0';" +
             "shownames='false';" +
             //"latitude='37.4460';" +
             //"longitude='24.9467';" +
             //"zoom='6';" +
             "maptype='2';" +
             "trackvessel='" + mmsi.replace('urn:mrn:stm:vessel:MMSI:', '') + "';" +
             "fleet='0';" +
             "</script>" +
             "<script type='text/javascript' src='http://marinetraffic.com/js/embed.js'></script>";
    }

    createShowHideExpiredIcon() {
        return {
            name: this.state.showExpiredStates ? 'remove-red-eye' : 'visibility-off',
            color: 'white',
            onPress: () => this.setState({showExpiredStates: !this.state.showExpiredStates}),
        };
    }

    createFavoriteIcons() {

        const { portCallId, imo } = this.props;

        let showStar = this.props.favoritePortCalls.includes(portCallId);
        let showBoat = this.props.favoriteVessels.includes(imo);

        return {
            first: {
                name: 'star',
                color: showStar ? 'gold' : 'gray',
                onPress: () => {
                    this.props.toggleFavoritePortCall(portCallId);
                }
            },
            second: {
                name: 'directions-boat',
                color: showBoat ? 'lightblue' : 'gray',
                onPress: () => {
                    this.props.toggleFavoriteVessel(imo);
                }
            }
        }
    }
}


const styles = StyleSheet.create ({

    headerContainer: {
        backgroundColor: colorScheme.primaryColor,
        alignItems: 'center',

    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        color: colorScheme.primaryTextColor,
    },
    headerText2: {
      textAlign: 'center',
      color: colorScheme.quaternaryTextColor,
      fontSize: 24,
      fontWeight: 'bold',
    },
    headerTitleText: {
        textAlign: 'center',
        color: colorScheme.secondaryContainerColor,
        fontSize: 12,
   },
});



function mapStateToProps(state) {
    return {
        loading: state.portCalls.selectedPortCallIsLoading,
        operations: state.portCalls.selectedPortCallOperations,
        vesselName: state.portCalls.vessel.name,
        imo: state.portCalls.vessel.imo,
        mmsi: state.portCalls.vessel.mmsi,
        etb: state.portCalls.selectedPortCall.lastUpdated,
        portCallId: state.portCalls.selectedPortCall.portCallId,
        favoritePortCalls: state.favorites.portCalls,
        favoriteVessels: state.favorites.vessels,
        error: state.error,
        fetchReliability: state.settings.fetchReliability,
    };
}

export default connect(mapStateToProps, {
    changeFetchReliability,
    fetchPortCallEvents,
    removeError,
    toggleFavoritePortCall,
    toggleFavoriteVessel,
})(TimeLineViewBefore);
