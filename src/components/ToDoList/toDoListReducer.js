const toDoListReducer = (state, action) => {
  const { type, payload } = action;
  const { items } = state;

  if (type === 'CURRENT_INPUT_VALUE_CHANGE') {
    return { ...state, currentValue: payload };
  } else if (type === 'SUBMIT_FORM') {
    return {
      ...state,
      items: [{ _id: payload._id, text: payload.text }, ...items],
    };
  } else if (type === 'ACTIVE_EDIT_BTN') {
    return { ...state, addItemBtn: false, currentValue: payload };
  } else if (type === 'ACTIVE_ADD_BTN') {
    return { ...state, addItemBtn: true };
  } else if (type === 'DELETE_ITEM') {
    return { ...state, items: payload };
  } else if (type === 'INPUT_PLACEHOLDER') {
    return { ...state, inputItemPlaceholder: payload };
  } else if (type === 'UPDATE_EDIT_ITEM_ID') {
    return { ...state, editItemId: payload };
  } else if (type === 'UPDATE_LIST') {
    return { ...state, items: payload };
  } else if (type === 'UPDATE_CURRENT_PAGE') {
    return { ...state, currentPage: payload };
  } else if (type === 'SEARCH_VALUE_CHANGE') {
    return { ...state, searchValue: payload, currentPage: 1 };
  } else {
    return { ...state };
  }
};

export default toDoListReducer;
