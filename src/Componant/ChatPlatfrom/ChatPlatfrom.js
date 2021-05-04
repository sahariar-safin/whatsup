import React, { useEffect, useState } from 'react';
import logo from './194938.png'
import { setPusherClient } from 'react-pusher';
import Pusher from 'pusher-js';
import pusher from 'pusher-js';
import axios from 'axios';
import ChatList from '../../ChatList'
import ChatBox from '../../ChatBox'


const ChatPlatfrom = () => {
    const pusherClient = new pusher('7493b4844f54db236cd2', {
        cluster: 'ap1',
        encrypted: true
    });

    setPusherClient(pusherClient);

    const [chats, setChats] = useState([]);
    const [text, setText] = useState(null);

    const [username, setUsername] = useState();
    const [img, setImg] = useState();
    useEffect(() => {
        axios.get('https://randomuser.me/api/')
            .then(response => {
                const data = response.data.results[0].name.first;
                const img = response.data.results[0].picture.medium;
                console.log(img);
                setUsername(data);
                setImg(img);
            })
    }, [])

    const channel = pusherClient.subscribe('chat');
    channel.bind('message', data => {
        console.log(data);
        setChats([...chats, data]);
    });

    const handleTextChange = (e) => {
        if (e.keyCode === 13) {
            const payload = {
                username: username,
                message: text
            };
            axios.post('http://localhost:5000/message', payload);
        } else {
            setText(e.target.value);
        }
    }

    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React-Pusher Chat</h1>
                </header>
                <section>
                    <ChatList img={img} chats={chats} />
                    <ChatBox
                        text={text}
                        username={username}
                        handleTextChange={handleTextChange}
                    />
                </section>
            </div>
        </div>
    );
};

export default ChatPlatfrom;