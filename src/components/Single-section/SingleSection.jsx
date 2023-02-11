import React from 'react'
import SingleBook from '../Single-book/SingleBook'
import './SingleSection.css'

const SingleSection = ({type}) => {

    const [fetchedData, setFetchedData] = React.useState( JSON.parse(localStorage.getItem('trending')) || [])
    const [isFetching, setIsFetching] = React.useState(true)

    const fetchTrending = async (type) => {
        try {
            const res = await fetch(`https://openlibrary.org/${type}/yearly.json?limit=10`)
            const data = await res.json()
            setFetchedData(data?.works);
            localStorage.setItem('trending', JSON.stringify(data?.works))
            setIsFetching(false)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchTrending(type)
        return (() => {
            window.scrollTo(0, 0);
        })
    }, [])

    if (isFetching) {
        return (
            <div className="loader-container">
                {
                    isFetching && <span className="loader"></span>
                }
            </div>
        )
    } else {    
        return (
            <div className='single-section'>
            <div className="single-section-top">
                <h2>Best seller and trending of all time</h2>
            </div>
            <div className="single-section-bottom">
                {
                    fetchedData?.map(item => <SingleBook key={item.key} item={item} />)
                }
            </div>
        </div>
    )
}
}

export default SingleSection
