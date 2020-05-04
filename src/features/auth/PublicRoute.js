import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const fbUser = useSelector((state) => state.user);
    const isLoggedIn = fbUser && fbUser.idToken;
    return (
        <Route {...rest} render={props => (
            isLoggedIn && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;