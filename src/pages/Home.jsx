import React from 'react'
import IntroSection from '../components/Intro-section/IntroSection'
import PreSubject from '../components/Pre-subjects/PreSubject'
import SearchComponent from '../components/Search-component/SearchComponent'
import SingleSection from '../components/Single-section/SingleSection'
import SubjectBooks from '../components/Subject-books/SubjectBooks'
import './Home.css'

const Home = () => {

    const otherSubject = ['humor', 'thriller', 'fiction']
    const localSubjects = ['music', 'science fiction', 'fantasy', 'programming', 'history']

    return (
        <div className='home-page'>
            <IntroSection />
            <SearchComponent />
            <div className="popular-section">
                <h2>Explore books for popular Subjects</h2>
                <div className="inner">
                    {
                        localSubjects?.map(item => <PreSubject key={item} keyword={item}/>)
                    }
                </div>
            </div>
            <SingleSection type='trending' />
            <p>Say goodbye to limited library hours and hello to a world of unlimited reading possibilities.</p>
            {
                otherSubject?.map(item => <SubjectBooks key={item} keyword={item}/>)
            }
        </div>
    )
}

export default Home
