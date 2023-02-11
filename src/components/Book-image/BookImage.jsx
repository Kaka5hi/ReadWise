import React from 'react'

const BookImage = ({ imgId, title }) => {
    
    if (imgId === 'default') {
        return (
            <>
                <img src={`https://www.cbspd.co.in/media/catalog/product/cache/1/image/c66ed2c04ee7ca3766803238dbeea301/placeholder/default/comingsoon.jpg`} alt={title} />
            </>            
        )
    } else {      
        return (
            <>
                <img src={ (imgId !== -1) ? `https://covers.openlibrary.org/b/id/${imgId}-M.jpg` : `https://www.cbspd.co.in/media/catalog/product/cache/1/image/c66ed2c04ee7ca3766803238dbeea301/placeholder/default/comingsoon.jpg`} alt={title} />
            </>
    
        )
    }
}

export default BookImage
