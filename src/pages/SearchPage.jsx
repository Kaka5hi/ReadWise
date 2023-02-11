import React from 'react'
import SearchComponent from '../components/Search-component/SearchComponent'
import './SearchPage.css'

const SearchPage = () => {
    return (
        <div className='search-page'>
            <h2>Welcome to the search page of ReadWise, your ultimate library for books.</h2>
            <SearchComponent />
            <p>Whether you're looking for your next favorite book or searching for specific information, our search feature has got you covered.</p>

            <p>You can start your search by simply entering the book title, book author, or subject in the search bar. Our platform will instantly show you relevant results, making it easy for you to find what you're looking for</p>
        </div>
    )
}

export default SearchPage
