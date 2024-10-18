import React from "react";
import Table from "../../components/Table";
import supplier from "../../../data/purchaseOrder/poSupplier.json";

const tableHead = [
  "ID",
  "Supplier Name",
  "Contact Details",
  "Address",
  "Email",
  "Status",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.supplierID}</td>
    <td>{item.supplierName}</td>
    <td>{item.contactDetails}</td>
    <td>{item.address}</td>
    <td>{item.email}</td>
    <td>{item.status}</td>
  </tr>
);

const SupplierList = () => {
  return (
    <div className="customers">
      <h3 className="page-header">Supplier List</h3>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={tableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={supplier}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierList;
