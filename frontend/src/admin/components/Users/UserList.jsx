import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchUsers } from "../../../services/auth/userService";
import UserCreateForm from "./userCreateForm";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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
  "Action",
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
    loadUsers();
    setShowCreateForm(false); // Close the form after user creation
  };

  const closeForm = () => {
    setShowCreateForm(false); // Close the form manually
  };

  const handleEdit = (user) => {
    console.log("Editing user: ", user);
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
          onClick={() => handleEdit(item)}
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
      <h3>USER LIST</h3>
      <button
        className="create-user-btn"
        onClick={() => setShowCreateForm((prev) => !prev)} // Toggle the create form visibility
      >
        + Create User
      </button>
      <br />

      {showCreateForm && ( // Render the create form conditionally
        <UserCreateForm
          onUserCreated={handleUserCreated}
          closeForm={closeForm}
        />
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
