import {
  SET_USER_DATA,
  ADD_USER_DATA
} from '../type'

interface ActionProps {
  type?: string,
  payload: any
}

type InitialProps = {
  users: string[]
}

const initialState: InitialProps = {
  users: []
}

const userStore = (state: InitialProps = initialState, action: ActionProps) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        users: action?.payload
      }
    case ADD_USER_DATA:
      return {
        users: [
          ...state?.users,
          action?.payload
        ]
      }
    default:
      return state
  }
}

export default userStore