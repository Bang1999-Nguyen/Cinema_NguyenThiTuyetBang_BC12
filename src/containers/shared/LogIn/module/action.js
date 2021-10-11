import userApi from "../../../../apis/userApi";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_SUCCESS_GOOGLE, LOGOUT } from "./types";
import { toast } from 'react-toastify'
import { css } from 'glamor';
const actLoginRequest = () => ({
  type: LOGIN_REQUEST,
});
const actLoginSuccess = currentUser => ({
  type: LOGIN_SUCCESS,
  payload: currentUser,
});
toast.configure({
    toastClassName: css({
      fontSize: '18px !important',
      backgroundColor: 'red!important',
      padding: '18px !important'
    }),
});
const actLoginFail = error => ({
  type: LOGIN_FAIL,
  payload: error,
});
const wave = () => toast.success('Signed in successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
const waveFail = () => toast.error('Incorrect Password or Account', { position: toast.POSITION.TOP_CENTER, autoClose: 2500,backgroundColor: '#8329C5',
color: '#ffffff'})
export const actLogin = (user, history) => {
  return dispatch => {
    dispatch(actLoginRequest());
    userApi.loginApi(user)
      .then(response => {
        dispatch(actLoginSuccess(response.data.content));
        wave()
        setTimeout(() => {
          history.goBack()
        }, 4000)
      })
      .catch(error => {
        dispatch(actLoginFail('Unable to login!'));
        waveFail()
      });
  };
};
export const actLogout = () => ({
  type: LOGOUT,
  payload: null,
});
export const actLogInGG = (res) => ({
  type: LOGIN_SUCCESS_GOOGLE,
  payload: res,
});


