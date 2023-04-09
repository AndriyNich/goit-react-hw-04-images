import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  elem: { previewURL, tags, largeImageURL },
  onClick,
}) => {
  const handleClick = () => {
    onClick({ url: largeImageURL, alt: tags });
  };

  return (
    <GalleryItem>
      <Image src={previewURL} alt={tags} onClick={handleClick} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  elem: PropTypes.shape({
    previewURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
