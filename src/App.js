import React from 'react';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CourtsSearch from './components/CourtsSearch';
import Court from './components/Court';

  //By default, Apollo Client uses Apollo Link's HttpLink to send GraphQL operations to a remote server over HTTP. Apollo Client takes care of creating this default link.
const httpLink = new HttpLink({
  uri: `https://basketball-court-rating-app.herokuapp.com/v1/graphql`,
});

// Create web sockets for subscriptions.
const wsLink = new WebSocketLink({
  uri: `ws://basketball-court-rating-app.herokuapp.com/v1/graphql`,
  options: {
    reconnect: true
  }
});

// splitLink method to split connections between subscriptions vs queries and mutations.
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

//The constructor for ApolloClient accepts an ApolloClientOptions object that supports the required and optional fields listed below. These fields make it easy to customize how Apollo works based on your application's needs. (https://www.apollographql.com/docs/react/api/apollo-client/#gatsby-focus-wrapper)
const client = new ApolloClient({
  //Caching is the term for storing reusable responses in order to make subsequent requests faster. ... Subsequent requests for cached content can then be fulfilled from a cache closer to the user instead of sending the request all the way back to the web server.
  cache: new InMemoryCache(),
  link: splitLink
});

const App = () => {
  return(
    <Router>
      <ApolloProvider client={client}>
        <Navigation />
        <Switch>
          <Route path="/court/:id" component={Court} />
          <Route path="/" component={CourtsSearch} />
        </Switch>
      </ApolloProvider>
    </Router>
  )
}

export default App;
