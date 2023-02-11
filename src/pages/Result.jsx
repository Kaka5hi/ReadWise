import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SearchComponent from '../components/Search-component/SearchComponent'
import SingleBook from '../components/Single-book/SingleBook'
import {IoIosClose} from 'react-icons/io'
import './Result.css'

const Result = () => {

    const param = useParams()
    const navigate = useNavigate()
    const [queryData, setQueryData] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [noResult, setNoResult] = React.useState(false)
    const [showPageBtns, setShowPageBtns] = React.useState(false)

    const fetchResult = async(query) => {
        try {
            const res = await fetch(`https://openlibrary.org/search.json?q=${query}&mode=ebooks&has_fulltext=true&mode=ebooks&limit=10&offset=${page*10}`)
            const data = await res.json()
            if (data?.numFound === 0) {
                setNoResult(true)
            } else {
                setQueryData(data)
                setShowPageBtns(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const nextPage = () => {
        if (page <= 10) {
            setPage(prev => prev + 1)
        }
    }

    const prevPage = () => {
        if (page >= 1) {
            setPage(prev => prev - 1)
        }
    }

    // tracking page count
    const remainingPageCount = () => {
        if(queryData?.numFound < 10) return 0
        return (Math.round(((queryData?.numFound) - ((page) * 10)))/10);
    }

    // starting result number
    const startingResultNumberCount = () => {
        return ((queryData?.start) + 1)
    }

    // ending result number
    const lastResultNumberCount = () => {
        if (queryData?.numFound < 10) {
            return queryData?.numFound
        } else {
            const pageRemaining = remainingPageCount()
            const lastNumberCount = (((page) + 1) * 10)
            if (pageRemaining > 1) {
                return lastNumberCount 
            } else {
                return (lastNumberCount + (queryData?.numFound - lastNumberCount))
            }
        }
    }

    const handleSearchReset = () => {
        navigate('/search-page')
    }

    React.useEffect(() => {
        fetchResult(param?.query)
        return (() => {
            window.scrollTo(0, 0);
            setShowPageBtns(false)
            setNoResult(false)
            setQueryData([])
        })
    }, [page, param?.query])

    if (noResult) {
        return (
            <div className="result-section">
                <div className="no-result-section">
                    <p>No result found for "<span>{param?.query}</span>"</p>
                    <p>try again</p>
                    <SearchComponent />
                    <p>or</p>
                    <Link to='/'>Go back home</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className='result-section'>
                {
                    showPageBtns
                    &&
                    <div className="top">
                        <h3>All results for "{param?.query}" <button title='Reset result' onClick={handleSearchReset}><IoIosClose />{param?.query}</button></h3>
                        <span>{(queryData?.numFound < 10 && queryData?.num_found < 10) ? 'Result' : 'Results'} found: {queryData?.numFound || queryData?.num_found}</span>
                        
                    </div>
                }
                {
                    showPageBtns
                        ?   ''
                        :   <div className="loader-container">
                                <span className="loader"></span>
                            </div>
                }
                <div className="inner-main">
                    {
                        queryData?.docs?.map((item, index) => <SingleBook key={index} item={ item}/>)
                    }
                </div>
                {
                    showPageBtns
                    &&
                    <div className="bottom">
                        <div className="result-count">
                            <span>Showing {startingResultNumberCount()} to {lastResultNumberCount()} out of {queryData?.numFound || queryData?.num_found }</span>
                        </div>
                        <div className="btns">
                            {
                                page > 0 && <button title='Previous page' onClick={prevPage}>prev</button>
                            }
                            {
                                remainingPageCount() > 1 && <button title='Next page' onClick={nextPage}>next</button>
                            }
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default Result
