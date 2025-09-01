import React, { useState } from 'react'
import './SearchBar.css'
import { Search } from 'lucide-react'
function SearchBar() {
    const [displaySearchBar, setSearchBarDisplay] = useState(false)
    function toggleSearchBar() {
        setSearchBarDisplay(!displaySearchBar)
    }
    return (
        <div className="search-container">
            <div className={`search-bar ${displaySearchBar ? 'open focused' : ''}`}id="searchBar" onClick={toggleSearchBar}>
                <button className="search-toggle" id="searchToggle">
                    <Search />
                </button>
                <select className='search-select'>
                    <option value="all">All</option>
                    <option value="users">Users</option>
                    <option value="posts">Posts</option>
                    <option value="comments">Comments</option>
                </select>
                <input className='search-input' type="text" id="searchInput" placeholder="" />
                <button className="search-submit">
                    <Search />
                </button>
            </div>
        </div>
    )
}

export default SearchBar