import React, { useState } from "react";
import { createUser } from "../../../services/auth/userService";
import { TextField, Button, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UserCreateForm = ({ onUserCreated, closeForm }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    roleID: 0,
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    birthday: "",
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
      const response = await createUser(formData);
      if (response.success) {
        // Notify parent component that a user was created successfully
        onUserCreated();
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
        Create New User
      </h1>
      <br />
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Role ID"
              name="roleID"
              value={formData.roleID}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Birthday"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Create User
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

// Styles for the form and close button
const styles = {
  formContainer: {
    position: "fixed", // Changed to 'fixed' to center the form
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Translate to perfectly center the form
    width: "700px",
    height: "550px", // Set a specific height
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    zIndex: 1000, // Ensure it floats over other content
    overflow: "auto", // Allow scrolling if content exceeds height
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
};

export default UserCreateForm;
