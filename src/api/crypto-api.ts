import axios from 'axios'
import {CoinInterface, TimeSeriesInterface} from "../interfaces/interfaces";

const API_KEY = 'q3jrof7hus911yton55w39l'

export const getCrypto = async (cryptoName: string): Promise<CoinInterface> => {
    const data = await axios(`https://api.lunarcrush.com/v2?data=assets&key=${API_KEY}&symbol=${cryptoName}`)
    const {
        price, high, low, symbol, market_cap_rank, name, time, timeSeries: timeLaps, volume_24h
    } = data.data.data[0]
   const timeSeries =
       timeLaps.map(({high, low} : TimeSeriesInterface): TimeSeriesInterface  =>
           ({high, low}))
    return {
        price, high, low, symbol, market_cap_rank, name, time, timeSeries, volume_24h
    }
}

export const getCryptoList = async (cryptoList: string) => {
    const data = await axios(`https://api.lunarcrush.com/v2?data=assets&key=${API_KEY}&symbol=${cryptoList}`)
    return data.data.data[0]
}
