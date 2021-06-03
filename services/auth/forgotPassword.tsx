import { request } from '../utils/request'

type Forgot = {
  account: string | string[] | undefined,
  roleId: number
}

type ResetType = {
  account: string | string[] | undefined,
  password: string
}

export async function apiForgotPassword (type: string = 'email', data: Forgot) {
  return request({
    url: `api/auth/forgot-password/${type}`,
    auth: false,
    data,
    method: 'post'
  })
}

export const apiResetPassword = async (type: string = 'email', data: ResetType) => {
  return request({
    url: `api/auth/reset-password/${type}`,
    auth: false,
    data,
    method: 'post'
  })
}
