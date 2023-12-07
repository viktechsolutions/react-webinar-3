import React from 'react';
import './style.css';

function Pagination({ totalCount, currentPage, onChangePage }) {
  const totalPages = Math.ceil(totalCount / 10);

  const renderPageNumbers = () => {
    let pages = [];

    pages.push(
      <button key="page1" className={currentPage === 1 ? 'btn active' : 'btn'} onClick={() => onChangePage(1)}>1</button>
    );

    if (currentPage <= 3) {
      for (let i = 2; i <= Math.min(3, totalPages); i++) {
        pages.push(
          <button key={`page${i}`} className={currentPage === i ? 'btn active' : 'btn'} onClick={() => onChangePage(i)}>{i}</button>
        );
      }
    }

    if (currentPage === 3 && totalPages > 3) {
      pages.push(
        <button key="page4" onClick={() => onChangePage(4)} className='btn'>4</button>
      );
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(<span key="ellipsis1" className='ellipsis'>...</span>);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(currentPage + 1, totalPages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button key={`page${i}`} className={currentPage === i ? 'btn active' : 'btn'} onClick={() => onChangePage(i)}>{i}</button>
        );
      }
    }

    if (currentPage === totalPages - 2 || currentPage === totalPages - 1 || currentPage === totalPages) {
      pages.push(<span key="ellipsis2" className='ellipsis'>...</span>);
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(
          <button key={`page${i}`} className={currentPage === i ? 'btn active' : 'btn'} onClick={() => onChangePage(i)}>{i}</button>
        );
      }
    } else if (currentPage < totalPages - 1 && totalPages > 4) {
      pages.push(<span key="ellipsis3" className='ellipsis'>...</span>);
      pages.push(
        <button key={`page${totalPages}`} onClick={() => onChangePage(totalPages)} className='btn'>{totalPages}</button>
      );
    }

    return pages;
  };

  return (
    <div className="Pagination">
      {renderPageNumbers()}
    </div>
  );
}

export default Pagination;
