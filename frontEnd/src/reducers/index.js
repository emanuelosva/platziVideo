import typeAction from '../actions/types';

const reducer = (state, action) => {
  switch (action.type) {
    case typeAction.setFavorite:
      // eslint-disable-next-line no-case-declarations
      const exist = state.myList.find((item) => (
        item.id === action.payload.id
      ));
      if (exist) return { ...state };

      return {
        ...state,
        myList: [...state.myList, action.payload],
      };

    case typeAction.deleteFavorite:
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payload),
      };

    case typeAction.loginRequest:
      return {
        ...state,
        user: action.payload,
      };

    case typeAction.logoutRequest:
      return {
        ...state,
        user: action.payload,
      };

    case typeAction.registerRequest:
      return {
        ...state,
        user: action.payload,
      };

    case typeAction.getVideoSource:
      return {
        ...state,
        playing: state.trends.concat(state.originals)
          .find((item) => item.id === Number(action.payload)) || {},
      };

    default:
      return state;
  };
};

export default reducer;
