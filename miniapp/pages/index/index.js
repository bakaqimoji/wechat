Page({
  data: {
    message: '欢迎使用微信小程序'
  },
  onTap() {
    this.setData({
      message: '你点击了按钮！'
    });
  }
});
