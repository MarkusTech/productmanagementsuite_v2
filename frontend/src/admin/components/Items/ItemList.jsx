import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchItems } from "../../../services/inventory/itemService"; // Import the service

const itemTableHead = [
  "",
  "ID",
  "Item Code",
  "Item Name",
  "Category",
  "Barcode",
  "Description",
  "Grams",
  "UOM",
  "Price",
  "Cost",
  "Status",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.itemName}
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ) : (
        "No Image"
      )}
    </td>
    <td>{item.itemID}</td>
    <td>{item.itemCode}</td>
    <td>{item.itemName}</td>
    <td>{item.categoryID}</td>
    <td>{item.barcode}</td>
    <td>{item.description}</td>
    <td>{item.grams}</td>
    <td>{item.uom}</td>
    <td>{item.price}</td>
    <td>{item.cost}</td>
    <td>{item.status ? "Active" : "Inactive"}</td>
  </tr>
);

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>LIST OF ITEMS</h3>
      <br />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={itemTableHead}
                renderHead={renderHead}
                bodyData={items}
                renderBody={renderBody}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default ItemList;
