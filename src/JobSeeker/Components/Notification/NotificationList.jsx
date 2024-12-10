import React, { useState, useEffect } from 'react';
import "./notification.css";
import { Menu } from 'antd';
import { FaUserTie } from "react-icons/fa6";
import Instance from '../../../AxiosConfig';
import { useSelector, useDispatch } from 'react-redux';
import { addAllNotifications, setUnReadCount, markAsRead, deleteNotification} from "../../../features/notificationSlice";
import { DeleteOutlined } from "@ant-design/icons";
import DOMpurify from 'dompurify';

const items = [{ label: "Overview", key: "overview" }];
const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

const NotificationList = () => {
    const [current, setCurrent] = useState("overview");
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications.notifications);

    const markAllNotificationRead = async () => {
        try {
            const response = await Instance.put('/markAsRead', {}, {
                headers: {
                    Authorization: `Bearer ${loggedInUserInfo?.token}`,
                  },
            });
            if (response.status === 200) {
                dispatch(markAsRead());
                dispatch(setUnReadCount(0));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchNotification = async () => {
        try {
            const response = await Instance.get('/getAllNotifications', {
                headers: {
                    Authorization: `Bearer ${loggedInUserInfo?.token}`,
                  },
            });
            if (response.status === 200) {
                let data = response?.data?.notifications;
                data = data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                if (data) dispatch(addAllNotifications(data));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await Instance.delete(`/deleteNotification/${id}`, {
                headers: {
                    Authorization: `Bearer ${loggedInUserInfo?.token}`,
                  },
            });
            if (response.status === 200) {
                dispatch(deleteNotification(id));
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNotification();
        markAllNotificationRead();
    }, []);

    const onClick = (e) => {
        setCurrent(e.key);
    }

    return (
        <>
            {
                notifications.length === 0 ? (
                    <div className='no-notifications'>No notifications!</div>
                ) : (
                    <div className="notification-layout">
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                        <ul className='overview-list'>
                            {notifications.map((data, index) => (
                                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 className='overview-list-title'>{data?.notificationTitle}</h3>
                                        <div className='content-bar'>
                                            <span className='icon-data-fill'><FaUserTie /></span>
                                            <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(data?.description) }}></span>
                                        </div>
                                    </div>
                                    <DeleteOutlined onClick={() => handleDelete(data?._id)} className="delete-button-table" />
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </>
    )
}

export default NotificationList;
