/**
 *
 * Layout
 *
 */

import React, { Children, memo } from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import StyledLayout from './StyledLayout';

function Layout(props) {
  const { children } = props;

  return (
    <StyledLayout>
      <div className="absolute-center">
        <div>
          <Header />
        </div>
        <div className="wrapper-main">{Children.toArray(children)}</div>
      </div>
    </StyledLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default memo(Layout);
