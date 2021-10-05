import React , { Suspense, lazy }from 'react'
import Dashboard from "../containers/admin/Dashboard";
import Movie from "../containers/admin/Movie/Movie";
import User from "../containers/admin/User/User";
import Profile from "../containers/client/Profile/Profile";
import ShowTimeMovie from "../containers/client/ShowTime/ShowTimeMovie";
import LogIn from "../containers/shared/LogIn/LogIn";
const Home = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 5 * 1000)).then(
    () => import("../containers/client/Home/Home")
  );
});
const MovieDetail = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 2 * 1000)).then(
    () => import("../containers/client/MovieDetail/MovieDetail")
  );
});
const ProfileTemplate = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 2 * 1000)).then(
    () => import("../containers/client/Profile/ProfileTemplate")
  );
});
export const clientRoutes = [
    {
        path:'/',
        component:Home,
        exact:true
    },
    {
        path:'/movieDetail/:movieId',
        component:MovieDetail,
        exact:true
    },
    {
        path:'/profile',
        component:ProfileTemplate,
        exact:true
    },
    
]
export const adminRoutes = [
    {
      path: '/admin',
      component: Dashboard,
      exact: true,
      isPrivate: true,
    },
    {
        path: '/admin/movie',
        component: Movie,
        exact: true,
        isPrivate: true,
      },
      {
        path: '/admin/user',
        component: User,
        exact: true,
        isPrivate: true,
      }
  ];