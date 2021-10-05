import userApi from "../../../../apis/userApi";
import { FETCH_INFORMATION_FAIL, FETCH_INFORMATION_REQUEST, FETCH_INFORMATION_SUCCESS } from "./type";



const actFetchInformationRequest = () => ({
  type: FETCH_INFORMATION_REQUEST,
});

const actFetchInformationSuccess = list => ({
  type: FETCH_INFORMATION_SUCCESS,
  payload: list,
});

const actFetchInformationFail = error => ({
  type:FETCH_INFORMATION_FAIL,
  payload: error,
});
export const actFetchInformation = (maNhom, taiKhoan) => {
  return dispatch => {
    dispatch(actFetchInformationRequest());
   userApi.layThongTin(maNhom, taiKhoan)
      .then(res => {
        dispatch(actFetchInformationSuccess(res.data.content));
      })
      .catch(err => {
        dispatch(actFetchInformationFail(err));
      });
  }
};
