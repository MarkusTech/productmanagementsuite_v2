import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchUsers } from "../../../services/auth/userService";

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
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

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
  </tr>
);

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>USER LIST</h3>
      <br />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={userTableHead}
                renderHead={renderHead}
                bodyData={users}
                renderBody={renderBody}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
