import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './Home.css';

function Home() {
  const [title, setTitle] = useState("AreaVerse - Home");

  useEffect(() => {
    document.title = title;
  }, [title])
  const { user } = useSelector((state) => state.auth)
  return (
    <React.Fragment>
      <h1 className="hero-title">
        Welcome, <span className='highlight'>{user.username} !!!</span>
      </h1>
    </React.Fragment>
  )
}

export default Home;