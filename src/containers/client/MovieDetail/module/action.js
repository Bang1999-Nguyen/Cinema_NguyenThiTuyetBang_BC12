
import movieApi from '../../../../apis/movieApi';
import { FETCH_DETAIL_MOVIE_FAIL, FETCH_DETAIL_MOVIE_REQUEST, FETCH_DETAIL_MOVIE_SUCCESS, GET_COMMENT } from './types';


const actFetchAllMovieRequest = () => ({
  type:FETCH_DETAIL_MOVIE_REQUEST,
});

const actFetchAllMovieSuccess = listMovie => ({
  type: FETCH_DETAIL_MOVIE_SUCCESS,
  payload: listMovie,
});

const actFetchAllMovieFail = error => ({
  type: FETCH_DETAIL_MOVIE_FAIL,
  payload: error,
});
export const actFetchAllMovie = (id) => {
  return dispatch => {
    dispatch(actFetchAllMovieRequest());
    movieApi.fetchDetailMovie(id)
      .then(res => {
        dispatch(actFetchAllMovieSuccess(res.data.content));
      })
      .catch(err => {
        dispatch(actFetchAllMovieFail(err));
      });
  }
};
const actFetchComment = listComment => ({
  type: GET_COMMENT,
  payload:  listComment,
});

export const actFetchCommentMovie = () => {
  return dispatch => {
    movieApi.getComment()
      .then(res => {
        dispatch(actFetchComment(res.data));
      })
  }
};

