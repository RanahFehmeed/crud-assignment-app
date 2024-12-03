import React, { useState, useEffect } from "react";
import axios from "axios";

const TagManager = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [editTag, setEditTag] = useState({ id: null, name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  // Fetch tags from API on component mount
  useEffect(() => {
    axios
      .get("https://localhost:44331/api/Tag")
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        setError("Error fetching tags");
        console.error("Error fetching tags:", error);
      });
  }, []);

  // Add a new tag
  const addTag = () => {
    if (!newTag.trim()) {
      setError("Tag name cannot be empty");
      return;
    }

    axios
      .post("https://localhost:44331/api/Tag", { name: newTag })
      .then((response) => {
        setTags([...tags, response.data]);
        setNewTag("");
      })
      .catch((error) => {
        setError("Error adding tag");
        console.error("Error adding tag:", error);
      });
  };

  // Open modal for editing tag
  const openEditModal = (tag) => {
    setEditTag(tag);
    setIsModalOpen(true);
  };

  // Update tag
  const updateTag = () => {
    axios
      .put(`https://localhost:44331/api/Tag/${editTag.id}`, {
        name: editTag.name,
      })
      .then(() => {
        setTags(tags.map((tag) => (tag.id === editTag.id ? editTag : tag)));
        setIsModalOpen(false);
      })
      .catch((error) => {
        setError("Error updating tag");
        console.error("Error updating tag:", error);
      });
  };

  // Delete a tag
  const deleteTag = (id) => {
    axios
      .delete(`https://localhost:44331/api/Tag/${id}`)
      .then(() => {
        setTags(tags.filter((tag) => tag.id !== id));
      })
      .catch((error) => {
        setError("Error deleting tag");
        console.error("Error deleting tag:", error);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Tag Manager</h1>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Add New Tag */}
      <div className="mb-4 p-4 border rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Add New Tag</h2>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Enter tag name"
          className="border p-2 rounded mb-2 w-full"
        />
        <button onClick={addTag} className="bg-blue-500 text-white p-2 rounded">
          Add Tag
        </button>
      </div>

      {/* Tags List */}
      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Tag Name</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td className="px-4 py-2 border">{tag.id}</td>
              <td className="px-4 py-2 border">{tag.name}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => openEditModal(tag)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTag(tag.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Tag Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Tag</h2>
            <input
              type="text"
              value={editTag.name}
              onChange={(e) => setEditTag({ ...editTag, name: e.target.value })}
              className="border p-2 rounded mb-4 w-full"
            />
            <button
              onClick={updateTag}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Update Tag
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

export default TagManager;
