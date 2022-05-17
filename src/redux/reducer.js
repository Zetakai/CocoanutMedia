import {connect} from 'react-redux';

const initialState = {
  watchlist: [
  ],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD-WATCHLIST':
      return {
        ...state,
        watchlist: [...state.watchlist, action.payload],
      };
    case 'DELETE-WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(value => {
          return value.id != action.payload;
        }),
      };
    default:
      return state;
  }
};
export default reducer;
