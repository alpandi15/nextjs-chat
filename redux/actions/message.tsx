import {
  SET_PROFILE_DATA,
  SET_MESSAGE_DATA,
  sortMessage
} from '../type'
import {
  apiGetProfileData,
  apiGetMessege
} from '../../services/message'

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

const setSortMessageDispatch = (status: string) => {
  return {
    type: sortMessage,
    payload: {
      status
    }
  }
}

export const getProfileData = (id: number) => async (dispatch: any) => {
  try {
    const res = await apiGetProfileData(id)
    if (res) {
      dispatch(commit(res))
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