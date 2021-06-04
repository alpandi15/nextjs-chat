import {
  SET_CONTACT_DATA,
  UPDATE_MESSAGE_TERAKHIR_DIMENU_USER,
  UPDATE_STATUS_USER_DIMENU_USER
} from '../type'
import {
  apiGetContact,
  apiCheckOnline
} from '../../services/contacts'
import { UserDataContext } from '../../context/AppContext'
import { updateStatusProfileDispatch } from './message'

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

type UpdateStatusProps = {
  id: number,
  status: string
}
export const commitUpdateStatusUserContact = (data: UpdateStatusProps) => {
  return {
    type: UPDATE_STATUS_USER_DIMENU_USER,
    payload: data
  }
}

export const updateMessageContact = (data: any, user: UserDataContext) => (dispatch: any) => {
  try {
    let dataChange = {
      pengirim: data?.pengirim,
      penerima: data?.penerima,
      pesan_terakhir: data?.pesan,
      read_at: data?.read_at || null,
      as_pesan: user.id === data?.pengirim ? 'pengirim' : 'penerima',
    }
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

export const updateStatusContact = () => async (dispatch: any) => {
  try {
    const res = await apiCheckOnline()
    console.log('DATA ONLINE ', res)
    if (res?.data?.length > 0) {
      res?.data.forEach((f: any) => {
        // commit('UPDATE_STATUS_USER_DIMENU_USER', f)
        dispatch(commitUpdateStatusUserContact(f))
      });
    }
    dispatch(updateStatusProfileDispatch(res?.data))
  } catch (error) {
    console.log(error)
  }
}