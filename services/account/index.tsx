import { request } from '../utils/request'

const apiEditProfile = async (data: any) => {
  return request({
    url: '/api/profile-update',
    auth: true,
    data,
    method: 'put'
  })
}

const apiChangePassword = async (data: any) => {
  return request({
    url: '/api/auth/change-password',
    auth: true,
    data,
    method: 'put'
  })
}

const apiChangeEmail = async (data: any) => {
  return request({
    url: '/api/profile-update/email',
    auth: true,
    data,
    method: 'put'
  })
}

const apiChangePhone = async (data: any) => {
  return request({
    url: '/api/profile-update/phone',
    auth: true,
    data,
    method: 'put'
  })
}

const apiGetAllUser = async () => {
  return request({
    url: 'api/all-user',
    auth: false,
    method: 'get'
  })
}

const apiGetAllUserFriend = async () => {
  return request({
    url: 'api/get-all-user',
    auth: true,
    method: 'get'
  })
}
export {
  apiEditProfile,
  apiChangePassword,
  apiChangeEmail,
  apiChangePhone,
  apiGetAllUser,
  apiGetAllUserFriend
}
