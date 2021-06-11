import React, {useEffect, useState} from "react"
import CryptoActive from "../components/wallet/crypto-active"
import AddCryptoActive from "../components/wallet/add-crypto-active"
import {useSelector} from "react-redux"
import {RootState} from "../store/rootReducer"
import {WalletType} from "../api/firebase-api"
import {CoinInterface} from "../interfaces/interfaces"
import {getCrypto} from "../api/crypto-api"
import Diagram from "../components/charts/diagram"
import { useHistory } from "react-router-dom"
import Loading from "../components/loading";


export type DataForDiagram = {
    symbol: string
    price: number
}

const Wallet: React.FC = () => {
    const wallet: WalletType[] = useSelector((state: RootState) => state.coin.wallet)
    const [data, setData] = useState<DataForDiagram[] | null>(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

        useEffect(() => {
        const getData = async () => {
            let walletDataWithPrice: DataForDiagram[] = []
           await wallet.forEach( async(item: WalletType) => {
                const {price}: CoinInterface = await getCrypto(item.symbol)
                walletDataWithPrice.push({symbol: item.symbol, price: price*item.count})
            })
            setData(walletDataWithPrice)
        }
    if (wallet.length) {
        getData()
        setLoading(true)
        const interval = setInterval(()=>{
            history.push('/wallet')
            setLoading(false)
            clearInterval(interval)
        }, 1200)
    }
    }, [wallet, history])
    useEffect(()=>{
        document.title = 'Your crypto | Wallet'
    }, [])

    return <div className="container mt-3">
        <div className="row mb-3">
            <div className="col-sm-7">
                <div className="w-100 mr-2 bg-white">
                    { loading ? <Loading /> :
                        (data?.length ? <Diagram data={data}/> : null)}
                </div>
            </div>
            <div className="col-sm-5">
                <AddCryptoActive />
                <div className="my-flex-crypto-active">
                    {wallet.length ? wallet.map((item, idx) => {
                        return  <CryptoActive cryptoActive={item} key={item.symbol+idx}/>
                    }) : null}
                </div>
            </div>
        </div>
    </div>
}

export default Wallet
