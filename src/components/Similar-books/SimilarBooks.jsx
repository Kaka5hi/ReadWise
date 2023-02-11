import React from 'react'
import { Link } from 'react-router-dom';
import AuthorName from '../Author-name/AuthorName';
import BookImage from '../Book-image/BookImage';
import './SimilarBooks.css'

const SimilarBooks = ({ type, info, paramId }) => {

    const [booksData, setBooksData] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)

    const fetchBooksByAuthor = async (id) => {
        try {
            const res = await fetch(`https://openlibrary.org/authors/${id}/works.json`)
            const data = await res.json()
            const bookWithCover = data?.entries?.filter(item => item?.covers)
            setBooksData(bookWithCover)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchBooksBySubjects = async (id) => {
        try {
            const res = await fetch(`https://openlibrary.org/subjects/${id}.json?details=true`)
            const data = await res.json()
        } catch (error) {
            console.log(error);
        }
    }


    const limitedBooks = booksData?.slice(0, 5)?.map(book => {
        return (
            <div key={book?.key} className="single-similar-book">
                <div className="img">
                    {                            
                        book?.covers ? <BookImage title={book?.title } imgId={book?.covers[0]} /> : <BookImage title={book?.title } imgId={'default'} />
                    }
                </div>
                <div className="content">
                    <h2>{book?.title.substring(0, 60)}</h2>
                    <span>published in {book?.created?.value?.substring(0, 4)}</span>
                    <AuthorName authorInfo={book?.authors[0]} />
                    <Link to={`/book-detail/works/${book?.key.substring(7, book?.key.length)}`}>view more</Link>
                </div>
            </div>
        )
    })

    const unLimitedBooks = booksData?.slice(0, 15)?.map(book => {
        return (
            <div key={book?.key} className="single-similar-book">
                <div className="img">
                    {                            
                        book?.covers ? <BookImage title={book?.title } imgId={book?.covers[0]} /> : <BookImage title={book?.title } imgId={'default'} />
                    }
                </div>
                <div className="content">
                    <h2>{book?.title.substring(0, 60)}</h2>
                    <span>published in {book?.created?.value?.substring(0, 4)}</span>
                    <AuthorName authorInfo={book?.authors[0]} />
                    <Link to={`/book-detail/works/${book?.key.substring(7, book?.key.length)}`}>view more</Link>
                </div>
            </div>
        )
    })

    React.useEffect(() => {
        if (type === 'based on author') {
            fetchBooksByAuthor(info?.author?.key.substring(9, info?.author?.key.length))
        } else if(type === 'based on subjects') {
            fetchBooksBySubjects()
        }
    }, [info, paramId])


    return (
        <div className='similar-books'>
            <div className="inner">
                <div className="top">
                    {
                        booksData.length > 0
                            ? <h2>similar book {type}</h2>
                            : <h2>no similar books found</h2>
                    }
                </div>
                <div className="main">
                    {
                        showMore ? unLimitedBooks :limitedBooks
                    }
                </div>
                <div className="bottom">
                    {
                        booksData.length > 5
                        &&
                        <button onClick={() => setShowMore(prev => !prev)} >{ showMore ? 'Show less' : 'Show more'}</button >
                    }
                </div>
            </div>
        </div>
    )
}

export default SimilarBooks
