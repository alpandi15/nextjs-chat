import {
  SET_CONTACT_DATA
  // UPDATE_STATUS_USER_DIMENU_USER
} from '../type'

interface ActionProps {
  type?: string,
  payload?: any
}

type InitialProps = {
  contacts?: [] | undefined,
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

export default (state: InitialProps = initialState, action: ActionProps = {}) => {
  switch (action.type) {
    case SET_CONTACT_DATA:
      return {
        ...state,
        contacts: action?.payload?.contacts
      }
    // case UPDATE_STATUS_USER_DIMENU_USER:
    //   let filterData = state?.contacts.filter(v => v.friend.id == action?.payload.id)
    //   // let contacts: [] = []
    //   // filterData.forEach(f => {
    //   //   contacts = state?.contacts[state?.contacts.findIndex(v => v.friend.id == f.friend.id)].friend.terakhir_dilihat = action?.payload.status
    //   // });
    //   return {
    //     ...state
    //     // contacts
    //   }
    default:
      return state
  }
}