import React from 'react'
import SingleBook from '../Single-book/SingleBook'
import './SubjectBooks.css'

const SubjectBooks = ({ keyword }) => {
    
    const [subData, setSubData] = React.useState([])
    const [isFetching, setIsFetching] = React.useState(true)


    const getBooksData = async (word) => {
        try {
            const res = await fetch(`https://openlibrary.org/subjects/${word}.json`)
            const data = await res.json()
            setSubData(data)
            setIsFetching(false)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getBooksData(keyword)
    }, [])

    if (isFetching) {
        return (
            <div className="loader-container">
                <span className="loader"></span>
            </div>
        )
    } else {
        return (
            <div className='subject-books-section'>
                <h2>explore {keyword}</h2>
                <div className="inner">
                    <div className="books">
                        {
                            subData?.works?.slice(0,5)?.map((item, index) => <SingleBook key={index} item={item} />)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SubjectBooks
