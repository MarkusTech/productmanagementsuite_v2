import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isClosed }) => {
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isPurchaseOrder, setPurchaseOrder] = useState(false);

  const toggleInventory = () => {
    setInventoryOpen(!isInventoryOpen);
  };

  const togglePurchaseOrder = () => {
    setPurchaseOrder(!isPurchaseOrder);
  };

  return (
    <div className={`sidebar ${isClosed ? "close" : ""}`}>
      <Link to="/" className="logo">
        <i className="bx bx-code-alt"></i>
        <div className="logo-name">
          <span>PMS</span>
        </div>
      </Link>
      <ul className="side-menu">
        <li className="active">
          <Link to="/dashboard">
            <i className="bx bxs-dashboard"></i>Dashboard
          </Link>
        </li>
        <li>
          <Link to="/sales">
            <i className="bx bx-line-chart"></i>Sales
          </Link>
        </li>
        <li>
          <Link to="/items">
            <i className="bx bx-analyse"></i>items
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <i className="bx bx-message-square-dots"></i>Categories
          </Link>
        </li>

        <li>
          <Link to="/report">
            <i className="bx bx-file"></i>Report
          </Link>
        </li>
        <li>
          <Link to="/users">
            <i className="bx bx-group"></i>Users
          </Link>
        </li>
        <li>
          <Link to="/company">
            <i className="bx bx-buildings"></i>Company Profile
          </Link>
        </li>

        {/* Purchase Order */}
        <li onClick={togglePurchaseOrder}>
          <Link>
            <i className="bx bxs-shopping-bag"></i>Purchase Order
            <i
              className={`bx ${
                isPurchaseOrder ? "bx-chevron-up" : "bx-chevron-down"
              } submenu-toggle`}
            ></i>
          </Link>
          {isPurchaseOrder && (
            <ul className="submenu">
              <li>
                <Link to="/purchase-order">
                  <i className="bx bxs-shopping-bag"></i> Purchase Order
                </Link>
              </li>
              <li>
                <Link to="/po-item">
                  <i className="bx bxs-package"></i> PO Item
                </Link>
              </li>
              <li>
                <Link to="/po-receiving-item">
                  <i className="bx bxs-truck"></i> PO Receiving Item
                </Link>
              </li>
              <li>
                <Link to="/po-receiving">
                  <i className="bx bxs-receipt"></i> PO Receiving
                </Link>
              </li>
              <li>
                <Link to="/supplier">
                  <i className="bx bxs-user"></i> Supplier
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Inventory Submenu */}
        <li onClick={toggleInventory}>
          <Link>
            <i className="bx bxs-package"></i>Inventory Setup
            <i
              className={`bx ${
                isInventoryOpen ? "bx-chevron-up" : "bx-chevron-down"
              } submenu-toggle`}
            ></i>
          </Link>
          {isInventoryOpen && (
            <ul className="submenu">
              <li>
                <Link to="/inventory">
                  <i className="bx bxs-inbox"></i>Inventory
                </Link>
              </li>
              <li>
                <Link to="/inventory/inventory-type">
                  <i className="bx bxs-box"></i>Inventory Type
                </Link>
              </li>
              <li>
                <Link to="/inventory-adjustment">
                  <i className="bx bxs-edit"></i>Inventory Adjustment
                </Link>
              </li>
              <li>
                <Link to="/adjustment-type">
                  <i className="bx bxs-grid"></i> Adjustment Type
                </Link>
              </li>

              <li>
                <Link to="/adjustment-type-reason">
                  <i className="bx bxs-info-circle"></i> Adjustment Type Reason
                </Link>
              </li>
              <li>
                <Link to="/location">
                  <i className="bx bxs-map"></i> Location
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* --------------------------------- */}
      </ul>
      <div className="logout-padding">
        <ul className="side-menu">
          <li>
            <Link to="/logout" className="logout">
              <i className="bx bx-log-out-circle"></i>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
