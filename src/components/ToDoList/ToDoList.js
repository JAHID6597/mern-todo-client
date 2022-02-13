import React, { useReducer, useEffect } from 'react';
import Pagination from '../common/pagination/Pagination';
import ItemForm from './ItemForm';
import ListItems from './ListItems';
import './toDoList.css';
import toDoListReducer from './toDoListReducer';

const BASE_ENDPOINT = 'https://mern-to-do-list-app.herokuapp.com';

const initialLists = {
  items: [],
  currentValue: '',
  addItemBtn: true,
  inputItemPlaceholder: 'Enter Item From Here...',
  editItemId: '',
  currentPage: 1,
  itemEachPage: 5,
  searchValue: '',
};

const ToDoList = () => {
  const [lists, dispatch] = useReducer(toDoListReducer, initialLists);
  const {
    items,
    currentValue,
    addItemBtn,
    inputItemPlaceholder,
    editItemId,
    currentPage,
    itemEachPage,
    searchValue,
  } = lists;

  /* useEffect for fetching all items */
  useEffect(() => {
    /* FETCH BACKEND ITEMS */
    fetch(BASE_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        if (searchValue)
          dispatch({
            type: 'UPDATE_LIST',
            payload: data.filter((item) => ((item.text).toLowerCase()).startsWith(searchValue.toLowerCase())),
          });
        else dispatch({ type: 'UPDATE_LIST', payload: data });
      });
  }, [searchValue]);
  /* /useEffect for fetching all items */

  /* HANDLE FORM SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addItemBtn) {
      /* Backend Item Save */
      await fetch(`${BASE_ENDPOINT}/addNewItem`, {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify({
          text: currentValue,
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          dispatch({
            type: 'SUBMIT_FORM',
            payload: { _id: data._id, text: data.text },
          })
        );
      /* /Backend Item Save */
    } else {
      /* Backend Item Update */
      await fetch(`${BASE_ENDPOINT}/updateItem/${editItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify({
          text: currentValue,
        }),
      });
      /* /Backend Item Update */

      const editItemIndex = items.findIndex((item) => item._id === editItemId);
      const editItemList = [...items];
      editItemList[editItemIndex].text = currentValue;

      dispatch({ type: 'UPDATE_LIST', payload: editItemList });
    }
    dispatch({
      type: 'INPUT_PLACEHOLDER',
      payload: 'Enter Item From Here...',
    });
    dispatch({ type: 'CURRENT_INPUT_VALUE_CHANGE', payload: '' });
    dispatch({ type: 'ACTIVE_ADD_BTN' });
    dispatch({ type: 'SEARCH_VALUE_CHANGE', payload: '' });
  };
  /* /HANDLE FORM SUBMIT */

  /* HANDLE ON INPUT VALUE CHANGE */
  const handleChange = (e) => {
    dispatch({ type: 'CURRENT_INPUT_VALUE_CHANGE', payload: e.target.value });
  };
  /* /HANDLE ON INPUT VALUE CHANGE */

  /* HANDLE EDIT BUTTON */
  const handleClickEditBtn = (id) => {
    const editableItemValue = items.filter((item) => item._id === id)[0].text;
    dispatch({ type: 'ACTIVE_EDIT_BTN', payload: editableItemValue });
    dispatch({ type: 'UPDATE_EDIT_ITEM_ID', payload: id });
    dispatch({ type: 'INPUT_PLACEHOLDER', payload: 'Edit Item From Here...' });
  };
  /* /HANDLE EDIT BUTTON */

  /* HANDLE DELETE BUTTON */
  const handleClickDeleteBtn = async (id) => {
    const newItems = items.filter((item) => item._id !== id);

    /* Backend Item Delete */
    await fetch(`${BASE_ENDPOINT}/deleteItem/${id}`, {
      method: 'DELETE',
    });
    /* /Backend Item Delete */

    dispatch({ type: 'DELETE_ITEM', payload: newItems });
    dispatch({ type: 'ACTIVE_ADD_BTN' });
    dispatch({ type: 'CURRENT_INPUT_VALUE_CHANGE', payload: '' });
    dispatch({ type: 'INPUT_PLACEHOLDER', payload: 'Enter Item From Here...' });
  };
  /* /HANDLE DELETE BUTTON */

  /* HANDLE CURRENT PAGE INDEX */
  const paginatedItemClicked = (pageIdx) => {
    dispatch({ type: 'UPDATE_CURRENT_PAGE', payload: pageIdx });
  };
  /* /HANDLE CURRENT PAGE INDEX */

  /* HANDLE ON SEARCH VALUE CHANGE */
  const handleChangeSearchValue = (e) => {
    dispatch({ type: 'SEARCH_VALUE_CHANGE', payload: e.target.value });
  };
  /* /HANDLE ON SEARCH VALUE CHANGE */

  return (
    <div className="toDoListMainDiv">
      <div className="toDoListContent">
        <h1 className="toListMainTitle mb-3">To Do List</h1>
        <ItemForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          currentValue={currentValue}
          addItemBtn={addItemBtn}
          inputItemPlaceholder={inputItemPlaceholder}
        />
        <ListItems
          currentPageItems={items.slice(
            (currentPage - 1) * itemEachPage,
            currentPage * itemEachPage
          )}
          allItems={items}
          handleClickEditBtn={handleClickEditBtn}
          handleClickDeleteBtn={handleClickDeleteBtn}
          searchValue={searchValue}
          handleChangeSearchValue={handleChangeSearchValue}
        />
        {items.length > itemEachPage && (
          <Pagination
            items={items}
            currentPage={currentPage}
            itemEachPage={itemEachPage}
            paginatedItemClicked={paginatedItemClicked}
          />
        )}
      </div>
    </div>
  );
};

export default ToDoList;
