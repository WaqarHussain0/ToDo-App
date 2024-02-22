import React, { useState } from "react";
import Row from "./common/Row";
import client from "../service";

const AddToDoItem = () => {
  const [formData, setFormData] = useState({ title: "", desc: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.desc) {
      alert("Both Title and Description fields are required.");
      return;
    }

    try {
      const response = await client.post("/items", formData);
      alert("Item Added");
      setFormData({ title: "", desc: "" });
    } catch (error) {
      console.error("Error adding trip:", error.message);
    }
  };

  return (
    <Row className="flex-col bg-white border-2 p-4 mb-6 lg:mb-0 lg:w-[34%] gap-4">
      <h6 className="font-bold">Add Todo list item here</h6>
      <input
        className="pl-2 py-2 border rounded"
        placeholder="Add heading"
        onChange={handleChange}
        type="text"
        name="title"
        id="title"
        value={formData.title}
      />
      <input
        className="pl-2 py-2 border rounded"
        placeholder="Add description"
        onChange={handleChange}
        type="text"
        name="desc"
        id="desc"
        value={formData.desc}
      />

      <button className="py-1 px-2 bg-green-500 text-white" onClick={handleAdd}>
        Add
      </button>
    </Row>
  );
};

export default AddToDoItem;
