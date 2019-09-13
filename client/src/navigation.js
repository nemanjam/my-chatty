import React from 'react';
import {Text, View, Button} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
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

const GroupsScreenStack = createStackNavigator({
  Chats: {
    screen: GroupsScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const SettingsScreenStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const TabNavigator = createBottomTabNavigator(
  {
    Chats: GroupsScreenStack,
    Settings: SettingsScreenStack,
  },
  {
    initialRouteName: 'Settings',
  },
);

let StackNavigator = createStackNavigator({
  Main: {
    screen: TabNavigator,
    navigationOptions: ({navigation}) => {
      const routeName =
        navigation.state.routes[navigation.state.index]['routes'][
          navigation.state.routes[navigation.state.index]['index']
        ].routeName;
      // alert(JSON.stringify(routeName));
      return {
        title: routeName,
      };
    },
  },
  Messages: {
    screen: MessagesScreen,
  },
});

const AppTabNavigator = createAppContainer(StackNavigator);

export default AppTabNavigator;
