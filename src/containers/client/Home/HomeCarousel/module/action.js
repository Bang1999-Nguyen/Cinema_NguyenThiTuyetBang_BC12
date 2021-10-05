

import movieApi from "../../../../../apis/movieApi";
import { FETCH_CAROUSEL_FAIL, FETCH_CAROUSEL_REQUEST, FETCH_CAROUSEL_SUCCESS } from "./types";


const actFetchCarouselRequest = () => ({
    type: FETCH_CAROUSEL_REQUEST
  });
  
  const actFetchCarouselSuccess = listCarousel => ({
    type: FETCH_CAROUSEL_SUCCESS,
    payload: listCarousel,
  });
  
  const actFetchCarouselFail = error => ({
    type: FETCH_CAROUSEL_FAIL,
    payload: error,
  });
  export const actFetchCarousel = () => {
    return dispatch => {
      dispatch(actFetchCarouselRequest());
        movieApi.getCarousel()
        .then(res => {
          dispatch(actFetchCarouselSuccess(res.data));
        })
        .catch(err => {
          dispatch(actFetchCarouselFail(err));
        });
    };
  };
  