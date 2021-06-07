import {
  SET_CONTACT_DATA,
  SET_CONTACT_DATA_KONFIRMASI,
  UPDATE_MESSAGE_TERAKHIR_DIMENU_USER,
  UPDATE_STATUS_USER_DIMENU_USER,
  DELETE_CONTACT_DATA_PROSES,
  ADD_CONTACT_DATA_PROSES,
  DELETE_CONTACT_DATA_TOLAK,
  ADD_CONTACT_DATA_KONFIRMASI,
  ADD_CONTACT_DATA_TOLAK,
  DELETE_CONTACT_DATA_KONFIRMASI,
  DELETE_CONTACT_DATA_TOLAK_BY_ID_USER,
  ADD_CONTACT_DATA
} from '../type'
import {
  apiGetContact,
  apiCheckOnline,
  apiGetContactKonfirmasi
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
    if (res?.data?.length > 0) {
      res?.data.forEach((f: any) => {
        dispatch(commitUpdateStatusUserContact(f))
      });
    }
    dispatch(updateStatusProfileDispatch(res?.data))
  } catch (error) {
    console.log(error)
  }
}

// const commitContactKonfirmasi = (data: any) => {
//   return {
//     type: SET_CONTACT_DATA_KONFIRMASI,
//     payload: data
//   }
// }

export const getContactsDataKonfirmasi = () => async (dispatch: any) => {
  try {
    const res = await apiGetContactKonfirmasi()
    if (res?.data?.length > 0) {
      dispatch({
        type: SET_CONTACT_DATA_KONFIRMASI,
        payload: res?.data
      })
    }
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const addContactDataProses = (data: any) => async (dispatch: any) => {
  try {
    let newData = {
      id: data?.id,
      friend: data?.friend,
      status: data?.status,
      created_at: data?.created_at,
      updated_at: data?.updated_at
  };
    dispatch({
      type: DELETE_CONTACT_DATA_PROSES,
      payload: newData
    })
    dispatch({
      type: ADD_CONTACT_DATA_PROSES,
      payload: newData
    })
    dispatch({
      type: DELETE_CONTACT_DATA_TOLAK,
      payload: newData
    })
  } catch (error) {
    console.log(error)
  }
}

export const addContactDataKonfirmasi = (data: any, user: UserDataContext) => async (dispatch: any) => {
  try {
    let newData = {};
    if (data?.friend?.id === user?.id) {
      newData = {
        id: data?.id,
        friend: data?.me,
        status: data?.status,
        created_at: data?.created_at,
        updated_at: data?.updated_at
      };
    } else {
      newData = {
        id: data?.id,
        friend: data?.friend,
        status: data?.status,
        created_at: data?.created_at,
        updated_at: data?.updated_at
      };
    }
    dispatch({
      type: ADD_CONTACT_DATA_KONFIRMASI,
      payload: newData
    })
  } catch (error) {
    console.log(error)
  }
}

export const konfirmasiContactTolak = (data: any, user: UserDataContext) => async (dispatch: any) => {
  try {
    let newData = {
      id: data?.id,
      friend: data?.friend,
      status: data?.status,
      created_at: data?.created_at,
      updated_at: data?.updated_at
    }

    if(user.id !== newData.friend.id){
      dispatch({
        type: ADD_CONTACT_DATA_TOLAK,
        payload: newData
      })
    }
    dispatch({
      type: DELETE_CONTACT_DATA_KONFIRMASI,
      payload: newData
    })
  } catch (error) {
    console.log(error)
  }
}

export const konfirmasiContactDiterima = (data: any, user: UserDataContext) => async (dispatch: any) => {
  try {
    let newDataPengirim = {
      id: data?.id,
      friend: data?.me,
      status: data?.status,
      created_at: data?.created_at,
      updated_at: data?.updated_at
    }

    let newDataPenerima = {
      id: data?.id,
      friend: data?.friend,
      status: data?.status,
      created_at: data?.created_at,
      updated_at: data?.updated_at
    }
    if(newDataPengirim?.friend?.id !== user.id){
      console.log('DITERIMA PENGIRIM', newDataPengirim)
      dispatch({
        type: ADD_CONTACT_DATA,
        payload: newDataPengirim
      })
      // commit('ADD_CONTACT_DATA', newDataPengirim)
    }else{
      console.log('DITERIMA PENERIMA ', newDataPengirim)
      dispatch({ type: ADD_CONTACT_DATA, payload: newDataPenerima })
      // commit('ADD_CONTACT_DATA', newDataPenerima)
    }
    // console.log('berapa kali ini');

    dispatch({ type: DELETE_CONTACT_DATA_KONFIRMASI, payload: newDataPengirim })
    dispatch({ type: DELETE_CONTACT_DATA_TOLAK_BY_ID_USER, payload: newDataPengirim })
    dispatch({ type: DELETE_CONTACT_DATA_PROSES, payload: newDataPengirim })

    // commit('DELETE_CONTACT_DATA_KONFIRMASI', newDataPengirim.id)
    // commit('DELETE_CONTACT_DATA_TOLAK_BY_ID_USER', newDataPengirim.friend.id)
    // commit('DELETE_CONTACT_DATA_PROSES', newDataPengirim.id)
  } catch (error) {
    console.log(error)    
  }
}