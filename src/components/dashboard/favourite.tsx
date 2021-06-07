import React from 'react'
import {useAppDispatch} from "../../index";
import {getCoin, removeCoinFromFavourites} from "../../store/crypto-reducer";

type PropTypes = {
    coinSymbol: string
}

const Favourites: React.FC<PropTypes> = ({coinSymbol}) => {
    const dispatch = useAppDispatch()
    return <div className="m-2 my-flex">
        <div
            className="btn"
            onClick={() => dispatch(getCoin(coinSymbol))}
        >{coinSymbol}</div>
        <span
            onClick={() => dispatch(removeCoinFromFavourites(coinSymbol))}
            className="btn material-icons text-danger cursor-pointer">
            delete_forever
        </span>
    </div>

}

export default Favourites
