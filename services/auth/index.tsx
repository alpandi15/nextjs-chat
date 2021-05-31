import Router from 'next/router'
import { destroyCookie } from 'nookies'
import { request } from '../utils/request'
import { removeCookies } from '../utils/storage'
import { TOKEN } from '../../constants'

export async function apiRegister (data: any) {
  return request({
    url: '/register',
    auth: false,
    data,
    method: 'post'
  })
}

export async function apiLogin (data: any) {
  return request({
    url: '/login',
    auth: false,
    data,
    method: 'post'
  })
}

export async function apiGetProfile (ctx: any = null) {
  return request({
    url: '/user',
    auth: true,
    method: 'get',
    context: ctx
  })
}

export async function logout(ctx: any = null) {
  if (ctx) {
    destroyCookie(ctx, TOKEN)
  }
  await removeCookies(TOKEN)
  Router.replace('/auth/login')
}