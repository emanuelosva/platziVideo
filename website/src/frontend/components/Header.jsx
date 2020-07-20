/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions';

import '../assets/styles/components/Header.scss';

import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;
  const userIconState = hasUser ? gravatar(user.email) : userIcon;
  const userEmail = hasUser ? user.email : 'User';

  const handleLogout = (state) => {
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
    props.logoutRequest({});
    window.location.href = '/login';
  };

  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  });

  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__img' src={logo} alt='Platzi Video' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          <img src={userIconState} alt={userEmail} />
          <p>Perfil</p>
        </div>
        <ul>
          {hasUser ?
            <li><a href='/'>{user.name}</a></li> :
            null
          }
          {hasUser ?
            (
              <li>
                <a href='/login' onClick={handleLogout}>
                  Cerrar sesión
                </a>
              </li>
            ) :
            (
              <li>
                <Link to='/login'>
                  Iniciar sesión
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  isLogin: PropTypes.bool,
  isRegister: PropTypes.bool,
  logoutRequest: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
