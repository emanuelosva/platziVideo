import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserFavoriteMovie, deletUserFavoriteMovie } from '../actions';
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

const CarouselItem = (props) => {
  const {
    cover, title, year, contentRating, duration, _id, isMyList, user, favoriteMovieId,
  } = props;

  const handleSetFavorite = () => {
    props.addUserFavoriteMovie(
      {
        _id, cover, title, year, contentRating, duration,
      },
      {
        userId: user.id,
        movieId: _id,
      },
    );
  };
  const handleDeleteFavorite = (itemId) => {
    props.deletUserFavoriteMovie({ movieId: _id, favoriteMovieId });
  };

  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div>
          <Link to={`/player/${_id}`}>
            <img
              className='carousel-item__details--img'
              src={playIcon}
              alt='Play Icon'
            />
          </Link>
          {isMyList ?
            (
              <img
                className='carousel-item__details--img'
                src={removeIcon}
                alt='Remove Icon'
                onClick={() => handleDeleteFavorite(favoriteMovieId)}
              />
            ) :
            (
              <img
                className='carousel-item__details--img'
                src={plusIcon}
                alt='Plus Icon'
                onClick={handleSetFavorite}
              />
            )}
        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`${year} ${contentRating} ${duration}`}
        </p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  _id: PropTypes.string,
  favoriteMovieId: PropTypes.string,
  isMyList: PropTypes.bool,
  user: PropTypes.object,
  addUserFavoriteMovie: PropTypes.func,
  deletUserFavoriteMovie: PropTypes.func,
};

const mapDispatchToProps = {
  addUserFavoriteMovie,
  deletUserFavoriteMovie,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);
