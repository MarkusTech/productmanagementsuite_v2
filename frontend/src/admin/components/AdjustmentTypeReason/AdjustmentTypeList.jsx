import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchAdjustmentTypes } from "../../../services/inventory/adjustmentTypeService";

const adjustmentTypeTableHead = ["ID", "Reason Name"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.adjustmentTypeID}</td>
    <td>{item.typeName}</td>
  </tr>
);

const AdjustmentTypeList = () => {
  const [adjustmentTypes, setAdjustmentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAdjustmentTypes = async () => {
      try {
        const data = await fetchAdjustmentTypes();
        setAdjustmentTypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAdjustmentTypes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>ADJUSTMENT TYPE REASON</h3>
      <br />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={adjustmentTypeTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={adjustmentTypes}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdjustmentTypeList;
