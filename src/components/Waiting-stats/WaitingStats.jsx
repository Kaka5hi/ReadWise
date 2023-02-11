import React from 'react'
import './WaitingStats.css'

const WaitingStats = ({ id }) => {

    const [stats, setStats] = React.useState({})
    
    const fetchStats = async (id) => {
        try {
            const res = await fetch(`https://openlibrary.org/works/${id}/bookshelves.json`)
            const data = await res.json()
            setStats(data?.counts)
        } catch (error) {
            console.log(error);
        }
    }


    React.useEffect(() => {
        fetchStats(id)
        return (() => {
            window.scrollTo(0, 0);
        })
    }, [])

    return (
        <div className='waiting-stats'>
            <article>
                <span>want to read :</span>
                <span>{ stats?.want_to_read}</span>
            </article>
            <article>
                <span>currently reading :</span>
                <span>{ stats?.currently_reading}</span>
            </article>
            <article>
                <span>already read :</span>
                <span>{ stats?.already_read}</span>
            </article>
        </div>
    )
}

export default WaitingStats
