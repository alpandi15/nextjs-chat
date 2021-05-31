import {
  SET_PROFILE_DATA,
  UPDATE_STATUS_USER_DIMENU_USER
} from '../type'
import {
  apiGetProfileData
} from '../../services/message'

const commit = (data: any) => {
  return {
    type: SET_PROFILE_DATA,
    payload: {
      profile: data
    }
  }
}

const updateUserMenu = (data: any) => {
  return {
    type: UPDATE_STATUS_USER_DIMENU_USER,
    payload: {
      profile: data
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