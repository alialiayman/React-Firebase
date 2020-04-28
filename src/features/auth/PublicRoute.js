import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, fbUser, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            fbUser && fbUser.idToekn && restricted ?
                <Redirect to="/customers" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;