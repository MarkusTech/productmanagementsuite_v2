import React, { useState } from "react";
import { createAdjustmentType } from "../../../services/inventory/adjustmentTypeService";
import { TextField, Button, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AdjustmentTypeCreateForm = ({ onAdjustmentTypeCreated, closeForm }) => {
  const [formData, setFormData] = useState({
    typeName: "",
    createdByID: 1, // Replace with your logic
    modifiedByID: 1, // Replace with your logic
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
      const response = await createAdjustmentType(formData);
      if (response.success) {
        onAdjustmentTypeCreated(); // Notify the parent component
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    }
  };

  return (
    <div style={styles.formContainer}>
      <IconButton style={styles.closeButton} onClick={closeForm}>
        <CloseIcon />
      </IconButton>

      <h1>Create New Adjustment Type</h1>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Adjustment Type Name"
              name="typeName"
              value={formData.typeName}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Create Adjustment Type
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
};

export default AdjustmentTypeCreateForm;
