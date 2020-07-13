/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findVideo } from '../actions';
import CarouselItem from './CarouselItem';
import Carousel from './Carousel';
import Categories from './Categories';
import '../assets/styles/components/Search.scss';

const Search = ({ findVideo, searchMatch }) => {
  const [input, setInput] = useState('');
  const [findActive, setFindActive] = useState(false);
  const handleInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    findVideo(input);
    setFindActive(true);
  };

  return (
    <>
      <section className='main'>
        <h2 className='main__title'>¿Qué quieres ver hoy?</h2>
        <input
          type='text'
          className='input'
          placeholder='Buscar...'
          onChange={handleInput}
        />
      </section>
      {findActive ? (
        searchMatch.length ? (
          <>
            <br />
            <Categories title='Resultados'>
              <Carousel>
                {searchMatch.map((item) => (
                  <CarouselItem key={item.id} {...item} />
                ))}
              </Carousel>
            </Categories>
          </>
        ) :
          (
            <>
              <Categories title='Ningún resultado coincide con la búsqueda' />
              <br />
            </>
          )
      ) : null
      }
    </>
  );
};

Search.propTypes = {
  searchMatch: PropTypes.array,
  findVideo: PropTypes.func,
};

const mapSateToProps = (state) => {
  return {
    searchMatch: state.searchMatch,
  };
};

const mapDispatchToProps = {
  findVideo,
};

export default connect(mapSateToProps, mapDispatchToProps)(Search);
