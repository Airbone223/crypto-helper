import React, {ChangeEvent, useState} from "react"
import Select from "../select"
import {useSelector} from "react-redux"
import {RootState} from "../../store/rootReducer"
import {useAppDispatch} from "../../index"
import {createNewCryptoActive} from "../../store/crypto-reducer"

const AddCryptoActive: React.FC = () => {
    const dispatch = useAppDispatch()
    const coin = useSelector((state: RootState) => state.coin.coin)
    const docId = useSelector((state: RootState) => state.coin.docId)
    const wallet = useSelector((state: RootState) => state.coin.wallet)
    const walletValues: string[] = wallet.map(item => {
        return item.symbol
    })


    const ifCoinInclude = walletValues.includes(coin!?.symbol)

    const [coinCount, setCoinCount] = useState<number>(0)

    return <div className="form-group bg-white p-3 mb-2">

        <Select selectTitle={'Create crypto active'} />

        <input type="number"
               onChange={(e:ChangeEvent<HTMLInputElement>) => setCoinCount(+e.target.value)}
               className="w-100 my-3"
               placeholder="enter count of your coins..." />
        {ifCoinInclude ? <p className="text-danger">The selected coin already in yor wallet, choose another.</p>:null}

        <div className="text-center">
        <button type="button"
                disabled={(coinCount <= 0) || !coin?.symbol || ifCoinInclude }
                className="btn btn-primary w-100"
                onClick={()=>dispatch(createNewCryptoActive(docId!,
                    { symbol: coin!.symbol, count: coinCount }))}
                   >Add crypto active</button>
        </div>
    </div>
}
export default AddCryptoActive
