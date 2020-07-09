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
