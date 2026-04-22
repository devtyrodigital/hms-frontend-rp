import React, { useState } from 'react';
import '../styles/notification.css';

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Initial notifications with read/unread states
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New appointment booked", time: "2 mins ago", read: false },
        { id: 2, message: "Dr. Smith checked in", time: "1 hour ago", read: false },
        { id: 3, message: "Patient report updated", time: "3 hours ago", read: false },
        { id: 4, message: "Lab results available", time: "5 hours ago", read: true },
        { id: 5, message: "Dr. Johnson updated schedule", time: "1 day ago", read: true },
        { id: 6, message: "New patient registered", time: "2 days ago", read: true },
        { id: 7, message: "Billing invoice sent", time: "3 days ago", read: true },
        { id: 8, message: "Room 204 ready for patient", time: "4 days ago", read: true }
    ]);

    const toggleNotification = () => {
        setIsOpen(!isOpen);
    };

    const handleMarkAsRead = (id) => {
        setNotifications(prev =>
            prev.map(note =>
                note.id === id ? { ...note, read: true } : note
            )
        );
    };

    // Count unread notifications for badge
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="notification-container">
            <span className="notification-icon-btn" onClick={toggleNotification}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                )}
            </span>
            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h4>Notifications</h4>
                    </div>
                    <ul className="notification-list">
                        {notifications.map(note => (
                            <li
                                key={note.id}
                                className={`notification-item ${note.read ? 'read' : 'unread'}`}
                                onClick={() => handleMarkAsRead(note.id)}
                            >
                                {!note.read && <span className="unread-indicator"></span>}
                                <div className="notification-content">
                                    <p className="notification-message">{note.message}</p>
                                    <span className="notification-time">{note.time}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notification;
