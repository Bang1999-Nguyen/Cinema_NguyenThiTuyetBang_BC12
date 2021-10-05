
import movieApi from '../../../../../apis/movieApi';
import { FETCH_PLACE_FAIL, FETCH_PLACE_REQUEST, FETCH_PLACE_SUCCESS } from './types';


const actFetchPlaceRequest = () => ({
  type: FETCH_PLACE_REQUEST,
});

const actFetchPlaceSuccess = list => ({
  type: FETCH_PLACE_SUCCESS,
  payload: list,
});

const actFetchPlaceFail = error => ({
  type: FETCH_PLACE_FAIL,
  payload: error,
});
export const actFetchPlace = () => {
  return dispatch => {
    dispatch(actFetchPlaceRequest());
    movieApi.fetchViewingTimes()
      .then(res => {
        dispatch(actFetchPlaceSuccess(res.data.content));
      })
      .catch(err => {
        dispatch(actFetchPlaceFail(err));
      });
  }
};
