import fly from '@/utils/request.js'

export const getbanner = () => fly.get('/home/swiperdata')

export const getnavs = () => fly.get('/home/catitems')

export const getfloors = () => fly.get('/home/floordata')
