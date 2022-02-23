import type { AxiosRequestConfig } from 'axios'
import { apiClient } from '~/utils/api-client'
const getComments = () => {
  return apiClient({
    method: 'get',
    url: '/posts?userId=1',
  })
}

const detailComments = (payload: AxiosRequestConfig = {}) => {
  return apiClient({
    method: 'get',
    url: `/posts/${payload}`,
  })
}

const addComments = (payload: AxiosRequestConfig = {}) => {
  return apiClient({
    method: 'post',
    url: '/posts',
    ...payload,
  })
}

const editComments = (payload: AxiosRequestConfig = {}) => {
  return apiClient({
    method: 'put',
    url: `/posts/${payload.data.id}`,
    ...payload,
  })
}

const deleteComments = (payload: AxiosRequestConfig = {}) => {
  return apiClient({
    method: 'delete',
    url: `/posts/${payload}`,
  })
}

export {
  // getProducts,
  getComments,
  detailComments,
  addComments,
  editComments,
  deleteComments,
}
