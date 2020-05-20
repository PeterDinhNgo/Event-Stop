import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

// Google Sign-In
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};

// Email and Password Sign-In
export const signIn = (credentials) => { 
    return (dispatch, getState) => {
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            var user = firebase.auth().currentUser;
            if (!user.emailVerified) {
                dispatch({type: 'LOGIN_SUCCESS'})
            }
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err})
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState) => {
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(() => {
            var user = firebase.auth().currentUser;
            user.sendEmailVerification()
            dispatch({type: 'SIGNUP_WAIT'})
        }).catch((err) => {
            dispatch({type: 'SIGNUP_FAIL', err})
        })
    }
}
