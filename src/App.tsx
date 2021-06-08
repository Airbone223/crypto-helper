import React, {lazy, Suspense} from 'react'
import {Route, BrowserRouter, Switch } from 'react-router-dom'
import '@progress/kendo-theme-default/dist/all.css'
import './App.css'
import ProtectedRoute from "./guards/protected-route"
import * as ROUTES from './constants/routes'
import Header from "./components/header"
import Loading from "./components/loading"
import useAuthListener from "./hooks/use-auth-listener"
import {useAppDispatch} from "./index"
import {addUserDataToState} from "./store/crypto-reducer"


const Login = lazy(() => import ('./pages/login'))
const Signup = lazy(() => import ('./pages/signup'))
const Wallet = lazy(() => import ('./pages/wallet'))
const Dashboard = lazy(() => import ('./pages/dashboard'))
const NotFound = lazy(() => import ('./pages/not-found'))

const App: React.FC = () => {
    const {user} = useAuthListener()
    const dispatch = useAppDispatch()
    if (user?.uid) {
        dispatch(addUserDataToState(user.uid))
    }

    return (
    <BrowserRouter>
        <Header userId={user?.uid} />
<Suspense fallback={<Loading />}>
<Switch>
    <ProtectedRoute isAuth={!!user} path={ROUTES.DASHBOARD} component={Dashboard} exact/>
    <ProtectedRoute isAuth={!!user} path={ROUTES.WALLET} component={Wallet}/>
    <Route path={ROUTES.LOGIN} component={Login} />
    <Route path={ROUTES.SIGNUP} component={Signup} />
    <Route path="*" component={NotFound} />
</Switch>
</Suspense>
    </BrowserRouter>
)
}

export default App
