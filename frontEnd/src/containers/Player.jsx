import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getVideoSource } from '../actions';

import '../assets/styles/components/Player.scss';

const Player = ({ match, playing, getVideoSource, history }) => {
  const { id } = match.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideoSource(id);
    setLoading(false);
  }, []);

  if (loading) return <h1>Loadign...</h1>;

  return playing.id ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={playing.source} type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={() => history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  ) : (<Redirect to='/404/' />);
};

Player.propTypes = {
  playing: PropTypes.object,
  getVideoSource: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
