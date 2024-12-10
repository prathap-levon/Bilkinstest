import React,{useState} from 'react';
import Header from '../../Layout/Header';
import Sidebar from '../../Layout/Sidebar';
import "./ReferEarn.css"
import { ReferalStatus } from '../../Components/ReferEarn/ReferalStatus';
const ReferEarnStatusPage = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleCollapseToggle = (collapsedState) => {
      setIsCollapsed(collapsedState);
    };
  
    return (
      <>
        <Header onCollapseToggle={handleCollapseToggle} isCollapsed={isCollapsed}/>
        <Sidebar onCollapseToggle={handleCollapseToggle} />
        <div className={`main-wrapper ${isCollapsed ? "collapsed" : "expanded"}`}>
                <ReferalStatus />
            </div>
        </>
    )
}

export default ReferEarnStatusPage;