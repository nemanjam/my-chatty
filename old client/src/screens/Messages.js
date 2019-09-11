import React, {Component} from 'react';
import {_, flowRight as compose} from 'lodash';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import {graphql} from 'react-apollo';

import Message from '../components/Message';
import GROUP_QUERY from '../graphql/GroupQuery';

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

class Messages extends Component {
  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      title: state.params.title,
    };
  };

  constructor(props) {
    super(props);
    const usernameColors = {};
    if (props.group && props.group.users) {
      props.group.users.forEach(user => {
        usernameColors[user.username] = randomColor();
      });
    }
    this.state = {
      usernameColors,
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const usernameColors = {};
    // check for new messages
    if (nextProps.group) {
      if (nextProps.group.users) {
        // apply a color to each user
        nextProps.group.users.forEach(user => {
          usernameColors[user.username] =
            this.state.usernameColors[user.username] || randomColor();
        });
      }
      this.setState({
        usernameColors,
      });
    }
  }

  keyExtractor = item => item.message.id.toString();

  renderItem = ({item: message}) => (
    <Message
      color={this.state.usernameColors[message.from.username]}
      isCurrentUser={message.from.id === 1} // for now until we implement auth
      message={message}
    />
  );

  render() {
    const {loading, group} = this.props;

    // render loading placeholder while we fetch messages
    if (loading && !group) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }

    // render list of messages for group
    return (
      <View style={styles.container}>
        <FlatList
          data={group.messages.slice().reverse()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={<View />}
        />
      </View>
    );
  }
}
Messages.propTypes = {
  group: PropTypes.shape({
    messages: PropTypes.array,
    users: PropTypes.array,
  }),
  loading: PropTypes.bool,
};

const groupQuery = graphql(GROUP_QUERY, {
  options: ownProps => ({
    variables: {
      groupId: ownProps.navigation.state.params.groupId,
    },
  }),
  props: ({data: {loading, group}}) => ({
    loading,
    group,
  }),
});

export default compose(groupQuery)(Messages);
