export default {
  debounce(cb, ms, flag) {
    var t = null
    return function () {
      var _this = this
      var args = arguments
      var C = function () {
        t = null
        flag || cb.apply(_this, args)
      }
      var A = flag && !t
      if (!A && flag) {
        wx.showToast({title: '防抖,你懂的', icon: 'none'})
      }
      clearTimeout(t)
      t = setTimeout(C, ms)
      A && cb.apply(_this, args)
    }
  },
  random(n, m) {
    return parseInt(Math.random() * (m - n) + n)
  }
}
