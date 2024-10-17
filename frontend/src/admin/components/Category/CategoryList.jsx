import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchCategories } from "../../../services/inventory/categoryService"; // Ensure this imports your fetch function
import CategoryCreateForm from "./CategoryCreateForm"; // Import your CategoryCreateForm
import CategoryEditForm from "./CategoryEditForm";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Import Material-UI Edit Icon

const categoryTableHead = [
  "Category ID",
  "Category Code",
  "Category Name",
  "Description",
  "Status",
  "Action", // Action column for Edit button
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null); // State to hold the category being edited

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCategoryCreated = () => {
    loadCategories(); // Reload categories after creating a new one
    setShowCreateForm(false); // Close the create form
  };

  const handleEdit = (category) => {
    setEditCategory(category); // Set the category to be edited
    setShowEditForm(true); // Show the edit form
  };

  const handleEditFormClose = () => {
    setShowEditForm(false); // Close the edit form
    setEditCategory(null); // Reset the edit category
  };

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.categoryID}</td>
      <td>{item.categoryCode}</td>
      <td>{item.categoryName}</td>
      <td>{item.description}</td>
      <td
        style={{
          color: item.status ? "blue" : "red", // Conditionally set the color based on status
          fontWeight: "bold",
        }}
      >
        {item.status ? "Active" : "Inactive"}
      </td>
      <td>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEdit(item)} // Handle edit click
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </td>
    </tr>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>CATEGORY LIST</h3>
      <button
        className="create-user-btn"
        onClick={() => setShowCreateForm((prev) => !prev)} // Toggle the create form visibility
      >
        + Create Category
      </button>
      <br />

      {showCreateForm && ( // Render the create form conditionally
        <CategoryCreateForm
          onCategoryCreated={handleCategoryCreated}
          closeForm={() => setShowCreateForm(false)}
        />
      )}

      {showEditForm && ( // Render the edit form conditionally
        <CategoryEditForm
          category={editCategory}
          onClose={handleEditFormClose}
        />
      )}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={categoryTableHead}
                renderHead={renderHead}
                bodyData={categories}
                renderBody={renderBody} // Pass renderBody as a prop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
