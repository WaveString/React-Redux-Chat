// Core
import React from 'react';
import moment from 'moment';
import './style.css';

export default class MessageList extends React.Component {
  render() {
    let messages = this.props.messages.map((message, i) =>
      <li key={i} className="message">
        <b>{ message.user }:</b> { message.message }
        <i className="date">{ moment(message.date).format('DD.MM HH:mm:ss') }</i>
      </li>);

    return (
      <ul className="messages">
        { messages }
      </ul>
    );
  }
}
