import { Search } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { triggerHaptic } from '../../../utils/CommonFunctions';
import api from '../../../api/axios';
import PostSearchResult from './PostSearchResult';
import UserSearchResult from './UserSearchResult';
import NeighborhoodSearchResult from './NeighborhoodSearchResult';

function SearchModal({ handleSearchModalDisplay, searchOverlayRef, searchInterfaceRef, handleOverlayClick }) {
  const [searchType , setSearchType ] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [resultsPage, setResultsPage] = useState(1);
  const [fetchingRes, setFetchingRes] = useState(false);
  const [hasMoreRes , setHasMoreRes ] = useState(null);
  const [searchRslts, setSearchRslts] = useState([]);
  
  const observerRef                   = useRef();
  const lastResultElementRef = useCallback( node => {
    if (fetchingRes) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver( entries => {
    if( entries[0].isIntersecting && hasMoreRes){
      setResultsPage(prevPage => prevPage + 1);
    }
    });
    if (node) observerRef.current.observe(node);
  }, [fetchingRes, hasMoreRes]);

  async function handleSearch(){
    triggerHaptic('light');
    setFetchingRes(true);
    try {
      const result = await api.get(`/search?query=${searchQuery}&type=${searchType}&page=${resultsPage}&limit=5`);
      const data   = result?.data?.results;
      if(data?.length > 0 ){
        setSearchRslts([...data])
        setHasMoreRes(true)
      }else{
        setHasMoreRes(false)
      }
      setFetchingRes(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(resultsPage > 1 && hasMoreRes) {
      setFetchingRes(true);
       api.get(`/search?query=${searchQuery}&type=${searchType}&page=${resultsPage}&limit=5`).then((result) => {
        const data   = result?.data?.results;
        if(data?.length > 0 ){
          setSearchRslts((curr) => [...curr, ...data])
        } else{
          setHasMoreRes(false);
        }
        setFetchingRes(false);
       }).catch((err) => {
        setFetchingRes(false);
        setHasMoreRes(false);
        console.log(err)
       });
    }
  }, [resultsPage])
  return (
    <div ref={searchOverlayRef} className="search-overlay" id="searchOverlay" onClick={handleOverlayClick}>
        <div ref={searchInterfaceRef} className={`search-interface ${searchRslts.length > 0 || fetchingRes ? 'has-results' : ''}`} id="searchInterface">
            <div className="search-controls">
              <select value={searchType} onChange={(evnt) => setSearchType(evnt.target.value)}>
                <option value="all">All</option>
                <option value="posts">Posts</option>
                <option value="neighborhoods">Neighborhoods</option>
                <option value="users">Users</option>
              </select>
              <input type="text" placeholder="Enter search term..." value={searchQuery} onChange={(evnt) => setSearchQuery(evnt.target.value)}/>
              <button onClick={handleSearch}><Search/></button>
              <button className="close-btn" id="closeSearchBtn" onClick={handleSearchModalDisplay}>&times;</button>
            </div>
            <div className="search-results-list">
              {
                searchRslts && 
                searchRslts?.map((result, index) => {
                  const isLastElement = searchRslts.length === index + 1;
                  let resultComponent;
                  switch(result?.source){
                    case "post"        : resultComponent = <PostSearchResult data={result}/>;
                                          break;
                    case "user"        : resultComponent = <UserSearchResult data={result}/>;
                                          break;
                    case "neighborhood": resultComponent = <NeighborhoodSearchResult data={result}/>;
                                          break;
                    default             : resultComponent = null;
                  }
                  return <div ref={isLastElement ? lastResultElementRef : null} key={index}>{resultComponent}</div>;
                })
              }
              {fetchingRes && (
                <React.Fragment>
                  <div className="skeleton-item">
                    <div className="skeleton-avatar"/>
                    <div className="skeleton-text-group">
                      <div className="skeleton-text title"/>
                      <div className="skeleton-text subtitle"/>
                    </div>
                  </div>
                  <div className="skeleton-item">
                    <div className="skeleton-avatar"/>
                    <div className="skeleton-text-group">
                      <div className="skeleton-text title"/>
                      <div className="skeleton-text subtitle"/>
                    </div>
                  </div>
                  <div className="skeleton-item">
                    <div className="skeleton-avatar"/>
                    <div className="skeleton-text-group">
                      <div className="skeleton-text title"/>
                      <div className="skeleton-text subtitle"/>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
        
        </div>
    </div>
  )
}

export default SearchModal