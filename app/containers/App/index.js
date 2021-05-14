/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Layout from 'components/Layout';

import MovieListPage from 'containers/MovieListPage/Loadable';
import MovieDetailPage from 'containers/MovieDetailPage/Loadable';
import FavoritesPage from 'containers/FavoritesPage/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

const App = () => (
  <Switch>
    <Route path="/" component={MainRoute} />
    <GlobalStyle />
  </Switch>
);

const MainRoute = props => {
  const { location } = props;
  return (
    <Layout>
      <TransitionGroup className="transition-group" exit={false}>
        <CSSTransition
          key={location.pathname}
          timeout={{ enter: 200, exit: 100 }}
          classNames="fade"
        >
          <Switch location={location}>
            <Route exact path="/" component={MovieListPage} />
            <Route exact path="/home" component={MovieListPage} />
            <Route exact path="/detail/:id" component={MovieDetailPage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/favorites" component={FavoritesPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Layout>
  );
};

MainRoute.propTypes = {
  location: PropTypes.object,
};

export default App;
