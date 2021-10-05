import movieApi from "../../../../../apis/movieApi";
import { FETCH_DETAIL_PAGE_FAIL, FETCH_DETAIL_PAGE_REQUEST, FETCH_DETAIL_PAGE_SUCCESS } from "./types";



const actFetchDetailRequest = () => ({
  type: FETCH_DETAIL_PAGE_REQUEST,
});

const actFetchADetailSuccess = listMovie => ({
  type: FETCH_DETAIL_PAGE_SUCCESS,
  payload: listMovie,
});

const actFetchDetailFail = error => ({
  type: FETCH_DETAIL_PAGE_FAIL,
  payload: error,
});
export const actFetchDetail = (id) => {
  return dispatch => {
    dispatch(actFetchDetailRequest());
   movieApi.layThongTinPhim(id)
      .then(res => {
        dispatch(actFetchADetailSuccess(res.data.content));
      })
      .catch(err => {
        dispatch(actFetchDetailFail(err));
      });
  }
};