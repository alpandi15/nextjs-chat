import { request } from '../utils/request'

export async function apiGetContact () {
  return request({
    url: 'api/contact',
    auth: true,
    method: 'get'
  })
}

