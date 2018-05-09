import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView, ScrollView } from 'react-native';

import {
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import {
  Text,
} from 'react-native-elements';
import TopHeader from '../top-header-view';
import colorScheme from '../../config/colors';

import {
    fetchVesselFromIMO
} from '../../actions';

import ships from '../../assets/ships';

import MapView from 'react-native-maps';

class VesselTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            extraInfo: undefined,
        };
    }
    

  render(){
    return(
 /*       
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Monkeys</Text>
        </View>*/
        <View style={styles.container}>
              <MapView
                style={styles.map}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}>
              </MapView>  
              </View>
              );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.backgroundColor,
  },
  pictureContainer: {
    backgroundColor: colorScheme.backgroundColor,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  headerContainer: {
    backgroundColor: colorScheme.primaryContainerColor,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  headerText: {
    textAlign: 'center',
    color: colorScheme.quaternaryTextColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: colorScheme.primaryContainerColor,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    borderRadius: 5,
  },
  infoText: {
    fontSize: 14,
    color: colorScheme.quaternaryTextColor,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

function mapStateToProps(state) {
    return {
        selectedPortCall: state.portCalls.selectedPortCall,
        vessel: state.portCalls.vessel,
        extendedVessel: state.vessel.vessel,
    }
}

export default connect(mapStateToProps, {
    fetchVesselFromIMO,
})(VesselTest);