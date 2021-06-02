import {
  SET_CONTACT_DATA,
  UPDATE_MESSAGE_TERAKHIR_DIMENU_USER
  // UPDATE_STATUS_USER_DIMENU_USER
} from '../type'

interface ActionProps {
  type?: string,
  payload?: any
}

type InitialProps = {
  contacts?: string[],
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

const contactStore = (state: InitialProps = initialState, action: ActionProps = {}) => {
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
    case UPDATE_MESSAGE_TERAKHIR_DIMENU_USER:
      const { payload } = action

      if (state?.contacts !== undefined) {
        const mapingContact = state?.contacts.map((val: any) => {
          if (val?.friend.id === payload?.data?.pengirim) {
            return {
              ...val,
              friend: {
                ...val.friend,
                as_pesan: payload?.data?.as_pesan,
                read_at: payload?.data?.read_at,
                pesan_terakhir: payload?.data?.pesan_terakhir
              }
            }
          } else if (val?.friend.id === payload?.data?.penerima) {
            return {
              ...val,
              friend: {
                ...val.friend,
                as_pesan: payload?.data?.as_pesan,
                read_at: payload?.data?.read_at,
                pesan_terakhir: payload?.data?.pesan_terakhir
              }
            }
          }
          return val
        })

        return {
          ...state,
          contacts: mapingContact
        }
      }

      return {
        ...state
      }
    default:
      return state
  }
}

export default contactStore