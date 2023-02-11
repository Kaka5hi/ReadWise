import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SharedLayout from './pages/SharedLayout'
import Home from './pages/Home'
import Result from './pages/Result'
import Error from './pages/Error'
import BookDetail from './pages/BookDetail'
import Subject from './pages/Subject'
import SearchPage from './pages/SearchPage'
import TopTenBooks from './pages/TopTenBooks'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SharedLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/search-result/:query' element={<Result />} />
                    <Route path='/search-page' element={<SearchPage />} />
                    <Route path='/book-detail/works/:id' element={<BookDetail />} />
                    <Route path='/top-10-books/:subject' element={<TopTenBooks />} />
                    <Route path='/subject/:type' element={<Subject />} />
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
