import { BOOK_TICKET, FETCH_SHOWTIME_FAIL, FETCH_SHOWTIME_REQUEST, FETCH_SHOWTIME_SUCCESS, IS_FINISH } from "./types";

const initialState = {
    listShowtime: [],
    loading: false,
    error: '',
    danhSachGheDangDat: [],
};

const ShowtimeFilmReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_SHOWTIME_REQUEST:
            return { ...state, loading: true };

        case FETCH_SHOWTIME_SUCCESS:
            return { ...state, listShowtime: payload, loading: false };

        case FETCH_SHOWTIME_FAIL:
            return { ...state, error: payload, loading: false };
        case BOOK_TICKET:
            let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
            let inx = danhSachGheDangDatUpdate.findIndex(item => item.maGhe === payload.maGhe)
            if (inx !== -1) {
                danhSachGheDangDatUpdate.splice(inx, 1)
            } else {
                danhSachGheDangDatUpdate.push(payload)
            }
            state.danhSachGheDangDat = danhSachGheDangDatUpdate;
            return { ...state }
        case IS_FINISH: {
            state.danhSachGheDangDat = [];
            return { ...state }
        }
        default:
            return state;
    }
};

export default ShowtimeFilmReducer;