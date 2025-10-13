import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function ReportPaginator({ currentPage, totalPages, nextPage }) {
  const [maxVisiblePages, setMaxVisiblePages] = useState(8);
  
  // Effect to update the number of visible pages based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 520) {
        setMaxVisiblePages(5); // Show fewer pages on small screens
      } else {
        setMaxVisiblePages(8); // Show more pages on larger screens
      }
    };
    handleResize(); // Set initial value on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage;
    const half = Math.floor(maxVisiblePages / 2);

    if (currentPage <= half) {
      startPage = 1;
    } else if (currentPage + half >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
    } else {
      startPage = currentPage - half + (maxVisiblePages % 2 === 0 ? 0 : 1) ;
    }
    
    const endPage = startPage + maxVisiblePages - 1;
    return Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="report-paginator" aria-label="Page navigation">
      <button className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`} aria-label="Previous" onClick={() => { if (currentPage > 1) nextPage(currentPage - 1); }}>
        <ArrowLeft/>
      </button>

      <ul className="report-paginator-pages">
        {pageNumbers.map((page) => (
            <li key={page} className={`report-paginator-page ${currentPage === page ? 'active' : ''}`}>
              <span className="report-page-link"  onClick={(e) => { e.preventDefault(); nextPage(page); }}>{page}</span>
            </li>
          )
        )}
      </ul>
      
      <button className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`} aria-label="Next" onClick={() => { if (currentPage < totalPages) nextPage(currentPage + 1); }}>
        <ArrowRight />
      </button>
    </nav>
  );
}

export default ReportPaginator