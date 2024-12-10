import React,{useState} from 'react';
import Header from '../../Layout/Header';
import Sidebar from '../../Layout/Sidebar';
import Message from '../../Components/Message/Chat';
import "./Message.css"
const MessagePage = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleCollapseToggle = (collapsedState) => {
      setIsCollapsed(collapsedState);
    };
  
    return (
      <>
        <Header onCollapseToggle={handleCollapseToggle} isCollapsed={isCollapsed}/>
        <Sidebar onCollapseToggle={handleCollapseToggle} />
        <div className={`main-wrapper ${isCollapsed ? "collapsed" : "expanded"}`}>
                <h4>ChatBox</h4>
                <Message />
            </div>
        </>
    )
}

export default MessagePage;