import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import CategoryManager from "./Components/CategoryManager";
import ProductManager from "./Components/ProductManager";
import TagManager from "./Components/TagManager";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-md">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Product Management System
            </h1>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-gray-800 text-white">
          <div className="container mx-auto px-6 py-3 flex justify-center">
            <ul className="flex space-x-6">
              <li>
                <NavLink
                  to="/category"
                  className={({ isActive }) =>
                    `text-lg font-medium px-4 py-2 rounded ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `text-lg font-medium px-4 py-2 rounded ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tags"
                  className={({ isActive }) =>
                    `text-lg font-medium px-4 py-2 rounded ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Tags
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 py-10">
          <div className="container mx-auto px-6">
            <Routes>
              <Route path="/category" element={<CategoryManager />} />
              <Route path="/products" element={<ProductManager />} />
              <Route path="/tags" element={<TagManager />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
