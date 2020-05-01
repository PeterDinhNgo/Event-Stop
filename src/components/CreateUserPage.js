import React from 'react';
import { connect } from 'react-redux';
import { startCreateUser } from '../actions/auth';

export const CreateUser = ({ startCreateUser }) => (
    <div>
        <button onClick={startCreateUser}>Create Account</button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startCreateUser: () => dispatch(startCreateUser()) 
});

export default connect(undefined, mapDispatchToProps)(CreateUser);