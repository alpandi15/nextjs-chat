import {
  SET_PROFILE_DATA,
  SET_MESSAGE_DATA,
  ADD_MESSAGE_DATA,
  UPDATE_MESSAGE_DATA,
  MERGE_MESSAGE_DATA,
  END_SCROLL,
  UPDATE_STATUS_PROFILE,
  sortMessage
} from '../type'

interface ActionProps {
  type?: string,
  payload: any
}

type InitialProps = {
  endScroll: boolean,
  profile: any,
  messages: string[],
  groupSortMessage: any
}

const initialState: InitialProps = {
  endScroll: true,
  profile: {},
  messages: [],
  groupSortMessage: {}
}

const messageStore = (state: InitialProps = initialState, action: ActionProps) => {
  switch (action.type) {
    case END_SCROLL:
      return {
        ...state,
        endScroll: action?.payload
      }
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

      // groupkan
      let keyGroup: string = 'created_at'
      messages = messages.reduce(function (r: any, a: any) {
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
    case UPDATE_STATUS_PROFILE:
      const find = action?.payload?.find((v: any) => v.id === state?.profile?.id)
      if (find) {
        return {
          ...state,
          profile: {
            ...state.profile,
            terakhir_dilihat: find?.status
          }
        }
      }
      return state
    default:
      return state
  }
}

export default messageStore
