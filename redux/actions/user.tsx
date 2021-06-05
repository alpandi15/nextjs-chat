import {
  SET_USER_DATA
  // ADD_USER_DATA
} from '../type'
import {
  apiGetAllUser
} from '../../services/account'

export const getUserData = () => async (dispatch: any) => {
  try {
    const res: any = await apiGetAllUser()
    if (res) {
      dispatch({type: SET_USER_DATA, payload: res?.data})
    }
  } catch (err) {
    console.log(err)
  }
}
