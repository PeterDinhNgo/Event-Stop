import React from 'react';
import SignIn from './authentication/SignInPage';
import { NavLink, Redirect } from 'react-router-dom';

const VerificationLand = () => (
    <div className="hero-layout">
        <h1>Please verify your registered email to continue.</h1>
        <a href="/dashboard">Continue</a>
    </div>
);

export default VerificationLand;