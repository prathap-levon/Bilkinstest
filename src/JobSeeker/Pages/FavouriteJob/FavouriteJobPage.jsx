import React,{useState} from 'react';
import Header from '../../Layout/Header';
import Sidebar from '../../Layout/Sidebar';
import "./FavouriteJob.css"
import { FavouriteJobList } from '../../Components/FavouriteJob/FavouriteJobList';
const FavouriteJobPage = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleCollapseToggle = (collapsedState) => {
      setIsCollapsed(collapsedState);
    };
  
    return (
      <>
        <Header onCollapseToggle={handleCollapseToggle} isCollapsed={isCollapsed}/>
        <Sidebar onCollapseToggle={handleCollapseToggle} />
        <div className={`main-wrapper ${isCollapsed ? "collapsed" : "expanded"}`}>
                <FavouriteJobList />
            </div>
        </>
    )
}

export default FavouriteJobPage;