import React, {Component} from 'react';
import {_, flowRight as compose} from 'lodash';
import PropTypes from 'prop-types';

import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  groupName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
});

// create fake data to populate our ListView
const fakeData = () =>
  _.times(20, i => ({
    id: i,
    name: `Group ${i}`,
  }));

class Group extends Component {
  constructor(props) {
    super(props);
    this.goToMessages = this.props.goToMessages.bind(this, this.props.group);
  }

  render() {
    const {
      group: {id, name},
    } = this.props;

    return (
      <TouchableHighlight key={id} onPress={this.goToMessages}>
        <View style={styles.groupContainer}>
          <Text style={styles.groupName}>{name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

Group.propTypes = {
  goToMessages: PropTypes.func.isRequired,
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

class GroupsScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  constructor(props) {
    super(props);
    this.goToMessages = this.goToMessages.bind(this);
  }

  componentDidMount() {}

  goToMessages(group) {
    const {navigate} = this.props.navigation;
    navigate('Messages', {groupId: group.id, title: group.name});
  }

  renderItem = ({item}) => (
    <Group group={item} goToMessages={this.goToMessages} />
  );

  keyExtractor = item => item.id.toString();

  render() {
    // console.log(this.props);

    // render list of groups for user
    return (
      <View style={styles.container}>
        <FlatList
          data={fakeData()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
/*
Groups.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  loading: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
};
*/

export default GroupsScreen;
