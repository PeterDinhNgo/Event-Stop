import { useReducer } from "react";

export default (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};

        case 'SIGNUP_WAIT':
            return {
                ...state,
                authError: null
            };

        case 'SIGNUP_FAIL':
            return {
                ...state,
                authError: action.err.message
            };
        
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null
            };
            
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login Failed'
            };

        default:
            return state;
    }
};