import { TRANSFER_PAGE } from "../../MovieDetail/module/types";
import { HIDE_LOADING, IS_FINISH, IS_LOADING, TRANSFER_TAB } from "../ContentShowtime/module/types"
import { TAB_ACTIVE } from "../HeaderShowtime/module/types";

const initialState = {
    thongTinNguoiDung: {},
    tabActive: '1',
    isLoading:false
}
export const UserAction = (state = initialState, { type, payload }) => {
    switch (type) {
        case IS_LOADING: {
            state.isLoading = true;
            return {...state}
        }
        case HIDE_LOADING: {
            state.isLoading = false;
            return {...state}
        }
        case TRANSFER_TAB: {
            state.tabActive = '2'
            return {...state}
        }
        case TAB_ACTIVE: {
            state.tabActive = payload
            return {...state}
        }
        case TRANSFER_PAGE: {
            state.tabActive = '1'
            return {...state}
        }
        default:
            return {...state}
    }
    
}