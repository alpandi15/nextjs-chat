import { request } from '../utils/request'

export async function apiGetContact () {
  return request({
    url: 'api/contact',
    auth: true,
    method: 'get'
  })
}

export async function apiAddContact (data: { friend: string }) {
  return request({
    url: 'api/contact',
    auth: true,
    method: 'post',
    data
  })
}

export async function apiCheckOnline () {
  return request({
    url: 'api/check/online',
    auth: true,
    method: 'get'
  })
}

export async function apiGetContactKonfirmasi () {
  return request({
    url: 'api/contact/konfirmasi',
    auth: true,
    method: 'get'
  })
}

export async function apiDestroyKonfirmasi (id: number, data: {status: 'ditolak' | 'diterima'}) {
  return request({
    url: `api/contact/konfirmasi/${id}`,
    auth: true,
    method: 'patch',
    data
  })
}
