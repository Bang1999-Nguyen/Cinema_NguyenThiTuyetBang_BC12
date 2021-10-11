import userApi from "../../../../apis/userApi";
import { SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./types";
import { toast } from 'react-toastify'

toast.configure();
const actSignUpRequest = () => ({
  type: SIGNUP_REQUEST,
});
const actSignUpSuccess = currentUser => ({
  type: SIGNUP_SUCCESS,
  payload: currentUser,
});
const actSignUpFail = error => ({
  type: SIGNUP_FAIL,
  payload: error,
});
const waveSignUp = () => toast('Signed up successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
const waveFail = () => toast.error('Account already exists! Retry', { position: toast.POSITION.TOP_CENTER, autoClose: 2500,backgroundColor: '#8329C5',
color: '#ffffff'})
export const actSignUp = (user, history) => {
  return dispatch => {
    dispatch(actSignUpRequest());
     userApi.signUpApi(user)
      .then(response => {
        console.log(response.data);
        dispatch(actSignUpSuccess(response.data.content));
        waveSignUp()
        setTimeout(() => {
          history.goBack()
        }, 4000)
      })
      .catch(error => {
        dispatch(actSignUpFail('Account is exist! Retry'));
        waveFail()
      });
  };
};
