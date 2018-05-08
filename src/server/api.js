import { apiGET, apiPOST } from './server'
// export const BASE = 'https://xuyi-crayfish.com'
export const BASE = 'https://kfx-tech.com'
// export const BASE = 'http://localhost:8076'
export const BASE_URL = `${BASE}/lobster`

export const getIndex = (params) => apiGET(`${BASE_URL}/product/index`, params)

export const addressDefault = (params) => apiGET(`${BASE_URL}/address/default`, params)

export const refundOrder= (params) => apiGET(`${BASE_URL}/refund/refundOrder`, params)

export const refundList= () => apiGET(`${BASE_URL}/refund/refundProList`)

export const subJudge = (params) => apiGET(`${BASE_URL}/comment/add`, params)

export const getAllOrder = (params) => apiGET(`${BASE_URL}/user/orderList`, params)

export const getOrderDetail = (params) => apiGET(`${BASE_URL}/user/orderDetail`, params)

export const getAddressList = () => apiGET(`${BASE_URL}/address/list`)

export const getToken = () => apiGET(`${BASE_URL}/qiniu/getToken`)

export const removeAddress = (params) => apiGET(`${BASE_URL}/address/del`, params)

export const addMineAddress = (params) => apiGET(`${BASE_URL}/address/add`, params)

export const changeMineAddress = (params) => apiGET(`${BASE_URL}/address/update`, params)

export const getMine = () => apiGET(`${BASE_URL}/user/mine`)

export const getProductDetail = (params) => apiGET(`${BASE_URL}/product/detail`, params)

export const getProComment = (params) => apiGET(`${BASE_URL}/comment/proList`, params)

export const getShopInfo = (params) => apiGET(`${BASE_URL}/shop/shop_info`, params)

export const getShopList = (params) => apiGET(`${BASE_URL}/shop/shop_list`, params)

export const getWxSession = (params) => apiGET(`${BASE_URL}/user/getWxSession`, params)

export const postRegisterWx = (params) => apiGET(`${BASE_URL}/user/resign`, params)

export const postSms = (params) => apiGET(`${BASE_URL}/user/getSms`, params)

export const createOrder = (params) => apiGET(`${BASE_URL}/order/getOrder`, params)

export const payOrder = (params) => apiGET(`${BASE_URL}/order/pay`, params)

export const updateOrderAddress = (params) => apiGET(`${BASE_URL}/order/updateAddr`, params)

export const orderRefreshKey = (params) => apiGET(`${BASE_URL}/order/refreshKey`, params)
