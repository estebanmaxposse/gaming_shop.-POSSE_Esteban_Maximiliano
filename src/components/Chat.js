import React, { useState, useEffect, useMemo } from 'react';
import env from 'react-dotenv';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import jwt_decode from 'jwt-decode';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const socket = useMemo(() => io.connect(env.API_URL, { transports: ['websocket', 'polling'], withCredentials: true }), []);

    const { user } = useAuth();
    let token = localStorage.getItem('token');

    useEffect(() => {
        socket.on('load-messages', (messages) => {
            setMessages(messages);
        });
    }, []);
    
    socket.on('connect', () => {
        console.log('connected to server');
        setIsConnected(true);
    });
    socket.on('disconnect', () => {
        console.log('disconnected from server');
        setIsConnected(false);
    });
    socket.on('messages', (message) => {
        setMessages(message);
    });
    
    const handleSendMessage = (event) => {
        event.preventDefault();
        if (messageInput.trim() !== '') {
            const messageObject = {
                author: {
                    name: user.username || user.email,
                    email: user.email,
                    avatar: user.avatar || '',
                },
                senderID: user._id || jwt_decode(token).user._id,
                text: messageInput,
            };
            socket.emit('new-message', messageObject);
            setMessageInput('');
        }
    };

    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    return (
        <div>
            {!isConnected && <div>Connecting to server...</div>}
            {isConnected && (
                <div>
                    <h1>Chat App</h1>
                    <div>
                        <form onSubmit={handleSendMessage}>
                            <label htmlFor="messageInput">Message:</label>
                            <input
                                type="text"
                                id="messageInput"
                                value={messageInput}
                                onChange={handleInputChange}
                            />
                            <br />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                    <div>
                        <ul>
                            {Array.isArray(messages) && messages.length === 0 && <li>No messages</li>}
                            {messages.map((message, index) => (
                                <li key={index}>
                                    <span>{message.author.name || message.author.email}: </span>
                                    <span>{message.text}</span>
                                    <span>
                                        {new Date(message.date).toLocaleString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
