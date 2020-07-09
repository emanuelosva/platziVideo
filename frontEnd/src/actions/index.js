import typeAction from './types';

export const setFavorite = (payload) => ({
  type: typeAction.setFavorite,
  payload,
});

export const deleteFavorite = (payload) => ({
  type: typeAction.deleteFavorite,
  payload,
});
