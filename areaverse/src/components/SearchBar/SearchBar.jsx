import React, { useEffect, useRef, useState } from 'react'
import './SearchBar.css'
import { Search } from 'lucide-react'
import SearchModal from './SearchModal';
import { triggerHaptic } from '../../utils/CommonFunctions';
function SearchBar() {
  const [showSearchModal, toggleSearchModal] = useState(false);
  const searchBtnRef                         = useRef(null);
  const searchInterfaceRef                   = useRef(null);
  const searchOverlayRef                     = useRef(null);

  useEffect(() => {
    const searchInterface = searchInterfaceRef.current;
    if (!searchInterface) return;

    if (showSearchModal) {
      // FLIP Animation: Opening
      const startRect = searchBtnRef.current.getBoundingClientRect();
      const endRect = searchInterface.getBoundingClientRect();

      const deltaX = startRect.left - endRect.left;
      const deltaY = startRect.top - endRect.top;
      const deltaW = startRect.width / endRect.width;
      const deltaH = startRect.height / endRect.height;

      searchInterface.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;

      requestAnimationFrame(() => {
        searchInterface.classList.add('is-animating');
        searchInterface.style.transform = 'translate(-50%, -50%)';
        searchInterface.style.opacity   = '1';
      });

      searchInterface.addEventListener('transitionend', () => {
        searchInterface.classList.remove('is-animating');
      }, { once: true });
    }
  }, [showSearchModal]);

  const handleClose = () => {
    triggerHaptic('light');
    const searchInterface = searchInterfaceRef.current;
    const startRect       = searchBtnRef.current.getBoundingClientRect();
    const endRect         = searchInterface.getBoundingClientRect();

    const deltaX = startRect.left - endRect.left;
    const deltaY = startRect.top - endRect.top;
    const deltaW = startRect.width / endRect.width;
    const deltaH = startRect.height / endRect.height;
    
    requestAnimationFrame(() => {
      searchInterface.classList.add('is-animating');
      
      searchInterface.style.opacity   = '0';
      searchInterface.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;
      
    });

    searchInterface.addEventListener('transitionend', () => {
      searchInterface.style.transform = '';
      searchInterface.classList.remove('is-animating');
      
      toggleSearchModal(false)
      
    }, { once: true });
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === searchOverlayRef.current) {
        handleClose();
    }
  };
  return (
    <React.Fragment>
        <div className="search-container">
            <button ref={searchBtnRef} className="search-button" id="SearchBtn" onClick={() => toggleSearchModal(true)}>
                <span>
                    <Search />
                    &nbsp;Search
                </span>
                <div className="search-words-container">
                    <div className="search-words">
                        <span className="search-word">Reports...</span>
                        <span className="search-word">Users...</span>
                        <span className="search-word">Neighborhoods...</span>
                        <span className="search-word">Reports...</span>
                    </div>
                </div>
            </button>
        </div>
        {
            showSearchModal && <SearchModal handleOverlayClick={handleOverlayClick} searchOverlayRef={searchOverlayRef} searchInterfaceRef={searchInterfaceRef} handleSearchModalDisplay={handleClose}/>
        }
    </React.Fragment>
  )
}

export default SearchBar