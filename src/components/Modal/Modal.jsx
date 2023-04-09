import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWraper } from './Modal.styled';

export function Modal({ select: { url, alt }, onClose }) {
  useEffect(() => {
    const eventID = window.addEventListener('keydown', handleKeyDown);

    return window.removeEventListener('keydown', eventID);
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClick}>
      <ModalWraper>
        <img src={url} alt={alt} />
      </ModalWraper>
    </Overlay>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  select: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};
