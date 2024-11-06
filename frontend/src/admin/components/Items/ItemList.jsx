import React, { useEffect, useState } from "react";
import Table from "../Table";
import { fetchItems } from "../../../services/inventory/itemService";
import ItemCreateForm from "./ItemCreateForm";
import ItemEditForm from "./ItemEditFrom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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
  "Action",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
    setShowCreateForm(false);
  };

  const closeForm = () => {
    setShowCreateForm(false);
    setShowEditForm(false);
    setSelectedItem(null);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditForm(!showEditForm);
  };

  const handleItemUpdated = () => {
    handleCloseEditForm();
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    loadItems();
  };

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>
        {item.image_url && (
          <img
            src={`http://localhost:5001/${item.image_url.replace(/\\/g, "/")}`} // Replace backslashes with forward slashes
            alt="User"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        )}
      </td>
      <td>{item.itemID}</td>
      <td>{item.itemCode}</td>
      <td>{item.itemName}</td>
      <td>{item.categoryName}</td>
      <td>{item.barcode}</td>
      <td>{item.description}</td>
      <td>{item.grams}</td>
      <td>{item.uom}</td>
      <td>{item.price}</td>
      <td>{item.cost}</td>
      <td
        style={{
          color: item.status ? "blue" : "red",
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
        onClick={() => setShowCreateForm((prev) => !prev)}
      >
        + Create Item
      </button>
      <br />

      {showCreateForm && (
        <ItemCreateForm
          onItemCreated={handleItemCreated}
          closeForm={closeForm}
        />
      )}

      {showEditForm && selectedItem && (
        <ItemEditForm
          onItemUpdated={handleItemUpdated}
          onClose={handleCloseEditForm}
          itemID={selectedItem.itemID}
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
                renderBody={renderBody}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
