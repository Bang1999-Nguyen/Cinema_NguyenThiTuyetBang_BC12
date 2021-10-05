import { TOKEN, USER_LOGIN } from "../../../../setting/apiConfig";
import { LOG_OUT } from "../../../client/ShowTime/HeaderShowtime/module/types";
import { SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../../SignUp/module/types";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, LOGIN_SUCCESS_GOOGLE, SET_LOCAL } from "./types";

let user = {}
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    currentUser: user,
    loading: false,
    error: null,
    errorSignUp:null
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            localStorage.setItem(USER_LOGIN, JSON.stringify(payload))
            localStorage.setItem(TOKEN, payload.accessToken)
            return { ...state, loading: false, currentUser: payload };
        case LOGIN_FAIL:
            return { ...state, loading: false, error: payload };
        case LOGOUT:
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            return { ...state, currentUser: payload };
        case LOG_OUT:
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            return { ...state, currentUser: payload };
        case SIGNUP_REQUEST:
            return { ...state, loading: true,  errorSignUp: null,error: null };
        case SIGNUP_SUCCESS:
            localStorage.setItem(USER_LOGIN, JSON.stringify(payload))
            // localStorage.setItem(TOKEN, payload.accessToken)
            return { ...state, loading: false, currentUser: payload };
        case SIGNUP_FAIL:
            return { ...state, loading: false,  errorSignUp: payload };
        case LOGIN_SUCCESS_GOOGLE:
            return { ...state};
        case SET_LOCAL:{
            localStorage.setItem(USER_LOGIN, JSON.stringify(payload))
            return { ...state, currentUser: payload };
        }
        default:
            return state;
    }
};

export default authReducer;