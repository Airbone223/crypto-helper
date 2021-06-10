import React, {ChangeEvent} from "react"
import {getCoin} from "../store/crypto-reducer"
import {useAppDispatch} from "../index"

type PropTypes = {
    selectTitle: string
}

const Select: React.FC<PropTypes> = ({selectTitle}) => {
    const dispatch = useAppDispatch()
    return <>
        <h3 className="px-2 mb-3">{selectTitle}</h3>
    <select className="form-select" aria-label="Choose coin to add"
                   defaultValue='default'
                   onChange={(e:ChangeEvent<HTMLSelectElement>) => dispatch(getCoin(e.target.value))}>
        <option value="default" disabled>select coin</option>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH"> Ethereum (ETH)</option>
        <option value="BNB">Binance coin (BNB)</option>
        <option value="ADA">Cardano (ADA)</option>
        <option value="DOGE"> Dogecoin (DOGE)</option>
        <option value="USDC">USD coin (USDC)</option>
        <option value="DOT">Polkadot (DOT)</option>
        <option value="UNI"> Uniswap (UNI)</option>
        <option value="ICP">Internet Computer (ICP)</option>
        <option value="BCH">Bitcoin Cash (BCH)</option>
        <option value="LINK"> Chainlink (LINK)</option>
        <option value="LTC"> Litecoin (LTC)</option>
        <option value="SOL">Solana (SOL)</option>
        <option value="MATIC">Polygon (MATIC)</option>
        <option value="BUSD"> Binance USD (BUSD)</option>
        <option value="THETA">THETA (THETA)</option>
        <option value="XLM">Stellar (XLM)</option>
        <option value="VET">VeChain (VET)</option>
        <option value="ETC">Ethereum Classic (ETC)</option>
        <option value="FIL">Filecoin (FIL)</option>
        <option value="WBTC"> Wrapped Bitcoin (WBTC)</option>
        <option value="EOS">EOS (EOS)</option>
        <option value="TRX">TRON (TRX)</option>
        <option value="XMR"> Monero (XMR)</option>
    </select>
        </>
}

export default Select
