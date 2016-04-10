// Core
import React from 'react';
import _ from 'lodash';

export default class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  render() {
    let value = this.state.value;

    return (
      <div>
        <div>Ваш ник: <strong>{this.props.user}</strong></div>
        <input onChange={this.handleChange.bind(this)} onKeyPress={this.handleSend.bind(this)} value={value} />
      </div>
    );
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSend(e) {
    let { socket, sendMessage, user } = this.props;
    let message = this.state.value;

    if (e.charCode === 13 && message) {
      sendMessage({ message, user });
      socket.emit('message', { message, user });

      this.setState({value: ''});
    }
  }
}
