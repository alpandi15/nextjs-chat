import moment from 'moment'
import {
  SET_PROFILE_DATA,
  SET_MESSAGE_DATA,
  sortMessage,
  ADD_MESSAGE_DATA,
  UPDATE_MESSAGE_DATA
} from '../type'
import {
  apiGetProfileData,
  apiGetMessege
} from '../../services/message'
import { generateUuid } from '../../services/utils/uuid'
import { UserDataContext } from 'context/AppContext'
import { commitUpdateStatusUserContact } from './contact'

const commit = (data: any) => {
  return {
    type: SET_PROFILE_DATA,
    payload: {
      profile: data
    }
  }
}

const setMessageDispatch = (messages: any) => {
  return {
    type: SET_MESSAGE_DATA,
    payload: {
      messages
    }
  }
}

export const setSortMessageDispatch = (status: string) => {
  return {
    type: sortMessage,
    payload: {
      status
    }
  }
}

const addMessageDispatch = (messages: any) => {
  return {
    type: ADD_MESSAGE_DATA,
    payload: {
      messages
    }
  }
}

export const updateMessageDataDispatch = (messages: any) => {
  return {
    type: UPDATE_MESSAGE_DATA,
    payload: {
      messages
    }
  }
}

type ResProfile = {
  id: number,
  name: string,
  terakhir_dilihat: string,
  username: string
}
export const getProfileData = (id: number) => async (dispatch: any) => {
  try {
    const res: ResProfile = await apiGetProfileData(id)
    if (res) {
      dispatch(commit(res))
      dispatch(commitUpdateStatusUserContact({
        id: res.id,
        status: res.terakhir_dilihat
      }))
    }
  } catch (err) {
    console.log(err)
  }
}

export const getMessageData = (id: number) => async (dispatch: any) => {
  try {
    const res = await apiGetMessege(id)
    if (res) {
      let dataChange = res?.data.map((value: { id: any; pesan: any; timestamp: any; created_at: any; read_at: any; time: any; pengirim: any }) => {
        return {
          id: value.id,
          message: value.pesan,
          timestamp: value.timestamp,
          created_at: value.created_at,
          read_at: value.read_at,
          time: value.time,
          pengirim: value.pengirim
          // as: vm.$auth.$state.user.id === value.pengirim ? 'pengirim' : 'penerima'
        }
      })
      dispatch(setMessageDispatch(dataChange))
      dispatch(setSortMessageDispatch('timestamp'))
    }
  } catch (err) {
    console.log(err)
  }
}

export const addSetMessageData = (data: any, user: UserDataContext) => async (dispatch: any) => {
  try {
    let uuid = await generateUuid()
    let dataChange = {
      id: data?.id || uuid,
      client_ref_id: data?.client_ref_id,
      message: data?.pesan,
      timestamp: data?.timestamp || new Date().getTime(),
      created_at: data?.created_at || moment().format('DD/MM/YYYY HH:mm'),
      read_at: data?.read_at || null,
      time: data?.time || moment().format('HH:mm'),
      pengirim: data?.pengirim || user?.id
    }
    console.log('ADD MESSAGE DATA ', dataChange)
    dispatch(addMessageDispatch(dataChange))
    dispatch(setSortMessageDispatch('timestamp'))
  } catch (error) {
    console.log(error)
  }
}