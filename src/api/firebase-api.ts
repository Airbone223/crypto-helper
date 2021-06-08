import { firebase, FieldValue } from '../libs/firebase'

export type WalletType = {
    symbol: string,
    count: number
}

export type UserType = {
    userId: string
    username: string
    favouritesCoins: string[]
    docId: string
    wallet: WalletType[]
}


export async function createUser(email: string, password: string, username: string) {
    const {user} = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        return await firebase.firestore().collection("users").add({
            userId: user!.uid,
            username: username,
            favouritesCoins: [],
            wallet: [],
        })
}

export async function getUserByUId (uid: string):Promise<UserType> {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', uid)
        .get()
    const response: any[] = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))
    return response[0]
}

export async function login (email: string, password: string): Promise<any> {
    return firebase.auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
}

export async function signOut(): Promise<any> {
    return await firebase.auth().signOut()
}

export async function addCoinToUsersFavourites(userDocId: string, symbol: string) {
    return firebase
        .firestore()
        .collection('users')
        .doc(userDocId)
        .update({
            favouritesCoins: FieldValue.arrayUnion(symbol)
        })
}

export async function removeCoinFromUsersFavourites(userDocId: string, symbol: string) {
    return firebase
        .firestore()
        .collection('users')
        .doc(userDocId)
        .update({
            favouritesCoins: FieldValue.arrayRemove(symbol)
        })
}


export async function createCryptoActive(userDocId: string, cryptoActive: WalletType) {
    return firebase
        .firestore()
        .collection('users')
        .doc(userDocId)
        .update({
            favouritesCoins: FieldValue.arrayUnion(cryptoActive)
        })
}

export async function removeCryptoActive(userDocId: string, symbol: string) {
    return firebase
        .firestore()
        .collection('users')
        .doc(userDocId)
        .update({
            favouritesCoins: FieldValue.arrayRemove(symbol)
        })
}
