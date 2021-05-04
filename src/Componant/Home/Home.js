import axios from "axios";
import Pusher from "pusher-js";
import { Component } from "react";
import logo from "../../194938.png"
import ChatBox from "../../ChatBox";
import ChatList from "../../ChatList";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            username: '',
            chats: []
        };
    }
    componentDidMount() {
        const username = "Sahariar Shafin";
        this.setState({ username });
        const pusher = new Pusher('7493b4844f54db236cd2', {
            cluster: 'ap1',
            encrypted: true
        });
        const channel = pusher.subscribe('chat');
        channel.bind('message', data => {
            this.setState({ chats: [...this.state.chats, data], test: '' });
        });
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleButton = this.handleButton.bind(this);
        console.log(channel);
    }
    handleTextChange(e) {
        if (e.keyCode === 13) {
            const payload = {
                username: this.state.username,
                message: this.state.text
            };
            axios.post('http://localhost:5000/message', payload);
        } else {
            this.setState({ text: e.target.value });
        }
    }
    handleButton() {
        const payload = {
            username: this.state.username,
            message: this.state.text
        };
        axios.post('http://localhost:5000/message', payload)
            .then(response => {
                this.setState({ text: "" })
            })
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React-Pusher Chat</h1>
                </header>
                <section>
                    <ChatList chats={this.state.chats} />
                    <ChatBox
                        text={this.state.text}
                        username={this.state.username}
                        handleTextChange={this.handleTextChange}
                        handleButton={this.handleButton}
                    />
                </section>
            </div>
        );
    }
}
export default Home;