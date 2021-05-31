import {
  SET_CONTACT_DATA
} from '../type'
import {
  apiGetContact
} from '../../services/contacts'

const commit = (data: any) => {
  return {
    type: SET_CONTACT_DATA,
    payload: {
      contacts: data
    }
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