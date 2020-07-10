/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';

import '../assets/styles/App.scss';

const Home = ({ myList, trends, originals }) => {

  return (
    <>
      <Header />
      <Search />

      {myList.length && (
        <Categories title='Mi lista'>
          <Carousel>
            {myList.map((item) => (
              <CarouselItem
                key={item.id}
                {...item}
                isMyList
              />
            ))}
          </Carousel>
        </Categories>
      )}

      <Categories title='Tendencias'>
        <Carousel>
          {trends.map((item) => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </Carousel>
      </Categories>

      <Categories title='Originales de PlatziVideo'>
        <Carousel>
          {originals.map((item) => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </Carousel>
      </Categories>
    </>
  );
};

Home.propTypes = {
  myList: PropTypes.array,
  trends: PropTypes.array,
  originals: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  };
};

export default connect(mapStateToProps, null)(Home);
