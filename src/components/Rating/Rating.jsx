import React from 'react'
import './Rating.css'

const Rating = ({id}) => {

    const [rating, setRating] = React.useState()
    const [counts, setCounts] = React.useState([])
    const [showDetail, setShowDetail] = React.useState(false)

    const fetchBookDetails = async (id) => {
        try {
            const res = await fetch(`https://openlibrary.org/works/${id}/ratings.json`)
            const data = await res.json()
            const countArr = Object.entries(data?.counts)
            const newArr = countArr.map(item => {
                return {star: item[0], vote: item[1]}
            })
            setCounts(newArr);
            setRating(data)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchBookDetails(id)
    }, [id])

    return (
        <div className='rating'>
            <div className="main">
                <p>rating : {rating?.summary?.average === null ? 'Nil' : rating?.summary?.average?.toFixed(2)} <span>avg. </span></p>
                <button onClick={() => setShowDetail(prev => !prev)}>Click to see details</button>
            </div>
            <div className="count" style={showDetail ? {padding:'5px'} : {padding:'0px'}}>
                {
                    showDetail &&
                    counts?.map((item, index) => {
                        return (
                            <p key={index} className="rating-count">{item?.star} star <span>{item?.vote === 0 ? 'Nil' : item?.vote}</span></p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Rating
