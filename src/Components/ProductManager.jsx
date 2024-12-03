import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    categoryId: "",
    tagIds: [],
  });
  const [editProduct, setEditProduct] = useState({
    id: null,
    name: "",
    price: "",
    categoryId: "",
    tagIds: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products, categories, and tags
  useEffect(() => {
    axios
      .get("https://localhost:44331/api/Product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    axios
      .get("https://localhost:44331/api/Category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    axios
      .get("https://localhost:44331/api/Tag")
      .then((response) => setTags(response.data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  // Add a new product
  const addProduct = () => {
    axios
      .post("https://localhost:44331/api/Product", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: "", price: "", categoryId: "", tagIds: [] });
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  // Edit an existing product
  const editProductDetails = () => {
    axios
      .put(`https://localhost:44331/api/Product/${editProduct.id}`, editProduct)
      .then(() => {
        setProducts(
          products.map((product) =>
            product.id === editProduct.id ? editProduct : product
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  // Delete product
  const deleteProduct = (id) => {
    axios
      .delete(`https://localhost:44331/api/Product/${id}`)
      .then(() => setProducts(products.filter((product) => product.id !== id)))
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Product Manager</h1>

      {/* Add Product Section */}
      <div className="mb-4 p-4 border rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border p-2 rounded mb-2 w-full"
        />
        <select
          value={newProduct.categoryId}
          onChange={(e) =>
            setNewProduct({ ...newProduct, categoryId: e.target.value })
          }
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          multiple
          value={newProduct.tagIds}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              tagIds: Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ),
            })
          }
          className="border p-2 rounded mb-2 w-full"
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <button
          onClick={addProduct}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Products List */}
      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Product Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Tags</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 border">{product.id}</td>
              <td className="px-4 py-2 border">{product.name}</td>
              <td className="px-4 py-2 border">${product.price}</td>
              <td className="px-4 py-2 border">{product.categoryName}</td>
              <td className="px-4 py-2 border">
                {product.tagNames.join(", ")}
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => {
                    setEditProduct(product);
                    setIsModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <input
              type="text"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
              className="border p-2 rounded mb-4 w-full"
            />
            <input
              type="number"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
              className="border p-2 rounded mb-4 w-full"
            />
            <select
              value={editProduct.categoryId}
              onChange={(e) =>
                setEditProduct({ ...editProduct, categoryId: e.target.value })
              }
              className="border p-2 rounded mb-4 w-full"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              multiple
              value={editProduct.tagIds}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  tagIds: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              className="border p-2 rounded mb-4 w-full"
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <button
              onClick={editProductDetails}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Update Product
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

export default ProductManager;
