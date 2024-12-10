import React,{useState} from "react";
import Notification from "../../Components/Notification/Notification";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";

const NotificationPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleCollapseToggle = (collapsedState) => {
    setIsCollapsed(collapsedState);
  };

  return (
    <>
      <Header
        onCollapseToggle={handleCollapseToggle}
        isCollapsed={isCollapsed}
      />
      <Sidebar onCollapseToggle={handleCollapseToggle} />
      <div className={`main-wrapper ${isCollapsed ? "collapsed" : "expanded"}`}>
        <Notification />
      </div>
    </>
  );
};

export default NotificationPage;
