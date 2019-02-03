import React, {
  Component
} from 'react';
import {
  Row,
  Col,
} from 'antd';
import {
  connect
} from 'react-redux';
import ImageLoader from 'react-load-image';
import cover from '../../cover.png';
import actions from '../../actions';
import Wrapper from '../components/Wrapper';

const {
  fetchAlbumIfNeeded
} = actions;

function Preloader(props) {
  return <img src={cover} style={{ width: 100 }} alt='Aqui debería estar la portada del album'/>;
}

class ArtistContainer extends Component {
  componentDidMount() {
    this.props.getAlbum(this.props.album);
  }
  render() {
    return (
      <Wrapper
        items={[{
          name: 'Home',
          url: '/'
        }, {
          name: 'Artist',
          url: `/artist/${this.props.artistId}`
        }, {
          name: 'Album',
          url: `/album/${this.props.album}`
        }]}
        isFetching={this.props.isFetching}
        >
        <Row>
          <Col
            span={2}
            >
            <ImageLoader
              src={this.props.cover ? this.props.cover : cover}
              >
              <img
                style={{
                  width: 100
                }}
                alt='Portada del album'
                />
              <div>Error!</div>
              <Preloader />
            </ImageLoader>
          </Col>
          <Col span={22}>
            <div
              style={{
                backgroundColor: '#9e9c9c52',
                minHeight: 400,
                overflowY: 'auto'
              }}>
              {!this.props.isFetching && <Row>
                <Col style={{
                  paddingLeft: 10,
                  paddingTop: 10
                  }}>
                  <h3 style={{
                    color: '#383434'
                  }}><strong>Nombre de album:</strong> {this.props.collectionName} - <strong>Nombre de artista:</strong> {this.props.artistName}</h3>
                </Col>
              </Row>}
              {!this.props.isFetching && <Row>
                <Col style={{
                  paddingLeft: 10
                  }}>
                  <p
                    style={{
                      color: '#383434'
                    }}
                    ><strong>Fecha de lanzamiento:</strong> {this.props.releaseDate} - <strong>Género:</strong> {this.props.primaryGenreName}</p>
                </Col>
              </Row>}
              {!this.props.isFetching && <Row>
                <Col
                  style={{
                    padding: 20,
                    color: '#383434'
                  }}
                  >
                    <h3
                      style={{
                        color: '#383434'
                      }}
                      >Lista de canciones</h3>
                    {this.props.songs.map((song, index) => {
                      return (
                        <div
                          key={index}
                          >{song.trackNumber} - {song.trackName}</div>
                      );
                    })}
                </Col>
              </Row>}
            </div>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {
    isFetching,
    collectionName,
    releaseDate,
    cover,
    artistName,
    artistId,
    songs,
    primaryGenreName
  } = state.album;
  const {
    match
  } = ownProps;
  return {
    isFetching,
    collectionName,
    releaseDate,
    cover,
    artistName,
    artistId,
    songs,
    primaryGenreName,
    album: match.params.album
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAlbum: (id) => {
      dispatch(fetchAlbumIfNeeded(id));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtistContainer);
