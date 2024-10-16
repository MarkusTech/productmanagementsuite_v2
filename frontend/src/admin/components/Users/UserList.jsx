import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchUsers } from "../../../services/auth/userService";
import UserCreateForm from "./userCreateForm";
import { Button } from "@mui/material";

const userTableHead = [
  "ID",
  "First Name",
  "Middle Name",
  "Last Name",
  "Role",
  "Email",
  "Phone Number",
  "Address",
  "Birthday",
  "Status",
  "Action", // Action column for Edit button
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUserCreated = () => {
    loadUsers(); // Refresh the user list after a new user is created
    setShowCreateForm(false); // Hide the form after user creation
  };

  const handleEdit = (user) => {
    // For now, we'll log the user being edited.
    console.log("Editing user: ", user);

    // You might want to implement a form or modal to edit the user details
    // Example: setSelectedUser(user); to store in state for editing
  };

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.userID}</td>
      <td>{item.firstName}</td>
      <td>{item.middleName}</td>
      <td>{item.lastName}</td>
      <td>{item.roleID}</td>
      <td>{item.email}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.address}</td>
      <td>{item.birthday}</td>
      <td>{item.status ? "Active" : "Inactive"}</td>
      <td>
        <Button
          variant="contained" // Use MUI Button
          color="primary" // Button color
          onClick={() => handleEdit(item)} // Call the edit function
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
      <h3>USER LIST</h3>
      <button
        className="create-user-btn"
        onClick={() => setShowCreateForm((prev) => !prev)} // Toggle the create form visibility
      >
        + Create User
      </button>
      <br />

      {showCreateForm && ( // Render the create form conditionally
        <UserCreateForm onUserCreated={handleUserCreated} />
      )}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={userTableHead}
                renderHead={renderHead}
                bodyData={users}
                renderBody={renderBody} // Pass renderBody as a prop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
