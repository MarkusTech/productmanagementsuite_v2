import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isClosed }) => {
  const [isInventoryOpen, setInventoryOpen] = useState(false);

  const toggleInventory = () => {
    setInventoryOpen(!isInventoryOpen);
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

        {/* Inventory Submenu */}
        <li>
          <Link to="/inventory" onClick={toggleInventory}>
            <i className="bx bxs-cog"></i>Inventory Setup
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
                  <i className="bx bx-cart"></i>Inventory
                </Link>
              </li>
              <li>
                <Link to="/inventory/inventory-type">
                  <i className="bx bxs-box"></i>Inventory Type
                </Link>
              </li>
              <li>
                <Link to="/inventory-adjustment">
                  <i className="bx bxs-cog"></i>Inventory Adjustment
                </Link>
              </li>
              <li>
                <Link to="/adjustment-reason-type">
                  <i className="bx bx-list-ul"></i> Adjustment Reason Type
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
