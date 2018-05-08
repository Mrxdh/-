import wepy from 'wepy'
import _ from 'lodash'
import md5 from '@/util/md5'

export const setStorageSync = (key, data) => {
  wepy.setStorageSync(key, data)
}

export const setStorage = (key, data) => {
  wepy.setStorage({
    key,
    data
  })
}

export const getStorageSync = (key) => {
  try {
    var value = wepy.getStorageSync(key)
    if (value) {
      return value
    }
  } catch (e) {
  }
}

export const pushShoppingOfProduct = (product = {}) => {
  const { productCount, sid, shop_name } = product
  const proId = product.pro_id
  const productData = getStorageSync('shoppingProductData')
  let newShops = _.cloneDeep(productData) || {}
  let shop = newShops[sid]
  const newProduct = { ...product, checked: false, productCount: product.productCount || 1 }
  if (!shop) {
    newShops = {
      ...newShops,
      [sid]: {
        checked: false,
        sid,
        shop_name,
        products: [newProduct]
      }
    }
  } else {
    const products = shop.products
    const index = products.findIndex(p => p.pro_id === proId)
    if (index === -1) {
      products.push(newProduct)
    } else {
      const count = products[index].productCount
      products[index].productCount = (productCount || 1) + count
    }
  }

  setStorageSync('shoppingProductData', newShops)
}

export const getShoppingProductData = () => {
  return getStorageSync('shoppingProductData')
}

export const getShoppingProductArrayData = () => {
  return _.values(getStorageSync('shoppingProductData'))
}

export const removeProductOfShoppingData = (product) => {
  const { sid } = product
  const proId = product.pro_id
  const shoppingData = getStorageSync('shoppingProductData')
  const newShopingData = _.cloneDeep(shoppingData)
  const products = newShopingData[sid].products
  const index = products.findIndex(p => p.pro_id === proId)
  if (index === -1) {
    return _.values(newShopingData)
  }
  products.splice(index, 1)
  if (products.length === 0) {
    delete newShopingData[sid]
  }
  setStorageSync('shoppingProductData', newShopingData)
  return _.values(newShopingData)
}

export const subProductOfShoppingData = (product) => {
  const { sid } = product
  const proId = product.pro_id

  const shoppingData = getStorageSync('shoppingProductData')
  const newShopingData = _.cloneDeep(shoppingData)
  const products = newShopingData[sid].products
  const index = products.findIndex(p => p.pro_id === proId)
  if (index === -1) {
    return _.values(newShopingData)
  }

  if (products[index].productCount <= 0) {
    return _.values(newShopingData)
  }
  products[index].productCount--

  if (products[index].productCount === 0) {
    products.splice(index, 1)
  }

  if (!products.length) {
    delete newShopingData[sid]
  }

  setStorageSync('shoppingProductData', newShopingData)
  return _.values(newShopingData)
}

export const addProductOfShoppingData = (product) => {
  const { sid } = product
  const proId = product.pro_id

  const shoppingData = getStorageSync('shoppingProductData')
  const newShopingData = _.cloneDeep(shoppingData)
  const products = newShopingData[sid].products
  const index = products.findIndex(p => p.pro_id === proId)
  if (index === -1) {
    return _.values(newShopingData)
  }

  if (products[index].productCount >= products[index].num) {
    return _.values(newShopingData)
  }

  products[index].productCount++

  setStorageSync('shoppingProductData', newShopingData)
  return _.values(newShopingData)
}

export const updateAllChecked = (checked) => {
  const shoppingData = getStorageSync('shoppingProductData')
  const newShopingData = _.cloneDeep(shoppingData)
  const keys = Object.keys(newShopingData)
  keys.forEach(k => {
    const shop = newShopingData[k]
    shop.checked = checked
    shop.products = shop.products.map(json => {
      json.checked = checked
      return json
    })
  })
  setStorageSync('shoppingProductData', newShopingData)
  return _.values(newShopingData)
}

export const updateShopChecked = (shop) => {
  const { sid } = shop
  const shoppingData = getStorageSync('shoppingProductData')
  const newShopingData = _.cloneDeep(shoppingData)
  let newShop = newShopingData[sid]
  if (!newShop) {
    return _.values(newShopingData)
  }

  const checked = !shop.checked
  newShop.checked = checked
  newShop.products = newShop.products.map(p => {
    p.checked = checked
    return p
  })
  setStorageSync('shoppingProductData', newShopingData)
  return _.values(newShopingData)
}

