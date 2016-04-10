// Core
import React from 'react';
import './style.css';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  render() {
    let value = this.state.value;

    return (
      <div>
        <label htmlFor='username' className='login__username'>Username:</label>
        <input
          id='username'
          className='login__input'
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleSend.bind(this)}
          value={value} />
      </div>
    );
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSend(e) {
    let { socket, joinChat } = this.props;
    let username = this.state.value;

    if (e.charCode === 13 && username) {
      joinChat(username);
      socket.emit('joinChat', username);
    }
  }
}
