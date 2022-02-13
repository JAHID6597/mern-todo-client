import React from 'react';

const ItemForm = (props) => {
  const {
    handleSubmit,
    handleChange,
    currentValue,
    addItemBtn,
    inputItemPlaceholder,
  } = props;
  return (
    <div className="toDoItemFormMainDiv">
      <form className="toDoItemForm" onSubmit={handleSubmit}>
        <div className="input-group input-group-lg">
          <div className="form-floating flex-grow-1">
            <input
              type="text"
              className="form-control"
              id="floatingItemInput"
              name="text"
              placeholder={inputItemPlaceholder}
              value={currentValue}
              required
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="floatingItemInput">{inputItemPlaceholder}</label>
          </div>
          <button
            type="submit"
            className="input-group-text flex-sm-grow-0 flex-grow-1 item-btn btn-primary"
          >
            {addItemBtn ? 'Add' : 'Edit'} Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
