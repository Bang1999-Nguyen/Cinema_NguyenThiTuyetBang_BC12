import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { adminRoutes, clientRoutes } from './routes';
import ClientLayout from './layouts/ClientLayout';
import LogIn from './containers/shared/LogIn/LogIn';
import SignUp from './containers/shared/SignUp/SignUp';
import AdminLayout from './layouts/AdminLayout';
import PageNotFound from './containers/client/PageNotFound/PageNotFound';
import Loading from './components/Loading/Loading';
function App() {
  const renderLayout = (routes, Layout) => {
    return routes.map(route => {
      const { path, component, exact, isPrivate } = route;
      return (
        <Layout path={path} component={component} exact={exact} isPrivate={isPrivate} />
      )
    })
  }
  const ShowTimeMovie = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 2 * 1000)).then(
      () => import("./containers/client/ShowTime/ShowTimeMovie")
    );
  });
  return (
      <div className="App" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
        <div className="app-res">
          <div className="app-responsive">
          <img src="./images/stripy-73.png" style={{width:'350px', height:'350px'}}></img>
            <h1>Website only supports Desktop, iPad and iPhone 8 Plus Service.</h1>
        </div>
          </div>
           
        <Suspense fallback={<Loading />}>
          <Router>
            <Switch>
              {renderLayout(clientRoutes, ClientLayout)}
              <Route path='/logIn' component={LogIn} exact={true} />
              <Route path='/checkOut/:Id' component={ShowTimeMovie} exact={true} />
              <Route path='/register' component={SignUp} exact={true} />
              {renderLayout(adminRoutes, AdminLayout)}
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Router>
        </Suspense>
      </div>
  );
}
export default App;
