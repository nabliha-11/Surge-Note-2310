import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import axios from 'axios';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };
    var passAlert= 'Password must contain\n-1 uppercase\n-1 lowercase\n-1 special character\n-no two adjacent same characters\n-at least 8 characters';
    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };
   
    if (isAuthenticated) {
        return <Redirect to='/' />
    }
    if (accountCreated) {
        return <Redirect to='/login' />
    }

    return (
        <div className='container p-3 my-1 bg-dark text-white'>
            <div className='container mt-1'>
                <h1 class='h1Display'>Sign Up</h1>
                <p class='pDisplay'>Create your Account</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group mx-sm-5'>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='First Name*'
                            name='first_name'
                            value={first_name}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group mx-sm-5'>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Last Name*'
                            name='last_name'
                            value={last_name}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group mx-sm-5'>
                        <input
                            className='form-control'
                            type='email'
                            placeholder='Email*'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group mx-sm-5'>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Password*'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            onClick={()=>alert(passAlert)}
                            minLength='8'
                            required
                        />
                    </div>
                    <div className='form-group mx-sm-5'>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Confirm Password*'
                            name='re_password'
                            value={re_password}
                            onChange={e => onChange(e)}                             
                            minLength='8'
                            required
                        />
                    </div>
                    <div class="d-flex justify-content-center">
                        <button className='btn btn-primary' type='submit'>Register</button>
                    </div>
                </form>
                <div class="d-flex justify-content-center">
                    <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
                        Continue With Google
                    </button>
                </div>
                <div class="d-flex justify-content-center">
                    <button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
                        Continue With Facebook
                    </button>
                </div>
                <p className='mt-3'>
                    Already have an account? <Link to='/login'>Log In</Link>
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
