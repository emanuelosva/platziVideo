import typeAction from '../actions/types';

const reducer = (state, action) => {
  switch (action.type) {
    case typeAction.setFavorite:
      return {
        ...state,
        myList: [...state.myList, action.payload],
      };
    case typeAction.deleteFavorite:
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payload),
      };
    default:
      return state;
  };
};

export default reducer;
