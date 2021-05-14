/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/**
 *
 * FavoritesPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Thumbnail from 'components/Thumbnail';
import Spin from 'components/LoadingIndicator';
import { Row, Col, Divider, Empty } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFavoritesPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function FavoritesPage() {
  useInjectReducer({ key: 'favoritesPage', reducer });
  useInjectSaga({ key: 'favoritesPage', saga });

  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const getStorageFavorites = JSON.parse(
    localStorage.getItem('favorites') || 0,
  );

  useEffect(() => {
    setLoading(true);
    if (getStorageFavorites !== 0) {
      setFavorites([...getStorageFavorites]);
    }
    const favoritesArray = [];
    getStorageFavorites &&
      getStorageFavorites.map((item, index) => {
        favoritesArray[index] = JSON.parse(
          localStorage.getItem(`favItem${item}`) || '',
        );
      });
    setFavoriteList(favoritesArray);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    const favoritesArray = [];
    getStorageFavorites &&
      getStorageFavorites.map((item, index) => {
        favoritesArray[index] = JSON.parse(
          localStorage.getItem(`favItem${item}`) || '',
        );
      });
    setFavoriteList(favoritesArray);
    setLoading(false);
  }, [favorites]);

  const addToFavorites = movie => {
    const favoriteArray = favorites;
    let addFav = true;
    favoriteArray &&
      favoriteArray.map((item, index) => {
        if (item === movie.id) {
          favoriteArray.splice(index, 1);
          addFav = false;
        }
      });
    if (addFav) {
      favoriteArray.push(movie.id);
    }
    setFavorites([...favoriteArray]);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    const storage = localStorage.getItem(`favItem${movie.id}` || 0);
    if (storage === null) {
      localStorage.setItem(`favItem${movie.id}`, JSON.stringify(movie));
    } else {
      localStorage.removeItem(`favItem${movie.id}`);
    }
  };

  return (
    <div>
      <Helmet>
        <title>FavoritesPage</title>
        <meta
          name="description"
          content="List of movies that are added to favotites"
        />
      </Helmet>
      <>
        <div className="main">
          {loading && <Spin />}
          {favoriteList && (
            <>
              <Divider orientation="left">Favorites</Divider>
              <Row gutter={16}>
                {favoriteList.length > 0 ? (
                  favoriteList.map(detail => (
                    <Col span={4} key={detail.id}>
                      <div>
                        <Thumbnail
                          detail={detail}
                          favorites={favorites}
                          addToFavorites={addToFavorites}
                        />
                      </div>
                    </Col>
                  ))
                ) : (
                  <Col span={12} offset={6}>
                    <div>
                      <Empty />
                    </div>
                  </Col>
                )}
              </Row>
            </>
          )}
        </div>
      </>
    </div>
  );
}

FavoritesPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  favoritesPage: makeSelectFavoritesPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FavoritesPage);
