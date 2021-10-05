import {createStore, combineReducers,  applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import CarouselReducer from '../containers/client/Home/HomeCarousel/module/reducers';
import MovieReducer from '../containers/client/Home/ListMovie/module/reducer';
import PlaceReducer from '../containers/client/Home/ShowTime/module/reducer';
import DetailMovieReducer from '../containers/client/MovieDetail/module/reducer';
import authReducer from '../containers/shared/LogIn/module/reducer';
import ShowtimeFilmReducer from '../containers/client/ShowTime/ContentShowtime/module/reducer';
import { UserAction } from '../containers/client/ShowTime/module/reducer';
import HistoryBooking from '../containers/client/ShowTime/HeaderShowtime/module/reducer';
import MovieReducerAdmin from '../containers/admin/Movie/module/reducer';
import DetailAdmin from '../containers/admin/Movie/EditFilm/module/reducer';
import UserAdmin from '../containers/admin/User/module/reducer';
import Information from '../containers/client/Profile/module/reducer';




const rootReducer = combineReducers({
    CarouselReducer,
    MovieReducer,
    PlaceReducer,
    DetailMovieReducer,
    authReducer,
    ShowtimeFilmReducer,
    UserAction,
    HistoryBooking,
    MovieReducerAdmin,
    DetailAdmin,
    UserAdmin,
    Information
})

// Khởi tạo store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)) );
export default store;