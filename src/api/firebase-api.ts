import { firebase, FieldValue } from '../libs/firebase'
import Firebase from 'firebase/app'
export type WalletType = {
    symbol: string
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
    const {user}: Firebase.auth.UserCredential = await firebase
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

export async function login (email: string, password: string): Promise<Firebase.auth.UserCredential> {
    return firebase.auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
}

export async function signOut(): Promise<void> {
    return await firebase.auth().signOut()
}

export async function addCoinToUsersFavourites(userDocId: string, symbol: string): Promise<void> {
    return firebase
        .firestore()
        .collection('users')
        .doc(userDocId)
        .update({
            favouritesCoins: FieldValue.arrayUnion(symbol)
        })
}

export async function removeCoinFromUsersFavourites(userDocId: string, symbol: string): Promise<void> {
    return firebase
        .firestore()
        .collection('users')
        .doc(userDocId)
        .update({
            favouritesCoins: FieldValue.arrayRemove(symbol)
        })
}


export async function createCryptoActive(userDocId: string, cryptoActive: WalletType): Promise<void> {
    return firebase
        .firestore()
        .collection('users')
        .doc(userDocId)
        .update({
            wallet: FieldValue.arrayUnion(cryptoActive)
        })
}

export async function removeCryptoActive(userDocId: string, cryptoActive: WalletType): Promise<void> {
    return firebase
        .firestore()
        .collection('users')
        .doc(userDocId)
        .update({
            wallet: FieldValue.arrayRemove(cryptoActive)
        })
}
