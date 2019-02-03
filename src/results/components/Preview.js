import React from 'react';
import {
  Card
} from 'antd';
import {
  Link
} from 'react-router-dom';
import './Preview.css';

const Preview = ({ item }) => (
  <Link
    to={to(item)}
    >
    <Card
      title={title(item)}
      bordered={false}
      className='Preview-wrapper'
      >
      <p>{description(item)}</p>
    </Card>
  </Link>
);

function title(item) {
  if (item.wrapperType === 'collection') {
    return item.collectionName;
  }
  return item.artistName;
}

function description(item) {
  if (item.wrapperType === 'collection') {
    return `Género: ${item.primaryGenreName} - Artista: ${item.artistName}`;
  }
  return `Género: ${item.primaryGenreName}`;
}

function to(item) {
  if (item.wrapperType === 'collection') {
    return `/album/${item.collectionId}`;
  }
  return `/artist/${item.artistId}`;
}

export default Preview;