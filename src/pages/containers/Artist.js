import React, {
  Component
} from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';
import {
  connect
} from 'react-redux';
import Wrapper from '../components/Wrapper';
import actions from '../../actions';
import Preview from '../../results/components/Preview';

const {
  fetchArtistIfNeeded
} = actions;

class ArtistContainer extends Component {
  componentDidMount() {
    this.props.getArtist(this.props.artist);
  }
  render() {
    return (
      <Wrapper
        items={[{
          name: 'Home',
          url: '/'
        }, {
          name: 'Artist',
          url: `/${this.props.artist}`
        }]}
        isFetching={this.props.isFetching}
        >
        {this.props.artistName !== '' && <Row>
          <Col
            span={24}
            >
            <Card
              title={this.props.artistName}
              style={{
                width: 300
              }}
              >
              <p>
                <strong>Género: {this.props.primaryGenreName}</strong>
              </p>
            </Card>
          </Col>
        </Row>}
        {this.props.artistName !== '' && <div style={{
          backgroundColor: '#9e9c9c',
          minHeight: 400,
          marginTop: 20,
          overflowY: 'auto',
          padding: 30,
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {this.props.albums.map(item => {
          return (
            <div
              key={item.collectionId}
              style={{
                display: 'block',
                marginRight: 15
              }}
              >
              <Preview
                item={item}
                />
            </div>
          );
        })}</div>}
        {!this.props.isFetching && this.props.artistName === '' && <Row>
          <Col>
            <h1
              style={{
                textAlign: 'center'
              }}
              >Ocurrió un problema con el servidor, intentar más tarde.</h1>
          </Col>
        </Row>}
      </Wrapper>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {
    isFetching,
    artistName,
    primaryGenreName,
    albums
  } = state.artist;
  const {
    match
  } = ownProps;
  return {
    isFetching,
    artistName,
    primaryGenreName,
    albums,
    artist: match.params.artist
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getArtist: (id) => {
      dispatch(fetchArtistIfNeeded(id));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtistContainer);
