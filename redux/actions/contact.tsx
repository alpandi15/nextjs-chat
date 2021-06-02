import {
  SET_CONTACT_DATA,
  UPDATE_MESSAGE_TERAKHIR_DIMENU_USER
} from '../type'
import {
  apiGetContact
} from '../../services/contacts'
import { UserDataContext } from '../../context/AppContext'

const commit = (data: any) => {
  return {
    type: SET_CONTACT_DATA,
    payload: {
      contacts: data
    }
  }
}

const commitUpdateMessageContact = (data: any) => {
  return {
    type: UPDATE_MESSAGE_TERAKHIR_DIMENU_USER,
    payload: {
      data
    }
  }
}

export const updateMessageContact = (data: any, user: UserDataContext) => (dispatch: any) => {
  try {
    let dataChange = {
      pengirim: data?.pengirim,
      penerima: data?.penerima,
      pesan_terakhir: data?.pesan,
      read_at: data?.read_at,
      as_pesan: user.id === data?.pengirim ? 'pengirim' : 'penerima',
    }
    console.log('DATA DI TERIMA ', dataChange)
    dispatch(commitUpdateMessageContact(dataChange))
    return
  } catch (error) {
    console.log(error)
  }
}

export const getContactsData = () => async (dispatch: any) => {
  try {
    const res = await apiGetContact()
    if (res?.success) {
      dispatch(commit(res?.data))
    }
  } catch (err) {
    console.log(err)
  }
}