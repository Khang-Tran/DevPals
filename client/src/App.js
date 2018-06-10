import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Login from './components/auths/Login';
import Register from './components/auths/Register';

import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar/>
                    <Route exact path={'/'} component={Landing}/>
                    <div className="container">
                        <Route exact path={'/register'} component={Register}/>
                        <Route exact path={'/login'} component={Login}/>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
