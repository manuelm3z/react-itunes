import React from 'react';
import {
  Layout,
  Col,
  Row
} from 'antd';
import logo from '../../logo.svg';
import './Header.css';

const {
  Header
} = Layout;

const HeaderComponent = (props) => (
  <Header>
    <Row>
      <Col
        span={2}
        >
        <img src={logo} className={`App-logo ${props.isFetching && 'App-logo-loading'}`} alt="logo" />
      </Col>
      <Col
        span={22}
        >
        <h1
          style={{
            color: '#fff'
          }}
          >iTunes searcher</h1>
      </Col>
    </Row>
  </Header>
);

export default HeaderComponent;