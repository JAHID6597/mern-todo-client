import React from 'react';

const ListItem = (props) => {
  const { sitem, handleClickEditBtn, handleClickDeleteBtn } = props;
  const { _id, text } = sitem;
  return (
    <li className="list-group-item d-flex">
      <div className="flex-grow-1 py-2 text-break">{text}</div>
      <div className="p-md-2 py-2 px-1">
        <i
          className="fas fa-edit editIcon"
          onClick={() => handleClickEditBtn(_id)}
        />
      </div>
      <div className="p-md-2 py-2 px-1">
        <i
          className="fas fa-trash deleteIcon"
          onClick={() => handleClickDeleteBtn(_id)}
        />
      </div>
    </li>
  );
};

export default ListItem;
