import React, {
  Component
} from 'react';
import {
  Pagination,
  Row,
  Col
} from 'antd';
import './result.css';
import Preview from '../components/Preview';

class ResultContainer extends Component {
  state = {
    current: 1
  };
  paginateResult = () => {
    let current = [];
    const perPage = 16;
    let min = 0;
    let max = 15;
    if (this.state.current > 1) {
      min = this.state.current * perPage - perPage;
      max = this.state.current * perPage - 1;
    }
    current = this.props.results.filter((item, index) => {
      return index >= min && index <= max;
    });
    return current;
  }
  onChange = (page) => {
    this.setState({
      current: page,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      current: 1
    });
  }
  render() {
    const {
      results
    } = this.props;
    return (
      <div>
        <Row>
          <Col className='Results-header'>
            <h3>{results.length > 0 ? 'Resultados' : 'Escriba su consulta'}</h3>
          </Col>
        </Row>
        <Row>
          {results.length > 0 && <Col className="Results-area">
            {this.paginateResult().map(item => {
              return (
                <Preview
                  key={item.collectionId ? item.collectionId : item.artistId}
                  item={item}
                  />
              );
            })}
          </Col>}
        </Row>
        {results.length > 0 && <Row>
          <Col>
            <Pagination
              className='Results-pagination'
              defaultCurrent={this.state.current}
              current={this.state.current}
              total={this.props.results.length}
              onChange={this.onChange}
              defaultPageSize={16}
              />
          </Col>
        </Row>}
      </div>
    );
  }
}

export default ResultContainer;