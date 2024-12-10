import React,{useState} from 'react';
import Header from '../../Layout/Header';
import Sidebar from '../../Layout/Sidebar';
import "./HelpSupport.css"
import { HelpSupportOverview } from '../../Components/HelpAndSupport/HelpSupportOverview';
const HelpSupportPage = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleCollapseToggle = (collapsedState) => {
      setIsCollapsed(collapsedState);
    };
  
    return (
      <>
        <Header onCollapseToggle={handleCollapseToggle} isCollapsed={isCollapsed}/>
        <Sidebar onCollapseToggle={handleCollapseToggle} />
        <div className={`main-wrapper ${isCollapsed ? "collapsed" : "expanded"}`} style={{paddingTop:"0px"}}>
                <HelpSupportOverview />
            </div>
        </>
    )
}

export default HelpSupportPage;