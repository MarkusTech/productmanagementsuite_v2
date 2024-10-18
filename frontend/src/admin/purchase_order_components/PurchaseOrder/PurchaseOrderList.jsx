import React from "react";
import Table from "../../components/Table";
import purchaseOrder from "../../../data/purchaseOrder/purchaseOrder.json";

const tableHead = [
  "ID",
  "PO Number",
  "Supplier",
  "Location",
  "Order Date",
  "Expected Delivery Date",
  "Status",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.poID}</td>
    <td>{item.poNumber}</td>
    <td>{item.supplierID}</td>
    <td>{item.locationID}</td>
    <td>{item.orderDate}</td>
    <td>{item.expectedDeliverDate}</td>
    <td>{item.status}</td>
  </tr>
);

const PurchaseOrderList = () => {
  return (
    <div className="customers">
      <h3 className="page-header">Purchase Order List</h3>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={tableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={purchaseOrder}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderList;
