import {
  SET_CONTACT_DATA
} from '../type'

interface ActionProps {
  type?: string,
  payload: any
}

type InitialProps = {
  contacts?: [],
  contactKonfirmasi?: [],
  contactTolak?: [],
  contactProsess?: [],
}

const initialState: InitialProps = {
  contacts: [],
  contactKonfirmasi: [],
  contactTolak: [],
  contactProsess: [],
}

export default (state: InitialProps = initialState, action: ActionProps) => {
  switch (action.type) {
    case SET_CONTACT_DATA:
      return {
        ...state,
        contacts: action?.payload?.contacts
      }
    default:
      return state
  }
}