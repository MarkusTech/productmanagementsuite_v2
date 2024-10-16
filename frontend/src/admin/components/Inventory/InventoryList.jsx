// src/components/InventoryList.js
import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchInventories } from "../../../services/inventory/inventoryService";

const inventoryTableHead = [
  "ID",
  "Location",
  "Item",
  "Quantity",
  "Inventory Type",
  "Re-Order Threshold",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.inventoryID}</td>
    <td>{item.locationID}</td>
    <td>{item.itemID}</td>
    <td>{item.quantity}</td>
    <td>{item.inventoryTypeID}</td>
    <td>{item.reOrderThreshold}</td>
  </tr>
);

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInventories = async () => {
      try {
        const data = await fetchInventories();
        setInventories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getInventories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>INVENTORY</h3>
      <br />
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
