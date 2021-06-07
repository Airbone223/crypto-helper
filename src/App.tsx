import React, {lazy, Suspense} from 'react'
import {Route, BrowserRouter, Switch } from 'react-router-dom'
import '@progress/kendo-theme-default/dist/all.css'
import './App.css'
import * as ROUTES from './constants/routes'
import Header from "./components/header";
import Loading from "./components/loading";

const Login = lazy(() => import ('./pages/login'))
const Signup = lazy(() => import ('./pages/signup'))
const Wallet = lazy(() => import ('./pages/wallet'))
const Dashboard = lazy(() => import ('./pages/dashboard'))
const NotFound = lazy(() => import ('./pages/not-found'))

const App: React.FC = () => {

    return (
    <BrowserRouter>
        <Header />
<Suspense fallback={<Loading />}>
<Switch>
    <Route path={ROUTES.DASHBOARD} component={Dashboard} exact/>
    <Route path={ROUTES.LOGIN} component={Login} />
    <Route path={ROUTES.SIGNUP} component={Signup} />
    <Route path={ROUTES.WALLET} component={Wallet} />
    <Route path="*" component={NotFound} />
</Switch>
</Suspense>
    </BrowserRouter>
)
}

export default App
