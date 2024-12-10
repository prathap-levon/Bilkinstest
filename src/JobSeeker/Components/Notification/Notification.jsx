import React, { useState } from 'react';
import "./notification.css"
import { Switch } from 'antd';
import NotificationList from './NotificationList';


const Notification = () => {
  const [pushNotification, setPushNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true)
  const PushonChange = (checked) => {
    setPushNotification(checked);
  };
  const EmailonChange = (checked) => {
    setEmailNotification(checked);
  };

  return (
    <>
      <div className="main-title-all">
        <span>Notifications</span>
      </div>
      <NotificationList />
    </>
  )
}
export default Notification;