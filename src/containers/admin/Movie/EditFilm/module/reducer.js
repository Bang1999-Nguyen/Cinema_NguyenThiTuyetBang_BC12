import { FETCH_DETAIL_PAGE_FAIL, FETCH_DETAIL_PAGE_REQUEST, FETCH_DETAIL_PAGE_SUCCESS } from "./types";


  
  const initialState = {
    thongTinPhim: [],
    loading: false,
    error: '',
  };
  
  const DetailAdmin = (state = initialState, { type, payload }) => {
    switch (type) {
      case FETCH_DETAIL_PAGE_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_DETAIL_PAGE_SUCCESS:
        return { ...state, thongTinPhim: payload, loading: false, listMovieDefault:payload };
      case FETCH_DETAIL_PAGE_FAIL:
        return { ...state, error: payload, loading: false };
      default:
        return state;
    }
  };
  
  export default DetailAdmin;