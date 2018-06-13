import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwtDecode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authAction';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Login from './components/auths/Login';
import Register from './components/auths/Register';

import './App.css';


if (localStorage.jwt) {
    setAuthToken(localStorage.jwt);
    const decodedToken = jwtDecode(localStorage.jwt);
    store.dispatch(setCurrentUser(decodedToken));

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }

}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Navbar/>
                        <Route exact path={'/'} component={Landing}/>
                        <div className='container'>
                            <Route exact path={'/register'} component={Register}/>
                            <Route exact path={'/login'} component={Login}/>
                        </div>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
