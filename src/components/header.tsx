import React from "react";
import {Link} from "react-router-dom";
import * as ROUTES from '../constants/routes'

const Header: React.FC = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
         <Link to={ROUTES.DASHBOARD} className="navbar-brand"><span>YOUR CRYPTO</span></Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to={ROUTES.DASHBOARD}>DASHBOARD</Link>
                    <Link className="nav-link" to={ROUTES.WALLET}>WALLET</Link>
                    <Link className="nav-link" to={ROUTES.LOGIN}>LOGIN</Link>
                    <Link className="nav-link" to={ROUTES.SIGNUP}>SIGNUP</Link>
                </div>
        </div>
    </nav>
    )
}

export default Header
