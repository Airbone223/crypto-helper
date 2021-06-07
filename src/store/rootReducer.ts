import { combineReducers } from '@reduxjs/toolkit'
import cryptoReducer from './crypto-reducer'

export const rootReducer = combineReducers({
   coin: cryptoReducer
})

export type RootState = ReturnType<typeof rootReducer>
