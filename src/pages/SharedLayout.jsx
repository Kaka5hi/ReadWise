import React from 'react'
import { Outlet, Link } from "react-router-dom";
import { MdDarkMode} from 'react-icons/md'
import { BsSunFill} from 'react-icons/bs'
import './SharedLayout.css'
import Footer from '../components/Footer/Footer';

const SharedLayout = () => {

    const [darkMode, setDarkMode] = React.useState(false)

    return (
        <div className={`shared-layout ${darkMode ? 'dark-mode' : 'light-mode '}`}>
            <div className='shared-layout-nav'>
                <div className="nav-logo">
                    <Link to='/'>ReadWise</Link>
                </div>

                <div className="nav-links">
                    <button onClick={() => setDarkMode(prev => !prev)} >{darkMode ?<MdDarkMode title='Dark mode'/>  :  <BsSunFill title='Light mode'/>}</button>
                </div>
            </div>

            <div className="main-inner">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default SharedLayout
