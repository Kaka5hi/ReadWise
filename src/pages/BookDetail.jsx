import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlineRight} from 'react-icons/ai'
import AuthorName from '../components/Author-name/AuthorName'
import BookImage from '../components/Book-image/BookImage'
import SimilarBooks from '../components/Similar-books/SimilarBooks'
import AdditionalInfo from '../components/Additional-info/AdditionalInfo'
import Rating from '../components/Rating/Rating'
import WaitingStats from '../components/Waiting-stats/WaitingStats'
import './BookDetail.css'

const BookDetail = () => {
    
    const param = new useParams()
    const [bookDetails, setBookDetails] = React.useState({})
    const [dataFetching, setDataFetching] = React.useState(true)
    const [showLess, setShowLess] = React.useState(true)

    const fetchBookDetails = async () => {
        try {
            const res = await fetch(`https://openlibrary.org/works/${param?.id}.json`)
            const data = await res.json()
            setBookDetails(data)
            setDataFetching(false)
        } catch (error) {
            console.log(error);
        }
    }

    const limitedSubjects = bookDetails?.subjects?.slice(0, 3)?.map((item, index)=> {
        return (
            <Link to={`/subject/${item}`} key={index} >{ item}</Link>
        )
    })

    const unlimitedSubjects = bookDetails?.subjects?.slice(0, 10)?.map((item, index)=> {
        return (
            <Link to={`/subject/${item}`} key={index} >{ item}</Link>
        )
    })

    React.useEffect(() => {
        fetchBookDetails()
        return () => {
            window.scrollTo(0, 0);
            setDataFetching(true)
            setShowLess(true)
        }
    }, [param?.id])
    
    if (dataFetching) {
        return (
            <div className="loader-container">
                <span className="loader"></span>
            </div>
        )
    } else {
        return (
            <div className='book-detail'>
                <div className="top">
                    <Link to='/'>home</Link>
                    <AiOutlineRight />
                    <span>{bookDetails?.title }</span>
                </div>
                <div className="book-detail-one">
                    <div className="left">
                        {
                            bookDetails?.covers ? <BookImage title={bookDetails?.title } imgId={bookDetails?.covers[0]} /> : <BookImage title={bookDetails?.title } imgId={'default'} />
                        }
                    </div>
                    <div className="right">
                        <h2>{bookDetails?.title } <span>({bookDetails?.created?.value?.substring(0,4)})</span></h2>
                        <AuthorName authorInfo={bookDetails?.authors[0]} />
                        <p>{bookDetails?.description?.value?.substring || bookDetails?.description}</p>
                        
                        <div className="chips">
                            <span>Subjects:</span>
                            <div className="chips-inner">
                                {
                                    showLess ? limitedSubjects : unlimitedSubjects
                                }
                                {
                                    bookDetails?.subjects
                                        ? <button onClick={() => setShowLess(prev => !prev)}>{showLess ? 'See more..' : 'See less'}</button>
                                        : <span>No subjects</span>
                                }
                            </div>
                        </div>
                        {/* additional info component */}
                        <AdditionalInfo id={param?.id} />
                        <Rating id={param?.id} />
                        <WaitingStats id={param?.id} />
                    </div>
                </div>


                {/* similar books based on author */}
                <SimilarBooks type={'based on author'} info={bookDetails?.authors[0]} paramId={param?.id}/>

            </div>
        )
    }
}

export default BookDetail
