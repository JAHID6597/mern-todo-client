import React from 'react';

const SearchInput = (props) => {
  const { searchValue, handleChangeSearchValue } = props;
  return (
    <div className="form-floating mb-3">
      <input
        type="search"
        className="form-control"
        id="floatingSearchInput"
        placeholder="Search From Here..."
        value={searchValue}
        onChange={(e) => handleChangeSearchValue(e)}
      />
      <label htmlFor="floatingSearchInput">Search From Here...</label>
    </div>
  );
};

export default SearchInput;
