import React from 'react'
import {Redirect, Route, RouteProps} from 'react-router'
import * as ROUTES from '../constants/routes'

export interface IProtectedRouteProps extends RouteProps {
    isAuth: boolean
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = (props) => {
    return props.isAuth ? (
        <Route {...props} component={props.component} render={undefined} />
) : (<Redirect to={`${ROUTES.LOGIN}`}/>)}

export default ProtectedRoute
