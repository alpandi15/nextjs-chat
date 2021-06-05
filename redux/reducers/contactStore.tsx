import {
  SET_CONTACT_DATA,
  UPDATE_MESSAGE_TERAKHIR_DIMENU_USER,
  UPDATE_STATUS_USER_DIMENU_USER,
  SET_CONTACT_DATA_KONFIRMASI
} from '../type'

interface ActionProps {
  type?: string,
  payload?: any
}

type InitialProps = {
  contacts?: string[],
  contactKonfirmasi?: string[],
  contactTolak?: string[],
  contactProsess?: string[],
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
    case UPDATE_STATUS_USER_DIMENU_USER:
      if (state?.contacts !== undefined) {
        const mapingContact = state?.contacts.map((val: any) => {
          if (val?.friend.id === action?.payload?.id) {
            return {
              ...val,
              friend: {
                ...val.friend,
                terakhir_dilihat: action?.payload?.status
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
      return state
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
    case SET_CONTACT_DATA_KONFIRMASI:
      return {
        ...state,
        contactKonfirmasi: action?.payload
      }

    default:
      return state
  }
}

export default contactStore