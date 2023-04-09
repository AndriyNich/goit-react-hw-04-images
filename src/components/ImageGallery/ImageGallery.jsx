import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

export const ImageGallery = ({ gallery, onClick }) => {
  return (
    <ImageList>
      {gallery.map((elem, idx) => {
        return <ImageGalleryItem elem={elem} key={idx} onClick={onClick} />;
      })}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
