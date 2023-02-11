import React from 'react'
import { Link } from 'react-router-dom'

const Suggestions = ({keyword}) => {

    const [docs, setDocs] = React.useState([])
    const [isFetching, setIsFetching] = React.useState(true)
    const [showMsg, setShowMsg] = React.useState(false)

    const fetchAdditionalData = async () => {
        try {
            const res = await fetch(`https://openlibrary.org/search/authors.json?q=${keyword}&limit=20`)
            const data = await res.json()
            if (data?.numFound) {    
                const subArray = data?.docs?.filter(item => item?.top_subjects && item?.name)
                setDocs(subArray);
                setIsFetching(false)
            } else {
                setIsFetching(false)
                setShowMsg(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const findSubjectsList = () => {
        const newArr = docs?.map(item => item?.top_subjects)
        return (newArr.flat());
    }

    const onlySubjectList = findSubjectsList()

    React.useEffect(() => {
        fetchAdditionalData (keyword)
        return (() => {
            window.scrollTo(0, 0);
            setIsFetching(true)
        })
    }, [keyword])

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
            <>
                <div className='chips-outer-container'>
                    <p>
                        If you've enjoyed a book by a particular author, you can find other authors that write in a similar style with just a click of a button.
                    </p>
                    <h2>Similar authors</h2>
                    {
                        showMsg
                        &&
                        <p>No Similar author found</p>
                    }
                    <div className="chips-inner-container">
                        {
                            docs?.map((item, index) => {
                                return (
                                    <span key={index} >{item?.name}</span>
                                    )
                                })
                            }
                    </div>
                </div>
                <div className='chips-outer-container'>
                    <h2>Explore similar subjects </h2>
                    {
                        showMsg
                        &&
                        <p>No Similar subjects found</p>
                    }
                    <div className="chips-inner-container">
                        
                        {
                            onlySubjectList?.slice(0,30)?.map((item, index) => {
                                return (
                                    <Link to={`/subject/${item}`} key={index} >{ item}</Link>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Suggestions
