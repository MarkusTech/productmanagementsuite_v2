import React from "react";
import Table from "../../components/Table";
import data from "../../../data/purchaseOrder/poItem.json";

const tableHead = [
  "ID",
  "Puchase Order",
  "Item",
  "Unif of Measurement",
  "Unit Cost",
  "Order Quantity",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.poItemID}</td>
    <td>{item.poID}</td>
    <td>{item.itemID}</td>
    <td>{item.uom}</td>
    <td>{item.unitCost}</td>
    <td>{item.orderQty}</td>
  </tr>
);

const PoItemList = () => {
  return (
    <div className="customers">
      <h3 className="page-header">Purchase Order Item List</h3>
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

export default PoItemList;
