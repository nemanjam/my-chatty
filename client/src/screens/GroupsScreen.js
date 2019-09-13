import React, {Component} from 'react';
import {_, flowRight as compose} from 'lodash';
import PropTypes from 'prop-types';

import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
  Button,
} from 'react-native';

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  groupTextContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 6,
  },
  groupText: {
    color: '#8c8c8c',
  },
  groupImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  groupTitleContainer: {
    flexDirection: 'row',
  },
  groupLastUpdated: {
    flex: 0.3,
    color: '#8c8c8c',
    fontSize: 11,
    textAlign: 'right',
  },
  groupUsername: {
    paddingVertical: 4,
  },
  header: {
    alignItems: 'flex-end',
    padding: 6,
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  warning: {
    textAlign: 'center',
    padding: 12,
  },
});

// format createdAt with moment
const formatCreatedAt = createdAt =>
  moment(createdAt).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: 'dddd',
    sameElse: 'DD/MM/YYYY',
  });

const Header = ({onPress}) => (
  <View style={styles.header}>
    <Button title={'New Group'} onPress={onPress} />
  </View>
);

// create fake data to populate our ListView
const fakeData = () =>
  _.times(20, i => ({
    id: i,
    name: `Group ${i}`,
    messages: {
      edges: [
        {
          node: {
            createdAt: new Date(),
            from: {username: `username ${i}`},
            text: `text ${i}`,
          },
        },
      ],
    },
  }));

class Group extends Component {
  constructor(props) {
    super(props);
    this.goToMessages = this.props.goToMessages.bind(this, this.props.group);
  }

  render() {
    const {
      group: {id, name, messages},
    } = this.props;

    return (
      <TouchableHighlight key={id} onPress={this.goToMessages}>
        <View style={styles.groupContainer}>
          <Image
            style={styles.groupImage}
            source={{
              uri: 'https://reactjs.org/logo-og.png',
            }}
          />
          <View style={styles.groupTextContainer}>
            <View style={styles.groupTitleContainer}>
              <Text style={styles.groupName}>{`${name}`}</Text>
              <Text style={styles.groupLastUpdated}>
                {messages.edges.length
                  ? formatCreatedAt(messages.edges[0].node.createdAt)
                  : ''}
              </Text>
            </View>
            <Text style={styles.groupUsername}>
              {messages.edges.length
                ? `${messages.edges[0].node.from.username}:`
                : ''}
            </Text>
            <Text style={styles.groupText} numberOfLines={1}>
              {messages.edges.length ? messages.edges[0].node.text : ''}
            </Text>
          </View>
          <Icon name="angle-right" size={24} color={'#8c8c8c'} />
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
    this.goToNewGroup = this.goToNewGroup.bind(this);
  }

  goToMessages(group) {
    const {navigate} = this.props.navigation;
    navigate('Messages', {groupId: group.id, title: group.name});
  }

  goToNewGroup() {
    const {navigate} = this.props.navigation;
    navigate('NewGroup');
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
          ListHeaderComponent={() => <Header onPress={this.goToNewGroup} />}
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
