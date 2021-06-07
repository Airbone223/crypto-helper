import {createSlice} from "@reduxjs/toolkit"
import {CoinInterface} from "../interfaces/interfaces"
import {AppDispatch, useAppDispatch} from "../index"
import {getCrypto} from "../api/crypto-api"
import {useDispatch} from "react-redux";
import {strict} from "assert";

type SliceState = {
    coin: CoinInterface | null,
    loading: boolean,
    favouritesCoins: string[]
}

const initialState: SliceState = {
    coin: null,
    loading: false,
    favouritesCoins: ["BTC", "ETH", "ADA"]
}

const slice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        enableLoading(state) {state.loading = true},
        disableLoading(state) {state.loading = false},
        setCoin(state, action) {state.coin = action.payload},
        setCoinToFavourites(state, action) {
            if (!state.favouritesCoins.includes(action.payload)) {
                state.favouritesCoins.push(action.payload)
            }
        },
       removeCoinFromFavourites(state, action) {
           state.favouritesCoins = state.favouritesCoins.filter(i => i !== action.payload)
        }
    },
})

export const getCoin = (cryptoName: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(enableLoading())
        const coin: CoinInterface = await getCrypto(cryptoName)
        dispatch(setCoin(coin))
        dispatch(disableLoading())
    }
}

export default slice.reducer
export const { enableLoading, disableLoading, setCoin,
    setCoinToFavourites, removeCoinFromFavourites } = slice.actions
