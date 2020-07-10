import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className='App'>
    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
