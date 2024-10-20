import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchInventories } from "../../../services/inventory/inventoryService";
import InventoryCreateForm from "./InventoryCreateForm";
import InventoryEditForm from "./InventoryEditForm";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const inventoryTableHead = [
  "ID",
  "Inventory Type",
  "Location",
  "Item",
  "Quantity",
  "Re-Order Threshold",
  "Action",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editInventory, setEditInventory] = useState(null);

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

  const handleInventoryCreated = () => {
    loadInventories();
    setShowCreateForm(false);
  };

  const handleEdit = (inventory) => {
    setEditInventory(inventory);
    setShowEditForm(true);
  };

  const handleEditFormClose = () => {
    setShowEditForm(false);
    setEditInventory(null);
  };

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.inventoryID}</td>
      <td>{item.inventoryTypeID}</td>
      <td>{item.locationID}</td>
      <td>{item.itemID}</td>
      <td>{item.quantity}</td>
      <td>{item.reOrderThreshold}</td>
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
          inventory={editInventory}
          onClose={handleEditFormClose}
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
