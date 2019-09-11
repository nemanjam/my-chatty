import React from 'react';
import {Text, View} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import GroupsScreen from './screens/GroupsScreen';
import MessagesScreen from './screens/MessagesScreen';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Chats: GroupsScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Settings',
  },
);

const StackNavigator = createStackNavigator(
  {
    Main: TabNavigator,
    Messages: MessagesScreen,
  },
  {
    mode: 'modal',
  },
);

const AppTabNavigator = createAppContainer(StackNavigator);

export default AppTabNavigator;
