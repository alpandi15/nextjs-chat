import { request } from '../utils/request'

export async function apiGetProfileData (id: number) {
  return request({
    url: `/message/user/${id}`,
    auth: true,
    method: 'get'
  })
}

