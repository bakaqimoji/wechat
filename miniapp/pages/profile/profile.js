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
      itemList: ['拍照', '从相册选择', '选择教练头像'],
      success: (res) => {
        if (res.tapIndex === 2) {
          // 选择教练头像
          this.showCoachAvatarSelector();
        } else {
          // 拍照或从相册选择
          this.chooseAndUploadAvatar(res.tapIndex);
        }
      }
    });
  },

  chooseAndUploadAvatar(sourceType) {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: sourceType === 0 ? ['camera'] : ['album'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.uploadAvatar(tempFilePath);
      }
    });
  },

  uploadAvatar(tempFilePath) {
    wx.showLoading({
      title: '上传中...'
    });

    // 模拟上传过程
    setTimeout(() => {
      wx.hideLoading();
      // 在实际项目中，这里应该调用wx.uploadFile上传到服务器
      // 这里模拟上传成功，直接使用临时路径
      this.setData({
        'userInfo.avatar': tempFilePath
      });

      // 保存到本地存储
      wx.setStorageSync('userAvatar', tempFilePath);

      wx.showToast({
        title: '头像上传成功',
        icon: 'success'
      });
    }, 2000);
  },

  showCoachAvatarSelector() {
    const coaches = [
      { id: 1, name: '张教练', avatar: 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=张' },
      { id: 2, name: '李教练', avatar: 'https://via.placeholder.com/120x120/FF9800/FFFFFF?text=李' },
      { id: 3, name: '王教练', avatar: 'https://via.placeholder.com/120x120/2196F3/FFFFFF?text=王' },
      { id: 4, name: '赵教练', avatar: 'https://via.placeholder.com/120x120/9C27B0/FFFFFF?text=赵' },
      { id: 5, name: '刘教练', avatar: 'https://via.placeholder.com/120x120/9C27B0/FFFFFF?text=刘' }
    ];

    const coachNames = coaches.map(coach => coach.name);

    wx.showActionSheet({
      itemList: coachNames,
      success: (res) => {
        const selectedCoach = coaches[res.tapIndex];
        wx.showModal({
          title: '选择操作',
          content: `为${selectedCoach.name}上传新头像？`,
          confirmText: '上传头像',
          cancelText: '使用默认',
          success: (modalRes) => {
            if (modalRes.confirm) {
              this.uploadCoachAvatar(selectedCoach.id);
            } else {
              // 使用默认头像
              this.setCoachAvatar(selectedCoach.id, selectedCoach.avatar);
            }
          }
        });
      }
    });
  },

  uploadCoachAvatar(coachId) {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        wx.showLoading({
          title: '上传教练头像...'
        });

        // 模拟上传过程
        setTimeout(() => {
          wx.hideLoading();

          // 保存教练头像到本地存储
          const coachAvatars = wx.getStorageSync('coachAvatars') || {};
          coachAvatars[coachId] = tempFilePath;
          wx.setStorageSync('coachAvatars', coachAvatars);

          wx.showToast({
            title: '教练头像上传成功',
            icon: 'success'
          });
        }, 2000);
      }
    });
  },

  setCoachAvatar(coachId, avatarUrl) {
    const coachAvatars = wx.getStorageSync('coachAvatars') || {};
    coachAvatars[coachId] = avatarUrl;
    wx.setStorageSync('coachAvatars', coachAvatars);

    wx.showToast({
      title: '教练头像设置成功',
      icon: 'success'
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