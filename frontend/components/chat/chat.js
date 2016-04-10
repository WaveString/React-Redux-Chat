// Core
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as ChatActions from '../../actions/chat';

// Socket
import io from 'socket.io-client';

// Components
import MessageList from './messageList/messageList';
import MessageInput from './messageInput/messageInput';
import LoginForm from './loginForm/loginForm';
import UserList from './userList/userList';

@connect(state => state)
export default class ChatApp extends React.Component {
  constructor(props) {
    super(props);

    const dispatch = this.props.dispatch;

    this.socket = io.connect({ 'multiplex': false });
    this.actions = bindActionCreators(ChatActions, dispatch);
  }

  componentDidMount() {
    this.socket.on('connected', (users) => this.actions.updateUsers(users));
    this.socket.on('newUser', (users) => this.actions.updateUsers(users));
    this.socket.on('userLeft', (users) => this.actions.updateUsers(users));
    this.socket.on('message', (message) => this.actions.sendMessage(message));
  }

  render() {
    let content;
    let { currentUser, users } = this.props.users;
    
    if (currentUser) {
      content = [
        <h4>Simple React-Chat!</h4>,
        <MessageList messages={this.props.messages} />,
        <MessageInput
          sendMessage={this.actions.sendMessage}
          user={currentUser}
          socket={this.socket}/>,
        <UserList users={users} />
      ];
    } else {
      content = (<LoginForm joinChat={this.actions.joinChat} socket={this.socket} />);
    }

    return (
      <div>
       { content }
      </div>
    );
  }
}
