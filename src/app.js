import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetEvents, startAddEvent, startSetPublicEvents, setPublicEvents } from './actions/events';
import { login, logout } from './actions/auth';
import selectEvents from './selectors/selectEvents';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import history from "./history";
import { LoadingSpinner } from './components/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false; // User let if you want to reassign a variable.
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingSpinner />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) { 
        if(!user.emailVerified){
            alert('Please verify your email. You will be redirected home.')
            firebase.auth().signOut();
            store.dispatch(startSetPublicEvents());
        } else {
            store.dispatch(login(user.uid));
            store.dispatch(startSetEvents()).then(() => {
                renderApp();
                if(history.location.pathname === '/'){
                    history.push('/dashboard');
                }
            }).then(() => {
                if(history.location.pathname === '/signed_in/home'){
                    store.dispatch(startSetPublicEvents());
                }
            })
        }
    } else {
        store.dispatch(logout());
        store.dispatch(startSetPublicEvents());
        renderApp();
        history.push('/');
    }
});
