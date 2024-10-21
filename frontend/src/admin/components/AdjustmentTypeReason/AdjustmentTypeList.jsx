import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchAdjustmentReasons } from "../../../services/inventory/adjustmentReasonService"; // Adjust the service name as needed
import AdjustmentReasonCreateForm from "./AdjustmentReasonCreateForm";
import AdjustmentReasonEditForm from "./AdjustmentReasonUpdateForm";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const adjustmentReasonTableHead = [
  "ID",
  "Reason Name",
  "Description",
  "Action",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const AdjustmentTypeList = () => {
  const [adjustmentReasons, setAdjustmentReasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editAdjustmentReason, setEditAdjustmentReason] = useState(null);

  const loadAdjustmentReasons = async () => {
    try {
      const data = await fetchAdjustmentReasons();
      setAdjustmentReasons(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdjustmentReasons();
  }, []);

  const handleAdjustmentReasonCreated = () => {
    loadAdjustmentReasons();
    setShowCreateForm(false);
  };

  const handleEdit = (reason) => {
    setEditAdjustmentReason(reason);
    setShowEditForm(true);
  };

  const handleEditFormClose = () => {
    setShowEditForm(false);
    setEditAdjustmentReason(null);
  };

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.adjustmentReasonID}</td>
      <td>{item.reasonName}</td>
      <td>{item.description}</td>
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
      <h3>ADJUSTMENT REASON LIST</h3>
      <button
        className="create-form-btn"
        onClick={() => setShowCreateForm((prev) => !prev)}
      >
        + Create Adjustment Reason
      </button>
      <br />

      {showCreateForm && (
        <AdjustmentReasonCreateForm
          onAdjustmentReasonCreated={handleAdjustmentReasonCreated}
          closeForm={() => setShowCreateForm(false)}
        />
      )}

      {showEditForm && (
        <AdjustmentReasonEditForm
          adjustmentReason={editAdjustmentReason}
          onClose={handleEditFormClose}
        />
      )}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={adjustmentReasonTableHead}
                renderHead={renderHead}
                bodyData={adjustmentReasons}
                renderBody={renderBody}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdjustmentTypeList;
