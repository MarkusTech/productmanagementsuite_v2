import React, { useState } from "react";
import { createUser } from "../../../services/auth/userService";

const UserCreateForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    roleID: "",
    email: "",
    phoneNumber: "",
    address: "",
    birthday: "",
    status: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData); // Call the createUser service
      alert("User created successfully");

      // Call the onUserCreated callback to refresh the user list
      onUserCreated();

      // Reset the form after successful submission
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        roleID: "",
        email: "",
        phoneNumber: "",
        address: "",
        birthday: "",
        status: true,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Middle Name:</label>
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Role ID:</label>
        <input
          type="text"
          name="roleID"
          value={formData.roleID}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Birthday:</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
      </div>
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserCreateForm;
