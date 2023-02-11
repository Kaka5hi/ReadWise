import React from 'react'

const AuthorName = ({ authorInfo }) => {

    const [authorData, setAuthorData] = React.useState({})

    const fetchAutor = async () => {
        try {
            const res = await fetch(`https://openlibrary.org${authorInfo?.author?.key}.json`)
            const data = await res.json()
            setAuthorData(data)
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        fetchAutor()
    }, [])

    return (
        <div className='author-name'>
            <span>by {authorData?.name}</span>
        </div>
    )
}

export default AuthorName
