import {
  SET_PROFILE_DATA
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
    default:
      return state
  }
}

export default messageStore
