import React from 'react';
import SearchInput from '../common/searchInput/SearchInput';
import ListItem from './ListItem';

const ListItems = (props) => {
  const {
    currentPageItems,
    allItems,
    handleClickEditBtn,
    handleClickDeleteBtn,
    searchValue,
    handleChangeSearchValue,
  } = props;
  return (
    <div className="my-3">
      {/* Search Box */}
      <SearchInput
        searchValue={searchValue}
        handleChangeSearchValue={handleChangeSearchValue}
      />
      {/* /Search Box */}

      <h3 className="text-center mb-3">
        Total Number of items: {allItems.length}
      </h3>

      {/* Current Page Items */}
      <ul className="list-group">
        {currentPageItems.map((item) => (
          <ListItem
            key={item._id}
            sitem={item}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
        ))}
      </ul>
      {/* /Current Page Items */}
    </div>
  );
};

export default ListItems;
