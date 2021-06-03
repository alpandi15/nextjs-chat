import {
  SET_PROFILE_DATA,
  SET_MESSAGE_DATA,
  ADD_MESSAGE_DATA,
  UPDATE_MESSAGE_DATA,
  MERGE_MESSAGE_DATA,
  LOAD_PROFILE_DATA,
  sortMessage
} from '../type'

interface ActionProps {
  type?: string,
  payload: any
}

type InitialProps = {
  loadProfile: boolean,
  profile: {},
  messages: [],
  groupSortMessage: {}
}

const initialState: InitialProps = {
  loadProfile: false,
  profile: {},
  messages: [],
  groupSortMessage: {}
}

const messageStore = (state: InitialProps = initialState, action: ActionProps) => {
  switch (action.type) {
    case LOAD_PROFILE_DATA:
      return {
        ...state,
        loadProfile: true
      }
    case SET_PROFILE_DATA:
      return {
        ...state,
        loadProfile: false,
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
    case ADD_MESSAGE_DATA:
      let updateMessage: string[] = state.messages || []
      updateMessage.push(action?.payload?.messages)
      console.log('UPDATE ', updateMessage)
      return {
        ...state,
        messages: updateMessage
      }
    case UPDATE_MESSAGE_DATA:
      const mapingMessage = state?.messages.map((val: any) => {
        if (val?.client_ref_id === action?.payload?.messages?.client_ref_id) {
          return {
            ...val,
            id: action?.payload?.messages?.id,
            read_at: action?.payload?.messages?.read_at
          }
        }
        return val
      })

      console.log('MAPING MESSAGE ', mapingMessage, state?.messages)
      return {
        ...state,
        messages: mapingMessage
      }
    case MERGE_MESSAGE_DATA:
      let merger = state?.messages?.concat(action?.payload)
      return {
        ...state,
        messages: merger
      }
    default:
      return state
  }
}

export default messageStore
