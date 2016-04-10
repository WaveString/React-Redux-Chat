import types from '../constants/actions';
import _ from 'lodash';

const defaultMessages = [];
const defaultUsers = {
  users: [],
  currentUser: '',
  error: null
};

export function messages(state = defaultMessages, { type, message }) {
  switch (type) {
    case types.SEND_MESSAGE:
      const newId = state.length + 1;

      return [
        ...state,
        {
          id: newId,
          message: message.message,
          user: message.user,
          date: new Date()
        }
      ];

    default:
      return state;
  }
}

export function users(state = defaultUsers, action) {
  switch (action.type) {
    case types.JOIN_CHAT:
          if (_.includes(state.users, action.username)) {
            return {
              ...state,
              error: 'Это имя уже используется'
            };
          }

          return {
            users: [...state.users, action.username],
            currentUser: action.username,
            error: null
          };

    case types.UPDATE_USERS:
      console.log('UPDATE USERS', action.users);
          return {
            users: action.users,
            currentUser: state.currentUser,
            error: null
          };

    default:
      return state;
  }
}
