// Core
import React from 'react';

export default class UserList extends React.Component {
  render() {
    let users = this.props.users.map((user, i) =>
      <li key={i}>{ user }</li>);

    return (
      <ul>
        <li>Список пользователей:</li>
        { users }
      </ul>
    );
  }
}
