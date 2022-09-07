import fly from '@/utils/request.js'

export const goodsList = (data) => fly.get('/goods/search', data)
