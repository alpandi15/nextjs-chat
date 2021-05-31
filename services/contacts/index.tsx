import { request } from '../utils/request'

export async function apiGetContact () {
  return request({
    url: '/contact',
    auth: false,
    method: 'get'
  })
}

