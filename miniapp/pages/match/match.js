Page({
  data: {
    fitnessTypes: ['全部', '健身训练', '瑜伽教学', '跑步训练', '拳击教学'],
    priceRanges: ['全部', '0-100元', '100-150元', '150-200元', '200元以上'],
    distanceRanges: ['全部', '1km以内', '3km以内', '5km以内', '10km以内'],
    selectedFitnessType: 0,
    selectedPriceRange: 0,
    selectedDistance: 0,
    recentMatches: [
      {
        id: 1,
        name: '张教练',
        avatar: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=张',
        status: 'matched',
        time: '2小时前'
      },
      {
        id: 2,
        name: '李教练',
        avatar: 'https://via.placeholder.com/80x80/FF9800/FFFFFF?text=李',
        status: 'pending',
        time: '1天前'
      }
    ]
  },

  onLoad() {
    console.log('匹配页面加载完成');
  },

  onFitnessTypeChange(e) {
    this.setData({
      selectedFitnessType: e.detail.value
    });
  },

  onPriceRangeChange(e) {
    this.setData({
      selectedPriceRange: e.detail.value
    });
  },

  onDistanceChange(e) {
    this.setData({
      selectedDistance: e.detail.value
    });
  },

  onStartMatch() {
    wx.showLoading({
      title: '正在匹配中...'
    });

    // 模拟匹配过程
    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '匹配成功',
        content: '已为你找到3位合适的健身教练，是否查看匹配结果？',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }
        }
      });
    }, 2000);
  },

  // 分享匹配功能
  onShareAppMessage() {
    return {
      title: '智能健身教练匹配，找到最适合你的教练！',
      path: '/pages/match/match',
      imageUrl: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=智能匹配'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '健身教练智能匹配 - 找到你的专属教练',
      imageUrl: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=智能匹配'
    };
  }
});