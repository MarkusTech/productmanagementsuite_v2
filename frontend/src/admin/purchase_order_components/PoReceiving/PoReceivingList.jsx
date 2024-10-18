import React from "react";
import Table from "../../components/Table";
import data from "../../../data/purchaseOrder/poReceiving.json";

const tableHead = [
  "ID",
  "Purchase Order",
  "Reference Number",
  "Received Date",
  "Received By",
  "Total Quantity",
  "Total Cost",
  "Status",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.poReceivingID}</td>
    <td>{item.poID}</td>
    <td>{item.referenceNumber}</td>
    <td>{item.receivedDate}</td>
    <td>{item.receivedByID}</td>
    <td>{item.totalQty}</td>
    <td>{item.totalCost}</td>
    <td>{item.status}</td>
  </tr>
);

const PoReceivingList = () => {
  return (
    <div className="customers">
      <h3 className="page-header">Purchase Order Receiving</h3>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={tableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={data}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoReceivingList;
