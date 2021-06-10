import React, {useEffect, useState} from 'react'
import {useAppDispatch} from "../../index"
import {removeActiveFromWallet} from "../../store/crypto-reducer"
import {getCrypto} from "../../api/crypto-api"
import {CoinInterface} from "../../interfaces/interfaces"
import {useSelector} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {WalletType} from "../../api/firebase-api";

type PropTypes = {
   cryptoActive: WalletType
}

const CryptoActive: React.FC<PropTypes> = ({cryptoActive}) => {
    const dispatch = useAppDispatch()
    const userDocId = useSelector((state: RootState) => state.coin.docId)
    const [coin, setCoin] = useState<CoinInterface | null>(null)

    useEffect(()=>{
       const getCoinIfo = async () => {
           const result = await getCrypto(cryptoActive.symbol)
           setCoin(result)
        }
        cryptoActive.symbol && getCoinIfo()
    }, [cryptoActive.symbol])
    return     <div className="my-flex-column m-2">
        <div className="my-flex w-100 ">
        <div className="btn"
        >{cryptoActive.symbol}</div>
        <span
            onClick={() => (userDocId && dispatch(removeActiveFromWallet(userDocId, cryptoActive)))}
            className="btn material-icons text-danger cursor-pointer">
            delete_forever
        </span>
    </div>
        <div className="p-3">
        <div> coin count: <strong>{cryptoActive.count}</strong></div>
        {coin && <div>current price: <strong>{(coin.price * cryptoActive.count).toFixed(2)} $</strong></div>}
        </div>
    </div>
}

export default CryptoActive
