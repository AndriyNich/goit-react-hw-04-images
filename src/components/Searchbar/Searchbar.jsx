import React, { useState } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  ButtonSearch,
  FormSearch,
  HeaderSearch,
  InputSearch,
  SpanSearch,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSendSubmit = function (value) {
    onSubmit(value);
  };

  const handleSubmitThrottle = throttle(handleSendSubmit, 3000);

  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitThrottle(search);
  };

  return (
    <HeaderSearch>
      <FormSearch onSubmit={handleSubmit}>
        <ButtonSearch type="submit">
          <AiOutlineSearch style={{ width: '24px', height: '24px' }} />
          <SpanSearch>Search</SpanSearch>
        </ButtonSearch>

        <InputSearch
          name="search"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
      </FormSearch>
    </HeaderSearch>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
