import {
  SET_USER_DATA,
  ADD_USER_DATA,
  UPDATE_USER_DATA
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
    case UPDATE_USER_DATA:
      const mappingUpdate = state?.users?.map((v: any) => {
        if (v?.id === action?.payload?.friend?.id) {
          return {
            ...v,
            berteman: {
              ...v?.bertemen,
              id: action?.payload?.id,
              me: action?.payload?.me?.id,
              friend: action?.payload?.friend?.id,
              status: action?.payload?.status
            }
          }
        }
        return v
      })
      return {
        ...state,
        users: mappingUpdate
      }
    default:
      return state
  }
}

export default userStore