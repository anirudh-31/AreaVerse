import React, { useEffect, useRef, useState } from 'react'
import './SearchBar.css';
import SearchModal from './components/SearchModal';
import { triggerHaptic } from '../../utils/CommonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSearchPanelDisplay } from '../../features/config/configSlice'
function SearchBar() {
  const [showSearchModal, toggleSearchModal] = useState(false);
  const { displaySearchPanel }               = useSelector( (state) => state.config);
  const dispatch                             = useDispatch();
  const searchBtnRef                         = useRef(null);
  const searchInterfaceRef                   = useRef(null);
  const searchOverlayRef                     = useRef(null);

  useEffect(() => {
    const searchInterface = searchInterfaceRef.current;
    if (!searchInterface) return;

    if (displaySearchPanel) {
      triggerHaptic('light');

      requestAnimationFrame(() => {
        searchInterface.classList.add('is-animating');
        searchInterface.style.transform = 'translate(-50%, -50%)';
        searchInterface.style.opacity   = '1';
      });

      searchInterface.addEventListener('transitionend', () => {
        searchInterface.classList.remove('is-animating');
      }, { once: true });
    }
  }, [displaySearchPanel]);

  const handleClose = () => {
    triggerHaptic('light');
    const searchInterface = searchInterfaceRef.current;
    
    
    requestAnimationFrame(() => {
      searchInterface.classList.add('is-animating');
      searchInterface.style.opacity   = '0';
      
    });

    searchInterface.addEventListener('transitionend', () => {
      searchInterface.style.transform = '';
      searchInterface.classList.remove('is-animating');
    }, { once: true });
    dispatch(toggleSearchPanelDisplay());
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === searchOverlayRef.current) {
      handleClose();
    }
  };
  return (
    <React.Fragment>
        {
            displaySearchPanel && <SearchModal handleOverlayClick={handleOverlayClick} searchOverlayRef={searchOverlayRef} searchInterfaceRef={searchInterfaceRef} handleSearchModalDisplay={handleClose}/>
        }
    </React.Fragment>
  )
}

export default SearchBar