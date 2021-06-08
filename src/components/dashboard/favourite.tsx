import React from 'react'
import {useAppDispatch} from "../../index";
import {getCoin, removeCoinFromFavourites} from "../../store/crypto-reducer";

type PropTypes = {
    coinSymbol: string,
    userDocId: string
}

const Favourites: React.FC<PropTypes> = ({coinSymbol, userDocId}) => {
    const dispatch = useAppDispatch()
    return <div className="m-2 my-flex">
        <div
            className="btn"
            onClick={() => dispatch(getCoin(coinSymbol))}
        >{coinSymbol}</div>
        <span
            onClick={() => dispatch(removeCoinFromFavourites(userDocId, coinSymbol))}
            className="btn material-icons text-danger cursor-pointer">
            delete_forever
        </span>
    </div>

}

export default Favourites