export const updateProductChecked = (product) => {
  const { sid } = product
  const proId = product.pro_id
  const shoppingData = getStorageSync('shoppingProductData')
  const newShopingData = _.cloneDeep(shoppingData)
  if (!sid) {
    return _.values(newShopingData)
  }
  let newShop = newShopingData[sid]
  const index = newShop.products.findIndex(p => p.pro_id === proId)
  if (index === -1) {
    return _.values(newShopingData)
  }
  const products = newShop.products
  products[index].checked = !product.checked

  if (!products.find(p => !p.checked)) {
    newShop.checked = true
  }

  if (!products.find(p => p.checked)) {
    newShop.checked = false
  }

  if (products.find(p => !p.checked)) {
    newShop.checked = false
  }

  setStorageSync('shoppingProductData', newShopingData)
  return _.values(newShopingData)
}

export const removeCheckedProductChecked = (pts) => {
  const shoppingData = getStorageSync('shoppingProductData')
  const newShopingData = _.cloneDeep(shoppingData)
  if (!_.values(newShopingData).length) {
    return
  }
  pts.forEach(product => {
    const { sid } = product
    const proId = product.pro_id
    const products = newShopingData[sid].products
    const index = products.findIndex(p => p.pro_id === proId)
    if (index === -1) {
      return
    }
    products.splice(index, 1)

    if (products.length === 0) {
      delete newShopingData[sid]
    }
  })

  setStorageSync('shoppingProductData', newShopingData)
  return _.values(newShopingData)
}

export const loginWXLogin = async () => {
  const api = require('@/server/api')

  const wxLogin = await wepy.login()
  const oldToken = getStorageSync('token')
  wepy.globalData.token = oldToken
  const { code } = wxLogin

  api.getWxSession({
    code
  }).then(res => {
    const token = res.body.token
    wepy.globalData.token = token
    setStorage('token', token)
  }, error => {
    const { body, result } = error
    if (result.code === '2') {
      wepy.globalData.resign_code = body.resign_code
      wepy.navigateTo({
        url: '/pages/login'
      })
      console.log('error ', result.msg)
    }
  })
}

function paySign(appid, nonceStr, packageStr, timestamp, key) {
  var sign = ''
  //签名顺序按照ASCII字典序排序
  var signA = "appId=" + appid + "&nonceStr=" + nonceStr + "&package=" + packageStr + "&signType=MD5&timeStamp=" + timestamp
  var signB = signA + "&key=" + key
  // console.log(signB)
  sign = md5(signB).toUpperCase()
  return sign
}

function getTimestamp() {
  var timestamp = Date.parse(new Date()) / 1000
  return timestamp
}

function getNonceStr(len) {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = $chars.length
  var str = ''
  for (var i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}

export const toPay = (res) => {
  const data = res
  // var timestamp = getTimestamp()
  // var nonceStr = getNonceStr(32)
  // var paysign = paySign(data.appId, nonceStr, data.package, timestamp, 'q2e2VKxdMLFLEFvaeab3wK2rLiXHQGBL')

  return new Promise((resolve, reject) => {
    wepy.requestPayment({
      appId: data.appId,
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      paySign: data.paySign,
      package: data.package,
      // timeStamp: timestamp.toString(),
      // nonceStr: nonceStr,
      // paySign: paysign,
      signType: data.signType
    }).then(json => {
      console.log('12312345345435435')
      wepy.showToast({
        title: '支付成功！',
        icon: 'success',
        duration: 2000
      })

      setTimeout(() => {
        resolve(res)
      }, 1000)
    }, (error) => {
      wepy.showToast({
        title: '支付失败！',
        icon: 'success',
        duration: 2000
      })
      reject(error)
    })
  })
}

export const nextPageParams = (pageInfo) => {
  let pageObj = {
    currentPage: 1,
    pageSize: 10
  }
  if (!pageInfo) {
    return pageObj
  }
  const pageNo = pageInfo.pageNo
  const total = pageInfo.tatol

  if (pageNo === total) {
    return {
      ...pageObj,
      status: 'full'
    }
  }

  if (pageNo < total) {
    pageObj.currentPage = pageNo + 1
  }

  return pageObj
}
