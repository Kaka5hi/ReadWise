import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlineRight} from 'react-icons/ai'
import SingleBook from '../components/Single-book/SingleBook'
import './Subject.css'
import Suggestions from '../components/Suggestions/Suggestions'

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
            const res = await fetch(`http://openlibrary.org/subjects/${findWord}.json`)
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
                    <p>Books based on {param?.type}</p>
                </div>
                <div className="main-content">
                    {
                        subjectData?.works?.map((item, index) => <SingleBook key={index} item={item} />)
                    }
                </div>

                {
                    <Suggestions keyword={param?.type} />
                }
            </div>
        )
    }
}

export default Subject
