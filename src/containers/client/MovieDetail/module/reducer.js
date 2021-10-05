import { FETCH_ALL_MOVIE_FAIL } from "../../Home/ListMovie/module/types";
import { FETCH_DETAIL_MOVIE_REQUEST, FETCH_DETAIL_MOVIE_SUCCESS, GET_COMMENT } from "./types"; const initialState = {
  listMovieDetail: [],
  loading: false,
  error: '',
  listComment:[]
};

const DetailMovieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DETAIL_MOVIE_REQUEST:
      return { ...state, loading: true };

    case FETCH_DETAIL_MOVIE_SUCCESS:
      return { ...state, listMovieDetail: payload, loading: false };

    case FETCH_ALL_MOVIE_FAIL:
      return { ...state, error: payload, loading: false };
    case GET_COMMENT:
      return { ...state, listComment: payload};
    default:
      return state;
  }
};

export default DetailMovieReducer;