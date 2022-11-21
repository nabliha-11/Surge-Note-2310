import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { facebookAuthenticate } from '../actions/auth';
import queryString from 'query-string';

const Facebook = ({ facebookAuthenticate }) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            facebookAuthenticate(state, code);
        }
    }, [location]);

    return (
        <div className='container p-3 my-3 bg-dark text-white'>
            <div class='jumbotron mt-5'>
                <h1 class='display-4'>Welcome to Surge!</h1>
                <p class='lead'>Team Roket</p>
                <hr class='my-4' />
                <p class='lead'>Click the Log In button</p>
                <div class="d-flex justify-content-center">
                    <Link class='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { facebookAuthenticate })(Facebook);
