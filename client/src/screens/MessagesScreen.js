import React, {Component} from 'react';
import {_, flowRight as compose} from 'lodash';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import {graphql} from 'react-apollo';

import Message from '../components/Message';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column',
  },
  loading: {
    justifyContent: 'center',
  },
});

const fakeData = () =>
  _.times(20, i => ({
    // every message will have a different color
    color: randomColor(),
    // every 5th message will look like it's from the current user
    isCurrentUser: i % 5 === 0,
    message: {
      id: i,
      createdAt: new Date().toISOString(),
      from: {
        username: `Username ${i}`,
      },
      text: `Message ${i}`,
    },
  }));

class MessagesScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.title,
    };
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  keyExtractor = item => item.message.id.toString();

  renderItem = ({item: {isCurrentUser, message, color}}) => (
    <Message color={color} isCurrentUser={isCurrentUser} message={message} />
  );

  render() {
    // render list of messages for group
    return (
      <View style={styles.container}>
        <FlatList
          data={fakeData()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={<View />}
        />
      </View>
    );
  }
}
MessagesScreen.propTypes = {
  group: PropTypes.shape({
    messages: PropTypes.array,
    users: PropTypes.array,
  }),
  loading: PropTypes.bool,
};

export default MessagesScreen;
