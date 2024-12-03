import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://localhost:44331/api/Category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Add category
  const addCategory = () => {
    axios
      .post("https://localhost:44331/api/Category/AddCategory", {
        name: newCategoryName,
      })
      .then((response) => {
        setCategories([...categories, response.data]);
        setNewCategoryName("");
      })
      .catch((error) => console.error("Error adding category:", error));
  };

  // Edit category
  const editCategory = () => {
    axios
      .put(`https://localhost:44331/api/Category/${editCategoryId}`, {
        id: editCategoryId,
        name: editCategoryName,
      })
      .then(() => {
        setCategories(
          categories.map((category) =>
            category.id === editCategoryId
              ? { ...category, name: editCategoryName }
              : category
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error updating category:", error));
  };

  // Delete category
  const deleteCategory = (id) => {
    axios
      .delete(`https://localhost:44331/api/Category/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Category Manager</h1>

      {/* Add Category */}
      <div className="mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border p-2 rounded"
          placeholder="New Category Name"
        />
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <table className="w-full table-auto border-collapse mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Category Name</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-4 py-2 border">{category.id}</td>
              <td className="px-4 py-2 border">{category.name}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => {
                    setEditCategoryId(category.id);
                    setEditCategoryName(category.name);
                    setIsModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <input
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              className="border p-2 rounded mb-4 w-full"
            />
            <button
              onClick={editCategory}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Update Category
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white p-2 rounded w-full mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
