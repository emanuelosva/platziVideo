import React from 'react';
import '../assets/styles/components/NotFound.scss';
import notFoundIcon from '../assets/static/notfound-icon.png';

const NotFound = () => (
  <>
    <section className='container'>
      <img className='container__img' src={notFoundIcon} alt='Astronaut' />
      <h1 className='container__status'>404</h1>
      <p className='container__message'>Lo sentimos... No encontramos lo que buscabas</p>
    </section>
  </>
);

export default NotFound;
