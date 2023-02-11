import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='error'>
            <div className="msg">
                <h1>404 error</h1>
                <p>looks like you entered a link that doesn't exist</p>
                <Link to='/' >Go back home</Link>
            </div>
        </div>
    )
}

export default Error
