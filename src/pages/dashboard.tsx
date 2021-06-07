import React from "react"
import CoinCard from "../components/dashboard/coin-card"
import {useSelector} from "react-redux"
import {RootState} from "../store/rootReducer"
import Loading from "../components/loading"
import Select from "../components/dashboard/select"
import BarChart from "../components/charts/bar-charts"
import Favourites from "../components/dashboard/favourite"

const Dashboard: React.FC = () => {
    const coin = useSelector((state: RootState) => state.coin.coin)
    const loading = useSelector((state: RootState) => state.coin.loading)
    const favouritesCoins = useSelector((state: RootState) => state.coin.favouritesCoins)


    return (
            <div className="container my-3">
                    <div className="row mb-3">
                        <div className="col-sm-6">
                        <Select />
                        {  coin &&    <CoinCard coin={coin} />}
                        </div>
                        <div className="col-sm-6">
                            <h3 className="px-2">Favourites coins</h3>
                            <div className="d-flex flex-wrap align-content-center justify-center">
                            { favouritesCoins.length ?
                                favouritesCoins.map(coinSymbol => {
                                 return <Favourites
                                        key={coinSymbol}
                                        coinSymbol={coinSymbol}
                                 />
                                }) : null}
                            </div>
                        </div>
                    </div>
                {  loading && <Loading/>}
                {coin && !loading &&  <BarChart
                    timeSeries={coin.timeSeries}
                    coinName = {coin.name}/>}

            </div>
    )
}

export default Dashboard
