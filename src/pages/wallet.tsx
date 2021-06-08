import React, {useEffect} from "react"
import WalletHeader from "../components/wallet/wallet-header"
import CryptoActives from "../components/wallet/crypto-actives"
import AddCryptoActive from "../components/wallet/add-crypto-active"

export default function Wallet() {
    useEffect(() => {
        document.title = 'Your crypto | Wallet'
    }, [])
    return <div className="container">
        <WalletHeader />
        <CryptoActives />
        <AddCryptoActive />
    </div>
}
