import { FETCH_CAROUSEL_FAIL, FETCH_CAROUSEL_REQUEST, FETCH_CAROUSEL_SUCCESS } from "./types";
const initialState = {
  listCarousel: [],
  loading: false,
  error: '',
};

const CarouselReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CAROUSEL_REQUEST:
      return { ...state, loading: true };

    case FETCH_CAROUSEL_SUCCESS:
      return { ...state, listCarousel: payload, loading: false };

    case FETCH_CAROUSEL_FAIL:
      return { ...state, error: payload, loading: false };
    case FETCH_CAROUSEL_FAIL:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export default CarouselReducer;