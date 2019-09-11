import React, {Component, useContext, useReducer} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {onError} from 'apollo-link-error';

import Context from './context';
import reducer from './reducer';

import AppTabNavigator from './navigation';

// const URL = 'http://10.0.2.2:8080';
// // const URL = 'http://192.168.0.184:8080';
// const httpLink = createHttpLink({uri: URL});

const errorLink = onError(errors => {
  console.log(errors);
});
const link = ApolloLink.from([errorLink /*,httpLink*/]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default App = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // <ApolloProvider client={client}>
    <Context.Provider value={{state, dispatch}}>
      <AppTabNavigator />
    </Context.Provider>
    // </ApolloProvider>
  );
};

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
