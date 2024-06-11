import React, { useEffect, useState } from 'react';
import './App.css';

const toColor = 'blue'
const fromColor = 'pink'

const defaultMessages = [
    {
        msg: "Knock knock!",
        directionTo: true,
        waitSec: 5,
        bgColor: toColor,
        fontColor: "#fff"
    },
    {
        msg: "Who's there?",
        directionTo: false,
        waitSec: 2,
        bgColor: fromColor,
        fontColor: "#000"
    },
    

    {
        msg: "Orange.",
        directionTo: true,
        waitSec: 2,
        bgColor: toColor,
        fontColor: "#fff"
    },
    {
        msg: "Orange who?",
        directionTo: false,
        waitSec: 2,
        bgColor: fromColor,
        fontColor: "#000"
    },


    {
        msg: "Orange you glad I didn't kick you in the stomach?",
        directionTo: true,
        waitSec: 5,
        bgColor: toColor,
        fontColor: "#fff"
    },
    {
        msg: "FU!",
        directionTo: false,
        waitSec: 2,
        bgColor: fromColor,
        fontColor: "#000"
    },
]

const parseUrlMessages = () => {
    const params = new URLSearchParams(window.location.search);
    const messages = params.get('messages');
    if (messages) {
        try {
            return JSON.parse(decodeURIComponent(messages));
        } catch (e) {
            console.error("Invalid JSON in URL parameters");
        }
    }
    return defaultMessages;
};

const App = () => {
    const [messages, setMessages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const urlMessages = parseUrlMessages();
        setMessages(urlMessages);
    }, []);

    useEffect(() => {
        if (currentIndex < messages.length) {
            const { waitSec } = messages[currentIndex];
            const timer = setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
            }, waitSec * 1000);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, messages]);

    return (
        <div className="App">
            {messages.slice(0, currentIndex).map((message, index) => (
                <Message key={index} {...message} />
            ))}
            {currentIndex < messages.length && (
                <TypingIndicator directionTo={messages[currentIndex].directionTo} waitSec={messages[currentIndex].waitSec} />
            )}
        </div>
    );
};

const Message = ({ msg, directionTo, bgColor, fontColor }) => {
    const messageStyle = {
        backgroundColor: bgColor,
        color: fontColor,
        alignSelf: directionTo ? 'flex-start' : 'flex-end',
        borderRadius: '10px',
        padding: '10px',
        margin: '5px',
        maxWidth: '60%',
    };
    return <div style={messageStyle}>{msg}</div>;
};

const TypingIndicator = ({ directionTo, waitSec }) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const typingStyle = {
        alignSelf: directionTo ? 'flex-start' : 'flex-end',
        margin: '5px',
        fontSize: '20px',
    };

    return (
        <div className="typing-indicator" style={typingStyle}>
            {dots}
        </div>
    );
};

export default App
