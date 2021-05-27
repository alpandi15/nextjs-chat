import { request } from '../utils/request'

type Forgot = {
  account: string,
  roleId: number
}
export async function apiForgotPassword (type: string = 'email', data: Forgot) {
  return request({
    url: `/auth/forgot-password/${type}`,
    auth: false,
    data,
    method: 'post'
  })
}

export const apiResetPassword = async (type: string = 'email', data: any) => {
  return request({
    url: `/auth/reset-password/${type}`,
    auth: false,
    data,
    method: 'post'
  })
}