import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './Home.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import ActionButtons from '../../components/FloatingActionButtons/ActionButtons';

function Home() {
  const [title, setTitle] = useState("AreaVerse - Home");

  useEffect(() => {
    document.title = title;
  }, [title])
  const { user } = useSelector((state) => state.auth)
  return (
    <React.Fragment>
      <div className="home-container">
        <SearchBar />
        <ActionButtons />
      </div>
      
      
    </React.Fragment>
  )
}

export default Home;