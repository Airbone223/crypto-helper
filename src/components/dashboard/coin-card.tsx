import React from "react"
import {CoinInterface} from "../../interfaces/interfaces"
import {useAppDispatch} from "../../index"
import {removeCoinFromFavourites, setCoinToFavourites} from "../../store/crypto-reducer"
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";

type PropTypes = {
    coin: CoinInterface,
    userDocId: string
}


const CoinCard: React.FC<PropTypes> = ({coin, userDocId}) => {
    const dispatch = useAppDispatch()
    const favouritesCoins = useSelector((state: RootState) => state.coin.favouritesCoins)
    const isAddedToFavourite = favouritesCoins.includes(coin.symbol)

    return (
        <div className="card">
            <div className="card-body text-center">
                <h5 className="card-title">{coin.name} ({coin.symbol})</h5>
                <p className="card-text">Current market cup rank: <strong>{coin.market_cap_rank}</strong></p>
                <p className="card-text">24h value: <strong>{coin.volume_24h} $</strong></p>
                <p className="card-text">24h high: <strong>{coin.high} $</strong></p>
                <p className="card-text">24h low: <strong>{coin.low} $</strong></p>
                <p className="card-text">Current price: <strong>{coin.price} $</strong></p>
                {isAddedToFavourite ? (<button
                    className="btn btn-danger"
                    onClick={() => dispatch(removeCoinFromFavourites(userDocId, coin.symbol))}
                >Remove from favourites</button>) : (
                    <button
                        className="btn btn-primary"
                        onClick={() => dispatch(setCoinToFavourites(userDocId, coin.symbol))}
                    >Add to favourites</button>
                )}
            </div>
        </div>
    )
}

export default CoinCard
