import { request } from '../utils/request'

export async function apiGetContact () {
  return request({
    url: 'api/contact',
    auth: true,
    method: 'get'
  })
}

export async function apiCheckOnline () {
  return request({
    url: 'api/check/online',
    auth: true,
    method: 'get'
  })
}

