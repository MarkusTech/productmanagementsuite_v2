import React from "react";
import Table from "../../components/Table";
import data from "../../../data/purchaseOrder/poReceivingItem.json";

const tableHead = [
  "ID",
  "Item Name",
  "Unit Of Measurement",
  "Received Quantity",
  "Unit Cost",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.poReceivingItemID}</td>
    <td>{item.itemID}</td>
    <td>{item.uom}</td>
    <td>{item.receivedQty}</td>
    <td>{item.unitCost}</td>
  </tr>
);

const PoReceivinItemList = () => {
  return (
    <div className="customers">
      <h3 className="page-header">Purchase Order Receiving Item List</h3>
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

export default PoReceivinItemList;
