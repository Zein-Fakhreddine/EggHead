import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { getColor } from '../config'

export default class NavigationTab extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <View style={styles.tabs}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>MP</Text>
        </View>

        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              <Icon
                name={tab}
                size={30}
                color={this.props.activeTab === i ?
                  getColor('#ffffff') : getColor('rgba(255,255,255,.4)')}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

}

var tabStyles = {}
if (Platform.OS === "ios") {
  tabStyles = {
    height: 70, 
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: getColor('googleBlue500'),
    elevation: 5
  }
} else {
  tabStyles = {
    height: 50,
    flexDirection: 'row',
    backgroundColor: getColor('googleBlue500'),
    elevation: 5
  }
}

const styles = StyleSheet.create({
  tabs: tabStyles,
  titleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20
  },
  title: {
    fontFamily: 'Courier',
    fontSize: 30,
    color: '#ffffff'
  },
  tab: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
