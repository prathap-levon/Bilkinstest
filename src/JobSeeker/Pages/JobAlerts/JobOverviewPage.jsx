import React,{useState} from 'react';
import Header from '../../Layout/Header';
import Sidebar from '../../Layout/Sidebar';
import { JobOverview } from '../../Components/JobAlerts/JobOverview';
import "./JobAlert.css"
const JobOverviewPage = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleCollapseToggle = (collapsedState) => {
      setIsCollapsed(collapsedState);
    };
  
    return (
      <>
        <Header onCollapseToggle={handleCollapseToggle} isCollapsed={isCollapsed}/>
        <Sidebar onCollapseToggle={handleCollapseToggle} />
        <div className={`main-wrapper ${isCollapsed ? "collapsed" : "expanded"}`}>
                <JobOverview />
            </div>
        </>
    )
}

export default JobOverviewPage;