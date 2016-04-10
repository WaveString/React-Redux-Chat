import types from '../constants/actions';

export function sendMessage(message) {
  return {
    type: types.SEND_MESSAGE,
    message
  };
}

export function joinChat(username) {
  return {
    type: types.JOIN_CHAT,
    username
  };
}

export function updateUsers(users) {
  return {
    type: types.UPDATE_USERS,
    users
  };
}
