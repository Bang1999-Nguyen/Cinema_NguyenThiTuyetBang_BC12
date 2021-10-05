import {
    FETCH_PLACE_FAIL,
    FETCH_PLACE_REQUEST,
    FETCH_PLACE_SUCCESS,
    SELECT_FILM,
    SELECT_VIEWINGTIMES,
} from './types';
const initialState = {
    listPlace: [],
    loading: false,
    error: '',
    listPlaceDefault: [],
    cumRap: [],
    ViewingTimes:[]
};
const PlaceReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_PLACE_REQUEST:
            return { ...state, loading: true };
        case FETCH_PLACE_SUCCESS:
            return { ...state, listPlace: payload, loading: false, listPlaceDefault: payload, cumRap: payload[0].lstCumRap, ViewingTimes: payload[0].lstCumRap[0] };
        case FETCH_PLACE_FAIL:
            return { ...state, error: payload, loading: false };
        case SELECT_FILM:
            let index = state.listPlaceDefault.findIndex(item => item.maHeThongRap === payload);
            state.cumRap = (state.listPlaceDefault[index].lstCumRap);
            state.ViewingTimes = state.cumRap[0]
            var cumRapChieu = document.getElementById("mySelect");
            cumRapChieu.value = '';
            return { ...state };
        case SELECT_VIEWINGTIMES:
            let inx = state.cumRap.findIndex(item => item.tenCumRap === payload)
            if (inx !== -1) {
                state.ViewingTimes = state.cumRap[inx]
            }
            return { ...state };
        default:
            return state;
    }
};
export default PlaceReducer;