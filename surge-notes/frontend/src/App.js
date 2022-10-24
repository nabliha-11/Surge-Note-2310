import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import './App.css';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Facebook from './containers/Facebook';
import Google from './containers/Google';
import Nav from './containers/Nav';
import Simple from './RichTextEditor/Notes';
import VTT from './containers/voicetotext';
//import Markdown from './Markdown/Notes';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/facebook' component={Facebook} />
                    <Route exact path='/google' component={Google} />
                    <Route exact path='/reset-password' component={ResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                    <Route exact path='/nav' component={Nav} />
                    <Route exact path='/simple' component={Simple} />
                    <Route exact path='/vtt' component={VTT} />
                    {/* <Route exact path='/markdown' component={Markdown} />
 */}

                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;