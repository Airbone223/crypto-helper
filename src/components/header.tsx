import React from "react";
import {Link} from "react-router-dom";
import * as ROUTES from '../constants/routes'
import {signOut} from "../api/firebase-api";
import {useSelector} from "react-redux";
import {RootState} from "../store/rootReducer";

type PropTypes = {
    userId: string
}

const Header: React.FC<PropTypes> = ({userId}) => {
    const userName = useSelector((state: RootState) => state.coin.username )
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to={ROUTES.DASHBOARD} className="navbar-brand">
                    {userName ? <span>Hi, {userName}</span> : <span>YOUR CRYPTO</span>}
                </Link>
                <div className="navbar-nav">
                    {!userId && <><Link className="nav-link" to={ROUTES.LOGIN}>LOGIN</Link>
                        <Link className="nav-link" to={ROUTES.SIGNUP}>SIGNUP</Link></>}
                    {userId && <><Link className="nav-link" to={ROUTES.DASHBOARD}>DASHBOARD</Link>
                        <Link className="nav-link" to={ROUTES.WALLET}>WALLET</Link>
                        <a className="nav-link cursor-pointer" onClick={() => signOut()}>LOG OUT</a>
                    </>}

                </div>
            </div>
        </nav>
    )
}

export default Header
