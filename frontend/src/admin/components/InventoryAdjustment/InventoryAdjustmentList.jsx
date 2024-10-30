import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchInventoryAdjustments } from "../../../services/inventory/inventoryAdjustmentService";
import InventoryAdjustmentCreateForm from "./InventoryAdjustmentCreateForm";
import InventoryAdjustmentUpdateForm from "./InventoryAdjustmentUpdateForm";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const inventoryAdjustmentTableHead = [
  "ID",
  "Adjustment Reason",
  "Inventory Item",
  "Quantity Adjusted",
  "Status",
  "Action",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const InventoryAdjustmentList = () => {
  const [inventoryAdjustments, setInventoryAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editAdjustmentId, setEditAdjustmentId] = useState(null);

  const loadInventoryAdjustments = async () => {
    try {
      const data = await fetchInventoryAdjustments();
      setInventoryAdjustments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventoryAdjustments();
  }, []);

  const handleInventoryAdjustmentCreated = (newAdjustment) => {
    setInventoryAdjustments((prev) => [...prev, newAdjustment]); // Append new adjustment
    setShowCreateForm(false);
    Swal.fire({
      icon: "success",
      title: "Inventory Adjustment Created!",
      text: "The new inventory adjustment has been successfully created.",
      confirmButtonText: "Okay",
      customClass: {
        confirmButton: "swal-confirm-button",
      },
    });
    loadInventoryAdjustments();
  };

  const handleEdit = (adjustment) => {
    setEditAdjustmentId(adjustment.adjustmentID); // Set the adjustment ID for editing
    setShowEditForm(true);
  };

  const handleEditFormClose = () => {
    setShowEditForm(false);
    setEditAdjustmentId(null);
  };

  const handleAdjustmentUpdated = () => {
    loadInventoryAdjustments();
    setShowEditForm(false);
    Swal.fire({
      icon: "success",
      title: "Inventory Adjustment Updated!",
      text: "The inventory adjustment has been successfully updated.",
    });
  };

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.adjustmentID}</td>
      <td>{item.adjustmentReason.reasonName}</td>
      <td>{item.inventory.item.itemName}</td>
      <td>{item.quantityAdjusted}</td>
      <td
        style={{
          color:
            item.status === "Completed"
              ? "green"
              : item.status === "Pending"
              ? "yellow"
              : item.status === "Rejected"
              ? "red"
              : "inherit",
        }}
      >
        {item.status}
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
      <h3>INVENTORY ADJUSTMENT LIST</h3>
      <button
        className="create-form-btn"
        onClick={() => setShowCreateForm((prev) => !prev)}
      >
        + Create Inventory Adjustment
      </button>
      <br />

      {showCreateForm && (
        <InventoryAdjustmentCreateForm
          onAdjustmentCreated={handleInventoryAdjustmentCreated}
          closeForm={() => setShowCreateForm(false)}
        />
      )}

      {showEditForm && (
        <InventoryAdjustmentUpdateForm
          adjustmentId={editAdjustmentId}
          onAdjustmentUpdated={handleAdjustmentUpdated}
          closeForm={handleEditFormClose}
        />
      )}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={inventoryAdjustmentTableHead}
                renderHead={renderHead}
                bodyData={inventoryAdjustments}
                renderBody={renderBody}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryAdjustmentList;
