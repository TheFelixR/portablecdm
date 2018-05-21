import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Swiper from 'react-native-swiper';

import Before from '../timeline-view-before';
import During from '../timeline-view';
import After from '../report-view';

class SwipeView extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} horizontal={true} loop={false} index={this.startIndex()}>
          <Before navigation={this.props.navigation}/>
          <During navigation={this.props.navigation}/>
          <After navigation={this.props.navigation}/>
        </Swiper>
      </View>
    );
  }

  startIndex = () => {     
    let { portCall } = this.props;
    switch(portCall.stage) {
      case 'PLANNED':
			case 'UNDER_WAY':
				return 0;
			case 'ARRIVED' :
			case 'BERTHED' :
				return 1;
			case 'SAILED':
			case 'ANCHORED' :
				return 2;
			default:
				return 2;
    }
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1
  },
  wrapper: {
  },
})

function mapStateToProps(state) {
  return {
    portCall: state.portCalls.selectedPortCall
  };
}

export default connect(mapStateToProps, {
})(SwipeView);


