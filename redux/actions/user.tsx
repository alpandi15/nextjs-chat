import {
  SET_USER_DATA,
  UPDATE_USER_DATA
  // ADD_USER_DATA
} from '../type'
import {
  apiGetAllUserFriend
} from '../../services/account'

export const getUserData = () => async (dispatch: any) => {
  try {
    const res: any = await apiGetAllUserFriend()
    if (res) {
      dispatch({type: SET_USER_DATA, payload: res?.data})
    }
  } catch (err) {
    console.log(err)
  }
}

export const updateUserData = (data: any) => async (dispatch: any) => {
  try {
    console.log('UPDATING USER ', data)
    dispatch({
      type: UPDATE_USER_DATA,
      payload: data
    })
  } catch (error) {
    console.log(error)
  }
}
