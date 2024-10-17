import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchAdjustmentTypes } from "../../../services/inventory/adjustmentTypeService";
import AdjustmentTypeCreateForm from "./AdjustmentTypeCreateForm";
import { Button } from "@mui/material";

const adjustmentTypeTableHead = ["ID", "Adjustment Type Name", "Action"]; // Added Action column

const renderHead = (item, index) => <th key={index}>{item}</th>;

const AdjustmentTypeList = () => {
  const [adjustmentTypes, setAdjustmentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // Toggle for the create form

  const loadAdjustmentTypes = async () => {
    try {
      const data = await fetchAdjustmentTypes();
      setAdjustmentTypes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdjustmentTypes();
  }, []);

  const handleAdjustmentTypeCreated = () => {
    loadAdjustmentTypes(); // Reload data after creating a new adjustment type
    setShowCreateForm(false); // Close the form after creation
  };

  const closeForm = () => {
    setShowCreateForm(false); // Manually close form
  };

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.adjustmentTypeID}</td>
      <td>{item.typeName}</td>
      <td>
        <Button variant="contained" color="primary">
          Edit
        </Button>
      </td>
    </tr>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>ADJUSTMENT TYPE</h3>
      <button
        className="create-adjustment-btn"
        onClick={() => setShowCreateForm((prev) => !prev)} // Toggle create form visibility
      >
        + Create Adjustment Type
      </button>
      <br />

      {showCreateForm && (
        <AdjustmentTypeCreateForm
          onAdjustmentTypeCreated={handleAdjustmentTypeCreated}
          closeForm={closeForm}
        />
      )}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={adjustmentTypeTableHead}
                renderHead={renderHead}
                bodyData={adjustmentTypes}
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
