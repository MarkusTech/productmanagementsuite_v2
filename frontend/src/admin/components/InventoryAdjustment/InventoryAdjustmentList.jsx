import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchInventoryAdjustments } from "../../../services/inventory/inventoryAdjustmentService";
import InventoryAdjustmentCreateForm from "./InventoryAdjustmentCreateForm";
import InventoryAdjustmentEditForm from "./InventoryAdjustmentUpdateForm";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const inventoryAdjustmentTableHead = [
  "ID",
  "Inventory",
  "Adjustment Type",
  "Adjustment Reason",
  "Quantity Adjusted",
  "Status",
  "Action", // Added action column for future enhancements
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const InventoryAdjustmentList = () => {
  const [inventoryAdjustments, setInventoryAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editAdjustment, setEditAdjustment] = useState(null);

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

  const handleInventoryAdjustmentCreated = () => {
    loadInventoryAdjustments();
    setShowCreateForm(false);
  };

  const handleEdit = (adjustment) => {
    setEditAdjustment(adjustment);
    setShowEditForm(true);
  };

  const handleEditFormClose = () => {
    setShowEditForm(false);
    setEditAdjustment(null);
  };

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.adjustmentID}</td>
      <td>{item.inventoryID}</td>
      <td>{item.adjustmentTypeID}</td>
      <td>{item.adjustmentReasonID}</td>
      <td>{item.quantityAdjusted}</td>
      <td>{item.status}</td>
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
        <InventoryAdjustmentEditForm
          adjustment={editAdjustment}
          onClose={handleEditFormClose}
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
                renderBody={renderBody} // Pass renderBody as a prop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryAdjustmentList;
