import React from 'react';
import { Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import EventHomePage from '../components/EventHomePage';
import NotFoundPage from '../components/NotFound';
import AddEventPage from '../components/AddEventPage';
import EditEventPage from '../components/EditEventPage';
import LoginPage from '../components/LoginPage';
import CreateAccountPage from '../components/CreateAccountPage';
import history from "../history";
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import HeroHomePage from '../components/HeroHomePage';
import LoggedInHome from '../components/LoggedInHome';
import VerificationLand from '../components/VerificationLand';
import PublicEventPage from '../components/PublicEventPage'
import UserProfile from '../components/UserProfile';

const AppRouter = () => (
    
    <Router history={history}>
        
        <div>
            <Switch>
                <PublicRoute path="/" component={HeroHomePage} exact={true} />
                <PublicRoute path="/create_account" component={CreateAccountPage}/>
                <PublicRoute path="/verify" component={VerificationLand} />
                <PublicRoute path="/signin" component={LoginPage} exact={true} />
                
                <PrivateRoute path="/signed_in/home" component={LoggedInHome} />
                <PrivateRoute path="/dashboard" component={EventHomePage} />
                <PrivateRoute path="/create" component={AddEventPage}/>
                <PrivateRoute path="/edit/:id" component={EditEventPage}/>
                <PublicRoute path="/view/:id" component={PublicEventPage}/>
                <PrivateRoute path="/user_profile" component={UserProfile} />
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
    
);


export default AppRouter;