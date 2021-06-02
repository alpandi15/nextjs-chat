import { createContext } from 'react'
import Pusher from 'pusher-js'

type ImageUrlType = {
  url?: string,
  raw?: string
}

export interface UserDataContext {
  addres?: string,
  banned?: string,
  bannedUntil?: null,
  createdAt?: string,
  createdBy?: string | null,
  deletedAt?: string | null,
  deletedBy?: string | null,
  email?: string,
  emailVerified?: boolean,
  gender?: string | number,
  id?: number,
  image?: ImageUrlType,
  lastLogin?: string,
  name?: string,
  phone?: string,
  phoneVerified?: boolean,
  provider?: string | null,
  provider_id?: string | null,
  roleId?: number,
  status?: string,
  updatedAt?: string,
  updatedBy?: number,
  username?: string,
}

export type AppContextType = {
  user: UserDataContext,
  logout?: () => void,
  pusher?: Pusher | undefined,
  notification: any | null
}

const initialData = {
  user: {},
  logout: () => {},
  notification: {}
}
const AppContext = createContext<AppContextType>(initialData)

export default AppContext