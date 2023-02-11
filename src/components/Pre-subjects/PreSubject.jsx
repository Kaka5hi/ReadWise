import React from 'react'
import { Link } from 'react-router-dom'

const PreSubject = ({keyword}) => {
    return (
        <Link className='pre-subject-section' to={`/top-10-books/${keyword}`}>{keyword}</Link>
    )
}

export default PreSubject
