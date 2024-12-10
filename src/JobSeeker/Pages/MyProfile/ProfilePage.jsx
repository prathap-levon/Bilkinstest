import React,{useState} from 'react';
import Header from '../../Layout/Header';
import Sidebar from '../../Layout/Sidebar';
import { ProfileOverview } from '../../Components/MyProfile/ProfileOverview';
import "./ProfilePage.css"
const ProfilePage = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  const handleCollapseToggle = (collapsedState) => {
    setIsCollapsed(collapsedState);
  };

  return (
    <>
      <Header onCollapseToggle={handleCollapseToggle} isCollapsed={isCollapsed}/>
      <Sidebar onCollapseToggle={handleCollapseToggle} />
      <div className={`main-wrapper ${isCollapsed ? "collapsed" : "expanded"}`}>
                <ProfileOverview />
            </div>
        </>
    )
}

export default ProfilePage;