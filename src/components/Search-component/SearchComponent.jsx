import React from 'react'
import { useNavigate } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import './SearchComponent.css'

const SearchComponent = () => {

    const navigate = useNavigate()

    const [userInput, setUserInput] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search-result/${userInput}`)
        setUserInput('')
    }

    return (
        <div className='search-component'>
            <h3>Search</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    placeholder="Search book by title or author name"
                    autoComplete="off"
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <BsSearch />
            </form>
        </div>
    )
}

export default SearchComponent
