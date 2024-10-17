import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchItems } from "../../../services/inventory/itemService"; // Import the service
import ItemCreateForm from "./ItemCreateForm"; // Import your create form
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const itemTableHead = [
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
  "Action",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadItems = async () => {
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleItemCreated = () => {
    loadItems();
    setShowCreateForm(false); // Close the form after item creation
  };

  const closeForm = () => {
    setShowCreateForm(false); // Close the form manually
  };

  const handleEdit = (item) => {
    console.log("Editing item: ", item);
  };

  const renderBody = (item, index) => (
    <tr key={index}>
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
      <td
        style={{
          color: item.status ? "blue" : "red", // Conditionally set the color based on status
          fontWeight: "bold",
        }}
      >
        {item.status ? "Active" : "Inactive"}
      </td>
      <td>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEdit(item)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </td>
    </tr>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <h3>ITEM LIST</h3>
      <button
        className="create-form-btn"
        onClick={() => setShowCreateForm((prev) => !prev)} // Toggle the create form visibility
      >
        + Create Item
      </button>
      <br />

      {showCreateForm && ( // Render the create form conditionally
        <ItemCreateForm
          onItemCreated={handleItemCreated}
          closeForm={closeForm}
        />
      )}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={itemTableHead}
                renderHead={renderHead}
                bodyData={items}
                renderBody={renderBody} // Pass renderBody as a prop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
