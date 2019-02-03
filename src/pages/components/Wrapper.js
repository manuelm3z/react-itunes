import React from 'react';
import {
  Layout,
  Breadcrumb,
  Row,
  Col
} from 'antd';
import Header from './Header';
import {
  Link
} from "react-router-dom";
import './Wrapper.css';

const {
  Content
} = Layout;

const {
  Item
} = Breadcrumb;

const Wrapper = (props) => (
  <Layout>
    <Header isFetching={props.isFetching} />
    <Content
      className='Wrapper-content'
      >
      <div
        className='Wrapper-background'
        >
        <Breadcrumb
          className='Wrapper-breadcrumb'
          >
          {props.items.map((item, i) => {
            return (
              <Item
                key={i}
                >
                <Link
                  to={item.url}
                  >{item.name}</Link>
              </Item>
            );
          })}
        </Breadcrumb>
        <Row>
          <Col
            span={24}
            >
            {props.children}
          </Col>
        </Row>
      </div>
    </Content>
  </Layout>
);

export default Wrapper;