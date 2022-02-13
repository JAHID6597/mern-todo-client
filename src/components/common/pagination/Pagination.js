import React from 'react';
import './pagination.css'

const Pagination = (props) => {
  const { items, currentPage, itemEachPage, paginatedItemClicked } = props;
  const totalPages = Math.ceil(items.length / itemEachPage);
  const pages = Array.from(Array(totalPages).keys());

  const is_previos_next_active_class = (type) => {
    if (items.length < itemEachPage + 1) return 'd-none';

    if (type === 'PREVIOUS') {
      if (currentPage <= 1) return 'disabled';
    }
    if (type === 'NEXT') {
      if (currentPage >= totalPages) return 'disabled';
    }
  };

  const paginated_item_active_class = (currentPage, pageIdx) => {
    return currentPage === pageIdx ? 'active' : '';
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li
          className={`page-item ${is_previos_next_active_class('PREVIOUS')}`}
          onClick={() => {
            currentPage > 1 && paginatedItemClicked(currentPage - 1);
          }}
        >
          <span className="page-link">Previous</span>
        </li>
        {pages.map((pageIdx) => (
          <li
            key={Math.random()}
            className={`page-item ${paginated_item_active_class(
              currentPage,
              pageIdx + 1
            )}`}
            onClick={() => paginatedItemClicked(pageIdx + 1)}
          >
            <span className="page-link">{pageIdx + 1}</span>
          </li>
        ))}
        <li className="page-item">
          <li
            className={`page-item ${is_previos_next_active_class('NEXT')}`}
            onClick={() => {
              currentPage < totalPages && paginatedItemClicked(currentPage + 1);
            }}
          >
            <span className="page-link">Next</span>
          </li>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
