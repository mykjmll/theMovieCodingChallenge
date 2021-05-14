/* eslint-disable prettier/prettier */
/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import { Row, Col, Button, Typography, Affix } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


import StyledHeader from './StyledHeader'
import { forwardTo } from '../../helpers/forwardTo';
const { Title } = Typography;

function Header() {
  return (
    <Affix offsetTop={0}>
      <StyledHeader>
        <Row>
          <Col flex="auto"><Title level={3} type="primary">_theMovie_. </Title></Col>
          <Col flex="none">
            <Button type="link" onClick={() => forwardTo('/home')}>Home</Button>
            <Button type="link" onClick={() => forwardTo('/favorites')}>Favorites</Button>
            <Button shape="circle"  className="icon__search" icon={<SearchOutlined />} onClick={() => forwardTo('/search')}/>
          </Col>
        </Row> 
      </StyledHeader>
    </Affix>
    
  );
}

Header.propTypes = {};

export default memo(Header);
