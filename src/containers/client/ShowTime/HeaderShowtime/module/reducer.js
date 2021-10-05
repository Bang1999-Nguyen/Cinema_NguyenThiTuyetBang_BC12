import { FETCH_HISTORY_FAIL, FETCH_HISTORY_REQUEST, FETCH_HISTORY_SUCCESS, LOG_OUT } from "./types";


const initialState = {
    listHistoryBooking: [],
    loading: false,
    error: '',
};

const HistoryBooking = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_HISTORY_REQUEST:
            return { ...state, loading: true };

        case FETCH_HISTORY_SUCCESS:
            return { ...state, listHistoryBooking: payload, loading: false };

        case FETCH_HISTORY_FAIL:
            return { ...state, error: payload, loading: false };
        case LOG_OUT:
            return { ...state, error: payload, loading: false };
        default:
            return state;
    }
};

export default HistoryBooking;