

import movieApi from '../../../../apis/movieApi';
import { FETCH_ALL_MOVIE_ADMIN_FAIL, FETCH_ALL_MOVIE_ADMIN_REQUEST, FETCH_ALL_MOVIE_ADMIN_SUCCESS } from './types';


const actFetchAllMovieAdminRequest = () => ({
  type: FETCH_ALL_MOVIE_ADMIN_REQUEST,
});

const actFetchAllMovieAdminSuccess = listMovie => ({
  type: FETCH_ALL_MOVIE_ADMIN_SUCCESS,
  payload: listMovie,
});

const actFetchAllMovieAdminFail = error => ({
  type: FETCH_ALL_MOVIE_ADMIN_FAIL,
  payload: error,
});
export const actFetchAllMovieAdmin = () => {
  return dispatch => {
    dispatch(actFetchAllMovieAdminRequest());
    movieApi.fetchAllMovie()
      .then(res => {
        dispatch(actFetchAllMovieAdminSuccess(res.data.content));
      })
      .catch(err => {
        dispatch(actFetchAllMovieAdminFail(err));
      });
  }
};
