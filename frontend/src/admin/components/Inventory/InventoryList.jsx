import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchInventories } from "../../../services/inventory/inventoryService";
import InventoryCreateForm from "./InventoryCreateForm";
import InventoryEditForm from "./InventoryEditForm";
// import { Button } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";

const inventoryTableHead = [
  "ID",
  "Inventory Type",
  "Location",
  "Item",
  "Quantity",
  "Re-Order Threshold",
  // "Action",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editInventory, setEditInventory] = useState(null); // State to hold the inventory to be edited

  // Load inventories when the component mounts
  const loadInventories = async () => {
    try {
      const data = await fetchInventories();
      setInventories(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventories();
  }, []);

  // Refresh inventory list after creating a new inventory item
  const handleInventoryCreated = () => {
    loadInventories();
    setShowCreateForm(false);
  };

  // Handle editing an inventory
  // const handleEdit = (inventory) => {
  //   setEditInventory(inventory);
  //   setShowEditForm(!showEditForm);
  // };

  // Refresh inventory list after an inventory item is updated
  const handleInventoryUpdated = () => {
    loadInventories();
    setShowEditForm(false);
    setEditInventory(null);
  };

  // Close the edit form
  const handleEditFormClose = () => {
    setShowEditForm(false);
    setEditInventory(null);
  };

  // Render the table body rows
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.inventoryID}</td>
      <td>{item.inventoryType.typeName}</td>
      <td>{item.location.locationName}</td>
      <td>{item.item.itemName}</td>
      <td>{item.quantity}</td>
      <td>{item.reOrderThreshold}</td>
      {/* <td>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEdit(item)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </td> */}
    </tr>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>INVENTORY LIST</h3>
      <button
        className="create-form-btn"
        onClick={() => setShowCreateForm((prev) => !prev)}
      >
        + Create Inventory
      </button>
      <br />

      {showCreateForm && (
        <InventoryCreateForm
          onInventoryCreated={handleInventoryCreated}
          closeForm={() => setShowCreateForm(false)}
        />
      )}

      {showEditForm && (
        <InventoryEditForm
          inventoryId={editInventory.inventoryID}
          onInventoryUpdated={handleInventoryUpdated}
          closeForm={handleEditFormClose}
        />
      )}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={inventoryTableHead}
                renderHead={renderHead}
                bodyData={inventories}
                renderBody={renderBody}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryList;
