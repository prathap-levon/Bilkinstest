import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMicOutline } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdArrowRoundBack } from 'react-icons/io';
const Message = () => {
    const allChats = [
        { name: 'Jennie Sherlock', message: 'Hey there is available', time: '4:30 PM', avatar: <FaUser />, unread: 0, group: false },
        { name: 'Ronald Tucker', message: 'Wow, that’s great...', time: '3:00 PM', avatar: <FaUser />, unread: 4, group: false },
        { name: 'Team Alpha', message: 'Meeting at 5 PM', time: '2:00 PM', avatar: <FaUser />, unread: 2, group: true },
        { name: 'Project Beta', message: 'New updates available', time: '1:00 PM', avatar: <FaUser />, unread: 0, group: true },
        { name: 'Rishabh Kumrawat', message: 'Wow, that’s great...', time: '3:00 PM', avatar: <FaUser />, unread: 4, group: false },
    ];
    
    const [activeTab, setActiveTab] = useState('All');
    const [selectedChat, setSelectedChat] = useState(null);
    const [isChatVisible, setIsChatVisible] = useState(false);

    const filteredChats = allChats.filter(chat => {
        if (activeTab === 'Unread') return chat.unread > 0;
        if (activeTab === 'Groups') return chat.group;
        if (activeTab === 'Contact') return !chat.group;
        return true;
    });
    
    const demoChat = [
        { sender: selectedChat?.name || '', message: 'Good morning', time: '11:35 AM', avatar: <FaUser /> },
        { sender: selectedChat?.name || '', message: 'Hi there, how are you?', time: '11:35 AM', avatar: <FaUser /> },
        { sender: 'Krishna Iam', message: 'I am down for whatever!', time: '11:36 AM', isSelf: true },
        { sender: 'Krishna Iam', message: 'Good morning', time: '11:36 AM', isSelf: true },
        { sender: 'Krishna Iam', message: 'I’ll be there in a few minutes, please wait!', time: '11:36 AM', isSelf: true },
        { sender: selectedChat?.name || '', message: 'Waiting for your reply...', time: '11:45 AM', avatar: <FaUser /> },
    ];

    return (
        <div className={`team-chat-container ${isChatVisible ? 'chat-visible' : 'sidebar-visible'}`}>
            <div className="chat-sidebar">
                <div className="user-profile">
                    <div className='d-flex align-items-center'>
                        <FaUser className="avatar" />
                        <div className="profile-info">
                            <h2>Krishna Iam</h2>
                            <p className="status">Available</p>
                        </div>
                    </div>
                    <button className='ellipse-btn'>⋮</button>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <IoSearchOutline className="w-5 h-5" />
                </div>
                <div className="chat-filters">
                    <button className={activeTab === 'All' ? 'message-active' : ''} onClick={() => setActiveTab('All')}>All</button>
                    <button className={activeTab === 'Unread' ? 'message-active' : ''} onClick={() => setActiveTab('Unread')}>Unread</button>
                    <button className={activeTab === 'Groups' ? 'message-active' : ''} onClick={() => setActiveTab('Groups')}>Groups</button>
                    <button className={activeTab === 'Contact' ? 'message-active' : ''} onClick={() => setActiveTab('Contact')}>Contact</button>
                </div>
                <div className='recent-chats'>
                    <h3>Recent Chats</h3>
                    <div className="recent-chats-section">
                        {filteredChats.map((chat, index) => (
                            <div
                                key={index}
                                className={`chat-item ${selectedChat === chat ? 'active-chat' : ''}`}
                                onClick={() => {
                                    setSelectedChat(chat);
                                    setIsChatVisible(true); 
                                }}
                                
                            >
                                <FaUser className="avatar" />
                                <div className="chat-info">
                                    <h4>{chat.name}</h4>
                                    <p>{chat.message}</p>
                                </div>
                                <div className="chat-meta">
                                    <p>{chat.time}</p>
                                    {chat.unread > 0 && <span className="unread-count">{chat.unread}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="main-chat">
                {selectedChat ? (
                    <>
                        <div className="chat-header">
                        
                            <div className="d-flex align-items-center">
                            <button className="back-btn" onClick={() => setIsChatVisible(false)}><IoMdArrowRoundBack size={24} /></button>
                                <FaUser className="avatar" />
                                <div className='profile-info'>
                                    <h2>{selectedChat.name}</h2>
                                    <p className="status">Available</p>
                                </div>
                            </div>
                            <div className="chat-actions">
                                <IoSearchOutline className="w-5 h-5" />
                                <button className='ellipse-btn'>⋮</button>
                            </div>
                        </div>
                        <div className="chat-messages">
                            <div className="date-separator">
                                <div className="line-horizontal"></div>
                                <button>Today</button>
                                <div className="line-horizontal"></div>
                            </div>
                            {demoChat.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message ${message.isSelf ? 'self' : 'received'}`}
                                >
                                    <p>{message.message}</p>
                                    <span className="time">{message.time}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="no-chat-selected">Select a chat to view messages</p>
                )}
                <div className="message-input">
                    <input type="text" placeholder="Message" />
                    <button><IoMicOutline className="w-5 h-5" /></button>
                    <button><LuSendHorizonal className="w-5 h-5" /></button>
                </div>
            </div>
        </div>
    );
};

export default Message;
