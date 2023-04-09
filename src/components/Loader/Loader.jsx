import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Spiner } from './Loader.styled';

export const Loader = () => {
  return (
    <Spiner>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="1.5"
        width="48"
        visible={true}
      />
    </Spiner>
  );
};
