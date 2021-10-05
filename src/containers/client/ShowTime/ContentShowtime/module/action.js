import movieApi from "../../../../../apis/movieApi";
import { FETCH_SHOWTIME_FAIL, FETCH_SHOWTIME_REQUEST, FETCH_SHOWTIME_SUCCESS, HIDE_LOADING, IS_FINISH, IS_LOADING, TRANSFER_TAB } from "./types";



const actFetchShowtimeRequest = () => ({
  type:FETCH_SHOWTIME_REQUEST,
});

const actFetchShowtimeSuccess = listMovie => ({
  type: FETCH_SHOWTIME_SUCCESS,
  payload: listMovie,
});

const actFetchShowtimeFail = error => ({
  type: FETCH_SHOWTIME_FAIL,
  payload: error,
});
export const actFetchShowtime = (id) => {
  return dispatch => {
    dispatch(actFetchShowtimeRequest());
    movieApi.getShowtime(id)
      .then(res => {
        dispatch(actFetchShowtimeSuccess(res.data.content));
      })
      .catch(err => {
        dispatch(actFetchShowtimeFail(err));
      });
  }
};
export const actFetchShowtimeReload = (id) => {
  return dispatch => {
    movieApi.getShowtime(id)
      .then(res => {
        dispatch(actFetchShowtimeSuccess(res.data.content));
      })
      .catch(err => {
        dispatch(actFetchShowtimeFail(err));
      });
  }
};
export const actLoading = () => ({
  type: IS_LOADING
});
export const actHideLoading = () => ({
  type: HIDE_LOADING
});
export const actFinish = () => ({
  type: IS_FINISH
});
export const actTransferTab = () => ({
  type: TRANSFER_TAB
});