import { Search } from 'lucide-react'
import React from 'react'

function SearchModal({ handleSearchModalDisplay, searchOverlayRef, searchInterfaceRef, handleOverlayClick }) {
  return (
    <div ref={searchOverlayRef} className="search-overlay" id="searchOverlay" onClick={handleOverlayClick}>
        <div ref={searchInterfaceRef} className="search-interface" id="searchInterface">
            <select>
                <option>Posts</option>
                <option>Neighborhoods</option>
                <option>Users</option>
            </select>
            <input type="text" placeholder="Enter search term..."/>
            <button><Search/></button>
            <button className="close-btn" id="closeSearchBtn" onClick={handleSearchModalDisplay}>&times;</button>
        </div>
    </div>
  )
}

export default SearchModal