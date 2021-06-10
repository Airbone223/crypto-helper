import  { useState, useEffect } from 'react'
import { firebase } from '../libs/firebase'

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser') as string))
    useEffect(() => {
        firebase.auth().onAuthStateChanged((authUser) => {
            if(authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)

            } else {
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })
    }, [])

    return { user }
}
