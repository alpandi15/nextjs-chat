import {
  SET_PROFILE_DATA,
  SET_MESSAGE_DATA,
  sortMessage
} from '../type'

interface ActionProps {
  type?: string,
  payload: any
}

type InitialProps = {
  profile: {},
  messages: [],
  groupSortMessage: {}
}

const initialState: InitialProps = {
  profile: {},
  messages: [],
  groupSortMessage: {}
}

const messageStore = (state: InitialProps = initialState, action: ActionProps) => {
  switch (action.type) {
    case SET_PROFILE_DATA:
      return {
        ...state,
        profile: action?.payload?.profile
      }
    case SET_MESSAGE_DATA:
      return {
        ...state,
        messages: action?.payload?.messages
      }
    case sortMessage:
      let messages = state.messages;
      // urutkan terlebih dahulu semua data
      messages.sort((a, b) => {
        let compare = 0;
        if (a[action?.payload?.status] > b[action?.payload?.status]) {
            compare = 1;
        } else if (b[action?.payload?.status] > a[action?.payload?.status]) {
            compare = -1;
        }
        return compare;
      });

      console.log('MESSAGES ', messages)
      // groupkan
      let keyGroup = 'created_at'
      messages = messages.reduce(function (r, a) {
        r[String(a[keyGroup]).split(' ')[0]] = r[String(a[keyGroup]).split(' ')[0]] || [];
        r[String(a[keyGroup]).split(' ')[0]].push(a);
        return r;
      }, Object.create(null));
      return {
        ...state,
        groupSortMessage: messages
      }
    default:
      return state
  }
}

export default messageStore
