import axios from 'axios';
import typeAction from './types';

export const setFavorite = (payload) => ({
  type: typeAction.setFavorite,
  payload,
});

export const deleteFavorite = (payload) => ({
  type: typeAction.deleteFavorite,
  payload,
});

export const loginRequest = (payload) => ({
  type: typeAction.loginRequest,
  payload,
});

export const logoutRequest = (payload) => ({
  type: typeAction.logoutRequest,
  payload,
});

export const registerRequest = (payload) => ({
  type: typeAction.registerRequest,
  payload,
});

export const getVideoSource = (payload) => ({
  type: typeAction.getVideoSource,
  payload,
});

export const findVideo = (payload) => ({
  type: typeAction.findVideo,
  payload,
});

export const setError = (payload) => ({
  type: typeAction.setError,
  payload,
});

export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => { window.location.href = redirectUrl; })
      .catch((err) => dispatch(setError(err)));
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'POST',
      auth: { username: email, password },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(loginRequest(data.user));
      })
      .then(() => { window.location.href = redirectUrl; })
      .catch((err) => setError(err));
  };
};

export const addUserFavoriteMovie = (payload, { userId, movieId }) => {
  return (dispatch) => {
    // Save movie to user list
    axios({
      url: '/user-movies',
      method: 'POST',
      data: { userId, movieId },
    })
      .then(({ data }) => {
        // Save the relation identifier (data._id)
        const movieAdded = { ...payload };
        movieAdded['favoriteMovieId'] = data._id;
        dispatch(setFavorite(movieAdded));
      })
      .catch((err) => dispatch(setError(err)));
  };
};

export const deletUserFavoriteMovie = ({ movieId, favoriteMovieId }) => {
  return (dispatch) => {
    axios({
      url: `/user-movies/${favoriteMovieId}`,
      method: 'DELETE',
    })
      .then(() => dispatch(deleteFavorite(movieId)))
      .catch((err) => setError(err));
  };
};
