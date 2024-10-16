import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AdjustmentTypeContent from "../components/AdjustmentTypeReason/AdjustmentTypeContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdjustmentType = () => {
  const userState = useSelector((state) => state.user);
  // console.log(userState);

  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(storedDarkMode);
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  const handleSearchToggle = () => {
    setIsSearchFormVisible(!isSearchFormVisible);
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  return (
    <div className={`app ${isDarkMode ? "dark" : ""} admin-home-container`}>
      <Sidebar isClosed={isSidebarClosed} />
      <div className="content">
        <Navbar
          onSidebarToggle={handleSidebarToggle}
          onSearchToggle={handleSearchToggle}
          isSearchFormVisible={isSearchFormVisible}
          onDarkModeToggle={handleDarkModeToggle}
        />
        <AdjustmentTypeContent isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default AdjustmentType;
