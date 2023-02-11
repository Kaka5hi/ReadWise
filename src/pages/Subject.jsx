import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlineRight} from 'react-icons/ai'
import SingleBook from '../components/Single-book/SingleBook'
import './Subject.css'

const Subject = () => {

     const param = useParams()

    const [subjectData, setSubjectData] = React.useState([])
    const [isFetching, setIsFetching] = React.useState(true)
    
    const subjectWord = (word) => {
        const seperateWord = [...word]
        let result = []
        for (let i = 0; i < seperateWord.length; i++) {
            if (seperateWord[i] !== " ") {
                result.push(seperateWord[i])
            } else {
                result.push('_')
            }
        }
        return result.join('').toLowerCase()
    }

    const findWord = subjectWord(param?.type)

   
    const fetchSubject = async () => {
        try {
            const res = await fetch(`http://openlibrary.org/subjects/${findWord}.json?details=true`)
            const data = await res.json()
            setSubjectData(data)
            setIsFetching(false)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchSubject()
        return (() => {
            setSubjectData([])
            window.scrollTo(0, 0);
            setIsFetching(true)
        })
    }, [findWord, param?.type])

    if(isFetching ) {
        return (
            <div className="loader-container">
                {
                    isFetching && <span className="loader"></span>
                }
            </div>
        )
    } else {    
        return (
            <div className='subject-section'>
                <div className="top">
                    <Link to='/' style={{textTransform:'capitalize'}}>home</Link>
                    <AiOutlineRight />
                    <span>{param?.type}</span>
                </div>
                <div className="heading">
                    <h2 style={{ textAlign: 'center' }}>Explore books by subject or discover works by similar authors.</h2>
                    <p>Books based on {param?.type} <span>E-books:{subjectData?.ebook_count}</span></p>
                </div>
                <div className="main-content">
                    {
                        subjectData?.works?.map((item, index) => <SingleBook key={index} item={item} />)
                    }
                </div>

                <div className='chips-outer-container'>
                    <p>
                        If you've enjoyed a book by a particular author, you can find other authors that write in a similar style with just a click of a button.
                    </p>
                    <h2>Similar authors</h2>
                    <div className="chips-inner-container">
                        {
                            subjectData?.authors?.map((item, index) => {
                                return (
                                    <span key={index} >{item?.name}</span>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='chips-outer-container'>
                    <h2>Explore similar subjects</h2>
                    <div className="chips-inner-container">
                        {
                            subjectData?.subjects?.map((item, index) => {
                                return (
                                    <Link to={`/subject/${item?.name}`} key={index} >{ item?.name}</Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Subject
