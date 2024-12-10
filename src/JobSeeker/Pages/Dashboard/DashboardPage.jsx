import React, { useState } from "react";
import Header from "../../Layout/Header";
import Sidebar from "../../Layout/Sidebar";
import "./Dashboard.css";
import { DashboardOverview } from "../../Components/Dashboard/DashboardOverview";

const DashboardPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleCollapseToggle = (collapsedState) => {
    setIsCollapsed(collapsedState);
  };

  return (
    <>
      <Header onCollapseToggle={handleCollapseToggle} isCollapsed={isCollapsed}/>
      <Sidebar onCollapseToggle={handleCollapseToggle} />
      <div className={`main-wrapper ${isCollapsed ? "collapsed" : "expanded"}`}>
        <DashboardOverview />
      </div>
    </>
  );
};

export default DashboardPage;
