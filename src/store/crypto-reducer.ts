import {createSlice} from "@reduxjs/toolkit"
import {CoinInterface} from "../interfaces/interfaces"
import {AppDispatch} from "../index"
import {getCrypto} from "../api/crypto-api"
import {
    addCoinToUsersFavourites,
    createCryptoActive,
    getUserByUId,
    removeCoinFromUsersFavourites, removeCryptoActive,
    UserType, WalletType
} from "../api/firebase-api"


type SliceState = {
    coin: CoinInterface | null,
    loading: boolean,
    favouritesCoins: string[],
    userId: string | null,
    username: string | null,
    wallet: WalletType[],
    docId: string | null,
   }

const initialState: SliceState = {
    coin: null,
    loading: false,
    favouritesCoins: [],
    userId: null,
    username: null,
    wallet: [],
    docId: null
}

const slice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        enableLoading(state) {
            state.loading = true
        },
        disableLoading(state) {
            state.loading = false
        },
        setCoin(state, action) {
            state.coin = action.payload
        },
        addCoinToFavourites(state, action) {
            if (!state.favouritesCoins.includes(action.payload)) {
                state.favouritesCoins.push(action.payload)
            }
        },
        deleteCoinFromFavourites(state, action) {
            state.favouritesCoins = state.favouritesCoins.filter(i => i !== action.payload)
        },
        createNewActive(state, action) {
            state.wallet.push(action.payload)
        },
        setUserData(state, action) {
            state.username = action.payload.username
            state.userId = action.payload.userId
            state.favouritesCoins = action.payload.favouritesCoins
            state.docId = action.payload.docId
            state.wallet = action.payload.wallet
        },
        removeActive(state, action) {
            state.wallet = state.wallet.filter(i => i.symbol !== action.payload)
    }}
})

export const getCoin = (cryptoName: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(enableLoading())
        const coin: CoinInterface = await getCrypto(cryptoName)
        dispatch(setCoin(coin))
        dispatch(disableLoading())
    }
}

export const addUserDataToState = (uid: string) => {
    return async (dispatch: AppDispatch) => {
        const user: UserType = await getUserByUId(uid)
                dispatch(setUserData(user))
    }
}

export const setCoinToFavourites = (docId: string, symbol: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(addCoinToFavourites(symbol))
      await addCoinToUsersFavourites(docId, symbol)
    }
}

export const removeCoinFromFavourites = (docId: string, symbol: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(deleteCoinFromFavourites(symbol))
        await removeCoinFromUsersFavourites(docId, symbol)
    }
}

export const createNewCryptoActive = (docId: string, cryptoActive: WalletType) => {
    return async (dispatch: AppDispatch) => {
        dispatch(createNewActive(cryptoActive))
        await createCryptoActive(docId, cryptoActive)
    }
}

export const removeActiveFromWallet = (docId: string, cryptoActive: WalletType) => {
    return async (dispatch: AppDispatch) => {
        dispatch(removeActive(cryptoActive.symbol))
        await removeCryptoActive(docId, cryptoActive)
    }
}

export default slice.reducer
export const {
    enableLoading, disableLoading, setCoin, createNewActive,
    addCoinToFavourites, deleteCoinFromFavourites, setUserData, removeActive
} = slice.actions
