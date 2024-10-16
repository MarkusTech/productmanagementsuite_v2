import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchInventoryAdjustments } from "../../../services/inventory/inventoryAdjustmentService";

const inventoryAdjustmentTableHead = [
  "ID",
  "Inventory",
  "AdjustmentType",
  "Adjustment Reason",
  "Quantity Adjusted",
  "Status",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.adjustmentID}</td>
    <td>{item.inventoryID}</td>
    <td>{item.adjustmentTypeID}</td>
    <td>{item.adjustmentReasonID}</td>
    <td>{item.quantityAdjusted}</td>
    <td>{item.status}</td>
  </tr>
);

const InventoryAdjustmentList = () => {
  const [inventoryAdjustments, setInventoryAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInventoryAdjustments = async () => {
      try {
        const data = await fetchInventoryAdjustments();
        setInventoryAdjustments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getInventoryAdjustments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>INVENTORY ADJUSTMENT</h3>
      <br />
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
