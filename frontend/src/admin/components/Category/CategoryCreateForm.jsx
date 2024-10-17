import React, { useState } from "react";
import { createCategory } from "../../../services/inventory/categoryService"; // Adjust the path as needed
import { TextField, Button, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CategoryCreateForm = ({ onCategoryCreated, closeForm }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    createdByID: 1, // Adjust this based on your authentication or default values
    modifiedByID: 1, // Adjust this as well
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCategory(formData);
      if (response.success) {
        // Notify parent component that a category was created successfully
        onCategoryCreated();
        closeForm(); // Close the form after successful creation
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    }
  };

  return (
    <div style={styles.formContainer}>
      {/* Close Button */}
      <IconButton
        style={styles.closeButton}
        onClick={closeForm}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      <h1
        style={{ marginTop: "20px", fontWeight: "bold", textAlign: "center" }}
      >
        Create New Category
      </h1>
      <br />
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Category Name"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={styles.submitButton}
              >
                Create Category
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

// Styles for the form and close button
const styles = {
  formContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    zIndex: 1000,
    overflow: "auto",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  submitButton: {
    backgroundColor: "#3f51b5", // You can customize this color
  },
};

export default CategoryCreateForm;
