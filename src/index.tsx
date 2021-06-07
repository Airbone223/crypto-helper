import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from "./store/rootReducer";
import {Provider, useDispatch} from "react-redux";


const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
