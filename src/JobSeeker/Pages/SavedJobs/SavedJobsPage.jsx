import React,{useState} from 'react';
import Header from '../../Layout/Header';
import Sidebar from '../../Layout/Sidebar';
import "../FavouriteJob/FavouriteJob.css"
import { SavedJobsList } from '../../Components/SavedJobs/SavedJobsList';
const SavedJobsPage = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleCollapseToggle = (collapsedState) => {
      setIsCollapsed(collapsedState);
    };
  
    return (
      <>
        <Header onCollapseToggle={handleCollapseToggle} isCollapsed={isCollapsed}/>
        <Sidebar onCollapseToggle={handleCollapseToggle} />
        <div className={`main-wrapper ${isCollapsed ? "collapsed" : "expanded"}`}>
                <SavedJobsList />
            </div>
        </>
    )
}

export default SavedJobsPage;