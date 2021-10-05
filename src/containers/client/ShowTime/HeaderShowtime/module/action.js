import movieApi from "../../../../../apis/movieApi";
import callApiUser from "../../../../../utils/callApiUser";
import { FETCH_HISTORY_FAIL, FETCH_HISTORY_REQUEST, FETCH_HISTORY_SUCCESS, LOG_OUT, TAB_ACTIVE } from "./types";

export const actTabActive = (key) => ({
    type: TAB_ACTIVE,
    payload:key
  });

const actFetchHistoryRequest = () => ({
  type:FETCH_HISTORY_REQUEST,
});

const actFetchHistorySuccess = listMovie => ({
  type: FETCH_HISTORY_SUCCESS,
  payload: listMovie,
});

const actFetchHistoryFail = error => ({
  type: FETCH_HISTORY_FAIL,
  payload: error,
});
export const actFetchHistoryBooking = () => {
  return dispatch => {
    dispatch(actFetchHistoryRequest());
    callApiUser(`QuanLyNguoiDung/ThongTinTaiKhoan`)
      .then(res => {
        dispatch(actFetchHistorySuccess(res.data.content));
      })
      .catch(err => {
        dispatch(actFetchHistoryFail(err));
      });
  }
};
export const actFetchHistoryProfile = () => {
  return dispatch => {
    callApiUser(`QuanLyNguoiDung/ThongTinTaiKhoan`)
      .then(res => {
        dispatch(actFetchHistorySuccess(res.data.content));
      })
      .catch(err => {
        dispatch(actFetchHistoryFail(err));
      });
  }
};

