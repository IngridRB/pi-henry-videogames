import "./paginated.css";
import React from 'react';

const Paginated = ({  videogamesPerPage, allVideogames, changeCurrentPage, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <div className="footer">
      <button className="footer-button" onClick={prevPage} disabled={currentPage === pageNumbers[0] ? true : false}>
        <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
      </button>
      { pageNumbers && 
        pageNumbers.map(number => (
          <button className={`footer-button ${currentPage === number ? 'active' : ''}`} key={number} 
            onClick={() => changeCurrentPage(number)}>{ number }</button>
        ))
      }
      <button className="footer-button" onClick={nextPage} disabled={currentPage === pageNumbers.length ? true : false}>
        <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
      </button>
    </div>
  )
}

export default Paginated;