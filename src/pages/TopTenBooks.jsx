import React from 'react'
import { useParams } from 'react-router-dom'
import SingleBook from '../components/Single-book/SingleBook'
import './TopTenBooks.css'

const TopTenBooks = () => {

    const param = useParams()

    const [isFetching, setIsFetching] = React.useState(true)
    const [booksData, setBooksData] = React.useState([])

    const fetchTopBooks = async(word) => {
        try {
            const res = await fetch(`https://openlibrary.org/search.json?q=${word}&mode=ebooks&has_fulltext=true&mode=ebooks&limit=10`)
            const data = await res.json()
            setBooksData(data)
            setIsFetching(false)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchTopBooks(param?.subject)
    }, [])

    if (isFetching) {
        return (
            <div className="loader-container">
                <span className="loader"></span>
            </div>
        )
    } else { 
        return (
            <div className='top-ten-book-container'>
                <h2>Top 10 books for {param?.subject}</h2>
                <div className="inner-container">
                    {
                        booksData?.docs?.map((item, index) => <SingleBook key={index} item={item}/>)
                    }
                </div>
            </div>
        )
    }
}

export default TopTenBooks
