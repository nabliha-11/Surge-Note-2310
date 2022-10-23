import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='container p-3 my-3 bg-dark text-white'>
        <div class='jumbotron mt-5'>
            <h1 class='display-4'>Welcome to Surge!</h1>
            <p class='lead'>Team Roket</p>
            <hr class='my-4' />
            <p>Click the Log In button</p>
            <div class="d-flex justify-content-center">
                <Link class='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
            </div>
        </div>
    </div>
);

export default Home;
