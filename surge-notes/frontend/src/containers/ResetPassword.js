import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    return (
        <div className='container p-3 my-5 bg-dark text-white'>
            <div className='container mt-5'>
                <h1>Request Password Reset:</h1>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group mx-sm-5'>
                        <input
                            className='form-control'
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div class="d-flex justify-content-center">
                        <button className='btn btn-primary' type='submit'>Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);
