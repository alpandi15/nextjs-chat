import {
  SET_CONTACT_DATA,
  UPDATE_MESSAGE_TERAKHIR_DIMENU_USER,
  UPDATE_STATUS_USER_DIMENU_USER,
  SET_CONTACT_DATA_KONFIRMASI,
  DELETE_CONTACT_DATA_PROSES,
  DELETE_CONTACT_DATA_TOLAK,
  ADD_CONTACT_DATA_PROSES,
  ADD_CONTACT_DATA_KONFIRMASI,
  ADD_CONTACT_DATA_TOLAK,
  DELETE_CONTACT_DATA_KONFIRMASI,
  DELETE_CONTACT_DATA_TOLAK_BY_ID_USER,
  ADD_CONTACT_DATA
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
    case DELETE_CONTACT_DATA_PROSES:
      if (state?.contactProsess !== undefined) {
        const deletingContactProcess = state?.contactProsess?.filter((val: any) => {
          if (val?.id !== action?.payload?.id) {
            return val
          }
        })
        return {
          ...state,
          contactProsess: deletingContactProcess
        }
      }
      return state
    case ADD_CONTACT_DATA_PROSES:
      if (state?.contactProsess !== undefined) {
        return {
          ...state,
          contactProsess: [
            ...state?.contactProsess,
            action?.payload
          ]
        }
      }
      return state
    case DELETE_CONTACT_DATA_TOLAK:
      if (state?.contactTolak !== undefined) {
        const deletingContact = state?.contactTolak?.filter((val: any) => {
          if (val?.id !== action?.payload?.id) {
            return val
          }
        })
        return {
          ...state,
          contactTolak: deletingContact
        }
      }
      return state
    case ADD_CONTACT_DATA_PROSES:
      if (state?.contactProsess !== undefined) {
        return {
          ...state,
          contactProsess: [
            ...state?.contactProsess,
            action?.payload
          ]
        }
      }
      return state
    case ADD_CONTACT_DATA_KONFIRMASI:
      if (state?.contactKonfirmasi !== undefined) {
        return {
          ...state,
          contactKonfirmasi: [
            ...state?.contactKonfirmasi,
            action?.payload
          ]
        }
      }
      return state
    case ADD_CONTACT_DATA_TOLAK:
      if (state?.contactTolak !== undefined) {
        return {
          ...state,
          contactTolak: [
            ...state?.contactTolak,
            action?.payload
          ]
        }
      }
      return state
    case DELETE_CONTACT_DATA_PROSES:
      if (state?.contactProsess !== undefined) {
        const deletingContact = state?.contactProsess?.filter((val: any) => {
          if (val?.id !== action?.payload?.id) {
            return val
          }
        })
        return {
          ...state,
          contactProsess: deletingContact
        }
      }
      return state
    case DELETE_CONTACT_DATA_KONFIRMASI:
      if (state?.contactKonfirmasi !== undefined) {
        const deletingContact = state?.contactKonfirmasi?.filter((val: any) => {
          if (val?.id !== action?.payload?.id) {
            return val
          }
        })
        return {
          ...state,
          contactKonfirmasi: deletingContact
        }
      }
      return state
    case DELETE_CONTACT_DATA_TOLAK_BY_ID_USER:
      if (state?.contactTolak !== undefined) {
        const deletingContact = state?.contactTolak?.filter((val: any) => {
          if (val?.friend?.id !== action?.payload?.friend?.id) {
            return val
          }
        })
        return {
          ...state,
          contactTolak: deletingContact
        }
      }
      return state
    case ADD_CONTACT_DATA:
      if (state?.contacts !== undefined) {
        console.log('ADD CONTACT ', action.payload)
        return {
          ...state,
          contacts: [
            ...state?.contacts,
            action?.payload
          ]
        }
      }
      return state
    default:
      return state
  }
}

export default contactStore