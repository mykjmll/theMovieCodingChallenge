/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/**
 *
 * MovieListPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Thumbnail from 'components/Thumbnail';
import Spin from 'components/LoadingIndicator';
import { Row, Col, Button, Typography, Divider, Tooltip } from 'antd';
import {
  StarFilled,
  StarOutlined,
  EyeOutlined,
  PlayCircleFilled,
} from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMovieListPage from './selectors';
import {
  fetchPopularList,
  fetchTopRatedList,
  fetchUpcomingList,
  fetchTopTodayById,
} from './actions';
import reducer from './reducer';
import saga from './saga';

import { StyledTop1Movie } from './StyledComponents';
import { forwardTo } from '../../helpers/forwardTo';

export function MovieListPage(props) {
  useInjectReducer({ key: 'movieListPage', reducer });
  useInjectSaga({ key: 'movieListPage', saga });

  const { Text, Title } = Typography;

  const {
    onLoadPopularMovieList,
    onLoadTopRatedMovieList,
    onLoadUpcomingMovieList,
    onLoadTrendingMovie,
    movieListPage,
  } = props;
  const [favorites, setFavorites] = useState([]);
  const getStorageFavorites = JSON.parse(
    localStorage.getItem('favorites') || 0,
  );

  useEffect(() => {
    onLoadPopularMovieList();
    onLoadTopRatedMovieList();
    onLoadUpcomingMovieList();
    onLoadTrendingMovie();
    if (getStorageFavorites !== 0) {
      setFavorites([...getStorageFavorites]);
    }
  }, []);

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

  const {
    loading,
    error,
    popularList,
    topRatedList,
    upcomingList,
    trending,
  } = movieListPage;

  return (
    <div>
      <Helmet>
        <title>MovieListPage</title>
        <meta
          name="description"
          content="List of popular, top-rated and upcoming movies."
        />
      </Helmet>
      <Row justify="center">
        {loading && <Spin />}
        {!loading && error && <Text type="danger">{error}</Text>}
        <>
          {!loading && trending && (
            <StyledTop1Movie src={trending.backdrop_path}>
              <div className="footer">
                <Title>{trending.title}</Title>
                <div className="subtitle">
                  #1 Trending Movie in the Philippines today
                </div>
                <Row gutter={16} justify="space-between">
                  <Col>
                    <Button
                      onClick={() => addToFavorites(trending)}
                      icon={
                        favorites.includes(trending.id) ? (
                          <StarFilled
                            style={{ color: '#fadb14', verticalAlign: '0.1em' }}
                          />
                        ) : (
                          <StarOutlined
                            style={{ color: '#fadb14', verticalAlign: '0.1em' }}
                          />
                        )
                      }
                    >
                      Add to Favorites
                    </Button>
                  </Col>
                  <Col>
                    <Tooltip title="coming soon">
                      <Button
                        disabled
                        icon={
                          <PlayCircleFilled
                            style={{ color: '#ff0000', verticalAlign: '0.1em' }}
                          />
                        }
                      >
                        Play
                      </Button>
                    </Tooltip>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => forwardTo(`/detail/${trending.id}`)}
                      icon={
                        <EyeOutlined
                          style={{ color: '#000000', verticalAlign: '0.1em' }}
                        />
                      }
                    >
                      Preview
                    </Button>
                  </Col>
                </Row>
              </div>
            </StyledTop1Movie>
          )}
          <div className="main">
            {!loading && popularList && (
              <>
                <Divider orientation="left">Popular</Divider>
                <Row gutter={16}>
                  {popularList &&
                    popularList.map(detail => (
                      <Col span={4} key={detail.id}>
                        <div>
                          <Thumbnail
                            detail={detail}
                            favorites={favorites}
                            addToFavorites={addToFavorites}
                          />
                        </div>
                      </Col>
                    ))}
                </Row>
              </>
            )}
            {!loading && topRatedList && (
              <>
                <Divider orientation="left">Top Rated</Divider>
                <Row gutter={16}>
                  {topRatedList &&
                    topRatedList.map(detail => (
                      <Col span={4} key={detail.id}>
                        <div>
                          <Thumbnail
                            detail={detail}
                            favorites={favorites}
                            addToFavorites={addToFavorites}
                          />
                        </div>
                      </Col>
                    ))}
                </Row>
              </>
            )}
            {!loading && upcomingList && (
              <>
                <Divider orientation="left">Upcoming</Divider>
                <Row gutter={16}>
                  {upcomingList &&
                    upcomingList.map(detail => (
                      <Col span={4} key={detail.id}>
                        <div>
                          <Thumbnail
                            detail={detail}
                            favorites={favorites}
                            addToFavorites={addToFavorites}
                          />
                        </div>
                      </Col>
                    ))}
                </Row>
              </>
            )}
          </div>
        </>
      </Row>
    </div>
  );
}

MovieListPage.propTypes = {
  onLoadPopularMovieList: PropTypes.func,
  onLoadTopRatedMovieList: PropTypes.func,
  onLoadUpcomingMovieList: PropTypes.func,
  onLoadTrendingMovie: PropTypes.func,
  movieListPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  movieListPage: makeSelectMovieListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadPopularMovieList: () => dispatch(fetchPopularList()),
    onLoadTopRatedMovieList: () => dispatch(fetchTopRatedList()),
    onLoadUpcomingMovieList: () => dispatch(fetchUpcomingList()),
    onLoadTrendingMovie: () => dispatch(fetchTopTodayById()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MovieListPage);
