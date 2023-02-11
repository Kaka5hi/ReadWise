import React from 'react'
import { Link } from 'react-router-dom'
import './SingleBook.css'

const SingleBook = ({ item }) => {

    return (
        <div className='single-book'>
            <img src={`https://covers.openlibrary.org/b/olid/${item?.cover_edition_key}-M.jpg` || `https://www.cbspd.co.in/media/catalog/product/cache/1/image/c66ed2c04ee7ca3766803238dbeea301/placeholder/default/comingsoon.jpg`} alt={item?.title}/>
            <div className="details">
                <span className='title' >{item?.title}</span>
                {
                    item?.author_name &&
                    <span title={`Author : ${item?.author_name}`} className='author'>by {item?.author_name}</span>
                }
                <span className='published'>First published in {item?.first_publish_year}</span>
                <Link to={`/book-detail/works/${item?.key.substring(7, item?.key.length)}`}>view more</Link>
            </div>
        </div>
    )
}

export default SingleBook
