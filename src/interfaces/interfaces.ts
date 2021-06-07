export interface CoinInterface {
    symbol: string
    price: number
    high: number
    low: number
    market_cap_rank: number
    name: string
    time: Date
    timeSeries: TimeSeriesInterface[]
    volume_24h: number
}

export interface TimeSeriesInterface {
    high: number
    low: number
}

