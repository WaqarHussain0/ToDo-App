import React, { useState, useEffect } from "react";
import client from "../service";

const EditToDoItem = ({ itemData, onClose }) => {
  const [formData, setFormData] = useState({
    title: itemData.title || "",
    desc: itemData.desc || "",
  });

  useEffect(() => {
    setFormData({ title: itemData.title || "", desc: itemData.desc || "" });
  }, [itemData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    if (!formData.title || !formData.desc) {
      alert("Both Title and Description fields are required.");
      return;
    }

    try {
      const response = await client.put(`/items/${itemData._id}`, formData);
      alert("Item Updated");
      onClose(); // Close the modal after updating
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex justify-end mb-2">
          <button
            className="cursor-pointer rounded bg-gray-300 text-gray-700  px-2 py-1"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <h2 className="text-lg font-bold mb-4">Edit Item</h2>
        <input
          className="w-full mb-2 px-2 py-1 border rounded"
          type="text"
          placeholder="Add heading"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          className="w-full mb-4 px-2 py-1 border rounded"
          placeholder="Add description"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
        />
        <div className="flex justify-between">
          <button
            className="bg-indigo-500 text-white px-2 py-1 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditToDoItem;
