import React, { useEffect, useState } from "react";
import Row from "./common/Row";
import client from "../service";
import EditToDoItem from "./EditToDoItem"; // Import EditToDoItem component

const ToDoList = () => {
  const [itemList, setItemList] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState(null); // State to hold data for editing

  const getToDoList = async () => {
    try {
      const res = await client.get("/items");
      setItemList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToDoList();
  }, [itemList]);

  const handleDeleteConfirmation = (id) => {
    setDeleteItemId(id);
  };

  const handleDelete = async () => {
    try {
      await client.delete(`/items/${deleteItemId}`);
      setItemList(itemList.filter((item) => item._id !== deleteItemId));
      setDeleteItemId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = itemList.find((item) => item._id === id);
    setEditItemData(itemToEdit); // Set the data for editing
    setEditItemId(id);
  };

  const handleCloseEdit = () => {
    setEditItemId(null);
    setEditItemData(null); // Clear the edit item data
  };

  return (
    <Row className="lg:w-[65%] bg-white border-2 p-1 lg:p-4 flex-col ">
      <Row className="w-full justify-between text-[20px] border-b mb-2">
        <h2 className="lg:w-[85%] font-bold">List</h2>
        <h2 className="lg:w-[14%] text-center">Actions</h2>
      </Row>

      {itemList.map((item, index) => (
        <Row
          key={index}
          className=" border-b py-1 w-full justify-between items-center"
        >
          <Row className="flex-col w-[85%] ">
            <h2 className="font-medium text-[16px]">{item.title}</h2>
            <h2 className="font-light text-[14px] pl-2">{item.desc}</h2>
          </Row>
          <div className="flex flex-col lg:flex-row items-center lg:justify-between lg:w-[14%] gap-1 lg:gap-0 text-white ">
            <button
              className="cursor-pointer rounded bg-gray-300 text-gray-700  px-2 py-1"
              size={20}
              onClick={() => handleEdit(item._id)} // Set editItemId when edit button is clicked
            >
              Edit
            </button>
            <button
              className="cursor-pointer rounded bg-red-500 px-2 py-1"
              size={20}
              onClick={() => handleDeleteConfirmation(item._id)}
            >
              Delete
            </button>
          </div>
        </Row>
      ))}

      {/* Confirmation Modal */}
      {deleteItemId && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="mb-2">Are you sure you want to delete this item?</p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setDeleteItemId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editItemId && (
        <EditToDoItem itemData={editItemData} onClose={handleCloseEdit} />
      )}
    </Row>
  );
};

export default ToDoList;
