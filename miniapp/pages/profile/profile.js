Page({
  data: {
    userInfo: {
      name: '健身爱好者',
      avatar: 'https://via.placeholder.com/120x120/2196F3/FFFFFF?text=我',
      stats: {
        matches: 12,
        hours: 48,
        coaches: 5
      }
    }
  },

  onLoad() {
    console.log('个人资料页面加载完成');
  },

  onEditAvatar() {
    wx.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      success: (res) => {
        console.log('选择头像方式', res.tapIndex);
        wx.showToast({
          title: '头像修改功能开发中',
          icon: 'none'
        });
      }
    });
  },

  onEditProfile() {
    wx.showToast({
      title: '编辑资料功能开发中',
      icon: 'none'
    });
  },

  onFitnessGoals() {
    wx.showToast({
      title: '健身目标功能开发中',
      icon: 'none'
    });
  },

  onTrainingHistory() {
    wx.showToast({
      title: '训练记录功能开发中',
      icon: 'none'
    });
  },

  onSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  onLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
          // 这里可以添加退出登录逻辑
        }
      }
    });
  },

  // 分享个人成就
  onShareAppMessage() {
    const user = this.data.userInfo;
    return {
      title: `我在健身教练找搭档中获得了${user.stats.matches}次匹配！`,
      path: '/pages/profile/profile',
      imageUrl: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=健身成就'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    const user = this.data.userInfo;
    return {
      title: `健身达人分享 - 已完成${user.stats.hours}小时训练`,
      imageUrl: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=健身成就'
    };
  }
});