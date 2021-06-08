import React, {useEffect} from "react";

export default function NotFound() {
    useEffect(() => {
        document.title = 'Your crypto | Not found'
    }, [])

    return <h1>Not found error 404</h1>
}
