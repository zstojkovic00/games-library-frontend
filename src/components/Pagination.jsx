import React from 'react';

const Pagination = ({gamesPerPage, totalGames, setCurrentPage, currentPage}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className='pagination'>
            {pageNumbers.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? "active" : ""}>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;