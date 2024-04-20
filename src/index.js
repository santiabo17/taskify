import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import { store } from './reducers/store';
import { Navigate, useRoutes } from 'react-router';
import { Login } from './pages/Login';
import { UserPage } from './pages/UserPage';
import Tablero from './pages/Tablero';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const store = createStore(todosReducer, applyMiddleware(reduxLocalStorageMiddleware));
const AppRoutes = () => {
  const account = localStorage.getItem('trello_user');
  let routes = useRoutes([
    {
      path: '/',
      element: account ? <Navigate replace to={'/1'}/> : <Navigate replace to={'/login'}/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/:userid',
      element: <UserPage/>
    },{
      path: '/:userid/:tableroid',
      element: <Tablero/>
    }
  ])
  return routes;
}

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
