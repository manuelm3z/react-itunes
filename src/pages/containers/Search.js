import React, {
  Component
} from 'react';
import {
  Select,
  Row,
  Col,
  Input
} from 'antd';
import {
  connect
} from 'react-redux';
import actions from '../../actions';
import Results from '../../results/containers/result';
import Wrapper from '../components/Wrapper';

const {
  fetchArtists,
  fetchAlbums
} = actions;

const {
  Option
} = Select;

const {
  Search
} = Input;

class SearchContainer extends Component {
  state = {
    type: 'artist'
  };
  handleSelect = (value) => {
    this.setState({
      type: value
    });
  }
  handleSearch = (value) => {
    const {
      isFetching,
      onSearch,
      query
    } = this.props;
    if (!isFetching && value !== '') {
      onSearch({
        ...query,
        term: value
      }, this.state.type);
    }
  }
  render() {
    return (
      <Wrapper
        items={[{
          name: 'Home',
          url: '/'
        }]}
        isFetching={this.props.isFetching}
        >
        <Row>
          <Col
            span={6}
            >
            <Select
              style={{
                width: '100%'
              }}
              onChange={this.handleSelect}
              value={this.state.type}
              >
              <Option
                value="artist"
                >Artista</Option>
              <Option
                value="album"
                >Album</Option>
            </Select>
          </Col>
          <Col
            span={18}
            >
            <Search
              placeholder="Search..."
              onSearch={this.handleSearch}
              enterButton
              />
          </Col>
        </Row>
        <Row>
          <Col>
            <Results
              results={this.props.results}
              />
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    results,
    query
  } = state.search;
  return {
    isFetching,
    results,
    query
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (query, type) => {
      if (type === 'artist') {
        dispatch(fetchArtists({
          ...query,
          entity: 'musicArtist',
          attribute: 'artistTerm'
        }));
      } else {
        dispatch(fetchAlbums({
          ...query,
          entity: 'album',
          attribute: 'albumTerm'
        }));
      }
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
