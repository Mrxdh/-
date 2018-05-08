import wepy from 'wepy'
import * as util from '@/util/util'

const requist = (data) => {
  return new Promise((resolve, reject) => {
    console.log('token==》' + wepy.globalData.token)
    let isNoError = data.isNoError
    let params = {
      data: {
        ...data.data,
        token: wepy.globalData.token || ''
      }
    }
    // if (!wepy.globalData.token) {
    //   delete params.data.token
    // }
    wepy.request({
      ...data,
      ...params
    }).then((res) => {
      const { data } = res
      const { result } = data
      if (!result || !result.code) {
        return reject(res.data)
      }
      const { code } = result

      if (code === '1') {
        return resolve(res.data)
      }
      if (code == '-1') {
        return reject(util.loginWXLogin())
      }

      if (!isNoError) {
        wepy.showModal({
          title: '提示',
          content: result.msg
        })
      }
      return reject(res.data)
    }, (error) => {
      return reject(error)
    })
  })
}

export const apiGET = (url, data) => {
  return requist({
    method: 'GET',
    url,
    data
  })
}

export const apiPOST = (url, data) => {
  return requist({
    method: 'POST',
    url,
    data
  })
}
