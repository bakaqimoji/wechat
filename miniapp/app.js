App({
  onLaunch() {
    console.log('App launched');
  },

  // 全局分享配置
  onShareAppMessage() {
    return {
      title: '健身教练找搭档 - 找到你的专属教练',
      path: '/pages/index/index',
      imageUrl: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=健身教练找搭档'
    };
  },

  // 分享到朋友圈（如果小程序支持）
  onShareTimeline() {
    return {
      title: '健身教练找搭档 - 找到你的专属教练',
      imageUrl: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=健身教练找搭档'
    };
  }
});
