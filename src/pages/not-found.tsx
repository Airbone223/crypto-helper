import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import * as ROUTES from '../constants/routes'

export default function NotFound() {
    useEffect(() => {
        document.title = 'Your crypto | Not found'
    }, [])

    return <div className="container text-center mt-5">
        <h1>Page not found error 404</h1>
        <Link to={ROUTES.DASHBOARD} className="nav-link"><h3>Go to dashboard</h3></Link>
    </div>
}
