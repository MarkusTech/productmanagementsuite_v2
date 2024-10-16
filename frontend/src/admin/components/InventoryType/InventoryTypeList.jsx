import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchInventoryTypes } from "../../../services/inventory/inventoryTypeService";

const TableHead = ["ID", "Inventory Type Name", "Description", "Status"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.inventoryTypeID}</td>
    <td>{item.typeName}</td>
    <td>{item.description}</td>
    <td>{item.status ? "Active" : "Inactive"}</td>
  </tr>
);

const InventoryTypeList = () => {
  const [inventoryTypes, setInventoryTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInventoryTypes = async () => {
      try {
        const data = await fetchInventoryTypes();
        setInventoryTypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getInventoryTypes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>Inventory Type</h3>
      <br />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={TableHead}
                renderHead={renderHead}
                bodyData={inventoryTypes}
                renderBody={renderBody}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryTypeList;
