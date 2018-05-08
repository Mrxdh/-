import wepy from 'wepy'

export const isPoneAvailable = function ($poneInput) {
  console.log(111)
  console.log($poneInput)
  var myreg = /^1[3|4|5|7|8][0-9]{9}$/
  if (!myreg.test(parseInt($poneInput))) {
    return false
  } else {
    return true
  }
}

export const alertToast = function (str, type) {
  wepy.showToast({
    title: str,
    icon: type,
    duration: 500
  })
  setTimeout(function () {
    wepy.hideToast()
  }, 1000)
}
