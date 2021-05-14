/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
/**
 *
 * SearchPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Thumbnail from 'components/Thumbnail';
import Spin from 'components/LoadingIndicator';
import { Row, Col, Divider, Input, Typography, Empty } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { fetchMoviesByQuery, setQuery } from './actions';
import makeSelectSearchPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function SearchPage(props) {
  useInjectReducer({ key: 'searchPage', reducer });
  useInjectSaga({ key: 'searchPage', saga });

  const [favorites, setFavorites] = useState([]);
  const getStorageFavorites = JSON.parse(
    localStorage.getItem('favorites') || 0,
  );

  const { Text } = Typography;
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const { searchPage, onSearchMovies, onSetQuery } = props;
  const { searchResult, loading, error, query } = searchPage;

  useEffect(() => {
    if (getStorageFavorites !== 0) {
      setFavorites([...getStorageFavorites]);
    }
  }, []);

  const onSearch = () => {
    onSearchMovies(query);
  }

  const onChangeValue = e => {
    const {value} = e.target;
    onSetQuery(value)
  }

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
        <title>SearchPage</title>
        <meta name="description" content="Search Page" />
      </Helmet>
      <Row justify="center">
        {loading && <Spin />}
        {!loading && error && <Text type="danger">{error}</Text>}
        <div className="main">
          <Search
            style={{marginTop: '25px'}}
            placeholder="input search text"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
            onChange={onChangeValue}
            value={query}
          />

          {!loading && searchResult && (
            <>
              <Divider orientation="left">Search Result</Divider>
              <Row gutter={16}>
                {searchResult.length > 0 ? (
                  searchResult.map(detail => (
                    <Col span={4} key={detail.id}>
                      <div>
                        <Thumbnail detail={detail} favorites={favorites} addToFavorites={addToFavorites} />
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
      </Row>
    </div>
  );
}

SearchPage.propTypes = {
  onSearchMovies: PropTypes.func,
  onSetQuery: PropTypes.func,
  searchPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  searchPage: makeSelectSearchPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSearchMovies: payload => dispatch(fetchMoviesByQuery(payload)),
    onSetQuery: payload => dispatch(setQuery(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SearchPage);
