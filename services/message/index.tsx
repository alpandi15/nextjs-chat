import { request } from '../utils/request'

export async function apiGetProfileData (id: number) {
  return request({
    url: `/message/user/${id}`,
    auth: true,
    method: 'get'
  })
}

export async function apiGetMessege (id: number) {
  return request({
    url: `/message/${id}`,
    auth: true,
    method: 'get'
  })
}

export async function readMessageData (id: number) {
  return request({
    url: `/message/read-message/${id}`,
    auth: true,
    method: 'get'
  })
}

export async function apiAddMessageData (id: number, data: any) {
  return request({
    url: `/message/${id}`,
    auth: true,
    method: 'post',
    data
  })
}
