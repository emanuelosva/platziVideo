import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/components/Carousel.scss';

const Carousel = ({ children }) => (
  <section className='carousel'>
    <div className='carousel__container'>
      {children}
    </div>
  </section>
);

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Carousel;
