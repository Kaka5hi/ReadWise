import React from 'react'
import './AdditionalInfo.css'

const AdditionalInfo = ({id}) => {

    const [publisherList, setPublisherList] = React.useState()

    const fetchBookDetails = async (id) => {
        try {
            const res = await fetch(`https://openlibrary.org/works/${id}/editions.json`)
            const data = await res.json()
            const booksWithPublishers = data?.entries?.filter(item => item.publishers)
            const publishersName = booksWithPublishers?.map(item => {
                return item?.publishers
            })
            const finalList = [...new Set(publishersName?.flat())]
            setPublisherList(finalList);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchBookDetails(id)
    }, [])

    return (
        <div className='additional-info'>
            <h2>Publisher for this book:</h2>
                {publisherList?.slice(0, 1)?.map(item => {
                    return (
                        <span className='publishers' key={item}>{item}</span>
                        )
                    })
                }
        </div>
    )
}

export default AdditionalInfo
