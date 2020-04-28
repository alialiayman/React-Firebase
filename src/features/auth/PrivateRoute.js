import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, fbUser, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            fbUser && fbUser.idToken ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;