import { FETCH_ALL_MOVIE_REQUEST } from "../../../client/Home/ListMovie/module/types";
import { FETCH_ALL_MOVIE_ADMIN_FAIL, FETCH_ALL_MOVIE_ADMIN_REQUEST, FETCH_ALL_MOVIE_ADMIN_SUCCESS } from "./types";

  
  const initialState = {
    listMovieAdmin: [],
    loading: false,
    error: '',
    idFilm:'',
    idCalendar:''
  };
  
  const MovieReducerAdmin = (state = initialState, { type, payload }) => {
    switch (type) {
      case FETCH_ALL_MOVIE_ADMIN_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_ALL_MOVIE_ADMIN_SUCCESS:
        return { ...state, listMovieAdmin: payload, loading: false, listMovieDefault:payload };
      case FETCH_ALL_MOVIE_ADMIN_FAIL:
        return { ...state, error: payload, loading: false };
        case 'IS_SHOW':
          return { ...state, idFilm: payload };
          case 'IS_CALENDAR':
          return { ...state, idCalendar: payload };
      default:
        return state;
    }
  };
  
  export default MovieReducerAdmin;