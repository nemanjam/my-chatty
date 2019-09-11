import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {ApolloProvider} from 'react-apollo';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createHttpLink} from 'apollo-link-http';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider as ReduxProvider} from 'react-redux';
import {ReduxCache, apolloReducer} from 'apollo-cache-redux';
import ReduxLink from 'apollo-link-redux';
import {onError} from 'apollo-link-error';

import AppWithNavigationState, {
  navigationReducer,
  navigationMiddleware,
} from './navigation';

const URL = 'http://10.0.2.2:8080';
// const URL = 'http://192.168.0.184:8080'; // set your comp's url here

const store = createStore(
  combineReducers({
    apollo: apolloReducer,
    nav: navigationReducer,
  }),
  {},
  // initial state
  composeWithDevTools(applyMiddleware(navigationMiddleware)),
);

const cache = new ReduxCache({store});

const reduxLink = new ReduxLink(store);
const errorLink = onError(errors => {
  console.log(errors);
});
const httpLink = createHttpLink({uri: URL});

const link = ApolloLink.from([reduxLink, errorLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache,
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>
          <AppWithNavigationState />
        </ReduxProvider>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  instructions: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'blue',
  },
});
