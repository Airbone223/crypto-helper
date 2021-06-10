import React from "react"
import {Link} from "react-router-dom"
import * as ROUTES from '../constants/routes'
import {signOut} from "../api/firebase-api"
import {useSelector} from "react-redux"
import {RootState} from "../store/rootReducer"

type PropTypes = {
    userId: string
}

const Header: React.FC<PropTypes> = ({userId}) => {
    const userName = useSelector((state: RootState) => state.coin.username )
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <p className="navbar-brand"> {userName ? <span>Hi, {userName}</span> : <span>YOUR CRYPTO</span>}</p>
                <div className="navbar-nav">
                    {!userId && <><Link className="nav-link" to={ROUTES.LOGIN}>LOGIN</Link>
                        <Link className="nav-link" to={ROUTES.SIGNUP}>SIGNUP</Link></>}
                    {userId && <><Link className="nav-link" to={ROUTES.DASHBOARD}>DASHBOARD</Link>
                        <Link className="nav-link" to={ROUTES.WALLET}>WALLET</Link>
                        <Link className="nav-link" to={ROUTES.LOGIN} onClick={() => signOut()}>LOG OUT</Link>
                    </>}
                </div>
            </div>
        </nav>
    )
}

export default Header
