import {
  FETCH_ALL_MOVIE_FAIL,
  FETCH_ALL_MOVIE_REQUEST,
  FETCH_ALL_MOVIE_SUCCESS,
  SELECT_ACTION,
} from './types';

const initialState = {
  listMovie: [],
  loading: false,
  error: '',
  button: [
    { type: 'All', select: true, name: "ALL MOVIES" },
    { type: 'isShowing', select: false, name: "NOW SHOWING" },
    { type: 'isComing', select: false, name: "COMING SOON" }
  ],
  listMovieDefault:[]
};

const MovieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_MOVIE_REQUEST:
      return { ...state, loading: true };
    case FETCH_ALL_MOVIE_SUCCESS:
      return { ...state, listMovie: payload, loading: false, listMovieDefault:payload };
    case FETCH_ALL_MOVIE_FAIL:
      return { ...state, error: payload, loading: false };
    case SELECT_ACTION: {
      let buttonUpdate = [...state.button];
      buttonUpdate = buttonUpdate.map(item => {
        return { ...item, select: false }
      })
      let index = buttonUpdate.findIndex(item => item.type === payload.type);
      if (index !== -1) {
        buttonUpdate[index].select = true;
      }
      state.button = buttonUpdate
      if (payload.type === 'isShowing') {
        state.listMovie = state.listMovieDefault.filter(item => item.dangChieu === true)
      } else if (payload.type === 'isComing') {
        state.listMovie = state.listMovieDefault.filter(item => item.sapChieu === true)
      } else if (payload.type === 'All') {
        state.listMovie = state.listMovieDefault
      }
      return { ...state }
    }
    default:
      return state;
  }
};

export default MovieReducer;