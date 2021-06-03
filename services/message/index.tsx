import { request } from '../utils/request'

export async function apiGetProfileData (id: number) {
  return request({
    url: `api/message/user/${id}`,
    auth: true,
    method: 'get'
  })
}

type DataPrams = {
  skip: number
}
export async function apiGetMessege (id: number, data: DataPrams | undefined | null = null) {
  return request({
    url: `api/message/${id}`,
    auth: true,
    method: 'get',
    data
  })
}

export async function readMessageData (id: number) {
  return request({
    url: `api/message/read-message/${id}`,
    auth: true,
    method: 'get'
  })
}

export async function apiAddMessageData (id: number, data: any) {
  return request({
    url: `api/message/${id}`,
    auth: true,
    method: 'post',
    data
  })
}
