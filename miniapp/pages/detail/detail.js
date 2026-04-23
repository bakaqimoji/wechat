Page({
  data: {
    coach: {}
  },

  onLoad(options) {
    const coachId = options.id;
    // 模拟获取教练详情数据
    const coaches = [
      {
        id: 1,
        name: '张教练',
        specialty: '健身训练',
        location: '北京市朝阳区',
        price: '150',
        rating: '4.8',
        avatar: 'https://via.placeholder.com/160x160/4CAF50/FFFFFF?text=张',
        skills: ['力量训练', '减脂塑形', '康复训练', '营养指导']
      },
      {
        id: 2,
        name: '李教练',
        specialty: '瑜伽教学',
        location: '上海市浦东新区',
        price: '120',
        rating: '4.9',
        avatar: 'https://via.placeholder.com/160x160/FF9800/FFFFFF?text=李',
        skills: ['哈达瑜伽', '流瑜伽', '冥想', '呼吸法']
      },
      {
        id: 3,
        name: '王教练',
        specialty: '跑步训练',
        location: '广州市天河区',
        price: '100',
        rating: '4.7',
        avatar: 'https://via.placeholder.com/160x160/2196F3/FFFFFF?text=王',
        skills: ['马拉松训练', ' interval训练', '跑步姿势纠正', '伤病预防']
      },
      {
        id: 4,
        name: '赵教练',
        specialty: '拳击教学',
        location: '深圳市南山区',
        price: '180',
        rating: '4.6',
        avatar: 'https://via.placeholder.com/160x160/9C27B0/FFFFFF?text=赵',
        skills: ['拳击基础', '散打', '防身术', '体能训练']
      },
      {
        id: 5,
        name: '刘教练',
        specialty: '综合训练',
        location: '广州市越秀区',
        price: '200',
        rating: '5.0',
        avatar: 'https://via.placeholder.com/160x160/9C27B0/FFFFFF?text=刘',
        skills: ['力量训练', '有氧运动', '体能提升', '营养指导', '康复训练']
      }
    ];

    const coach = coaches.find(c => c.id == coachId);
    if (coach) {
      this.setData({
        coach: coach
      });
    }
  },

  onContact() {
    wx.navigateTo({
      url: `/pages/chat/chat?id=${this.data.coach.id}`
    });
  },

  onShare() {
    wx.showActionSheet({
      itemList: ['分享给朋友', '分享到朋友圈'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 分享给朋友
          wx.showShareMenu({
            withShareTicket: true
          });
        } else if (res.tapIndex === 1) {
          // 分享到朋友圈
          wx.showToast({
            title: '分享到朋友圈功能开发中',
            icon: 'none'
          });
        }
      }
    });
  },

  onEditCoachAvatar() {
    const coach = this.data.coach;
    wx.navigateTo({
      url: `/pages/avatar-select/avatar-select?id=${coach.id}&name=${coach.name}`
    });
  },

  updateCoachAvatar(newAvatarUrl) {
    const coach = this.data.coach;
    coach.avatar = newAvatarUrl;

    this.setData({
      coach: coach
    });

    // 在实际项目中，这里应该调用API更新数据库
    wx.showToast({
      title: '头像更新成功',
      icon: 'success'
    });
  },

  onMatch() {
    wx.showModal({
      title: '申请匹配',
      content: '确定要申请与这位教练匹配吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '申请已发送',
            icon: 'success'
          });
          // 这里可以添加匹配申请逻辑
        }
      }
    });
  },

  // 分享教练信息
  onShareAppMessage() {
    const coach = this.data.coach;
    return {
      title: `推荐${coach.name} - ${coach.specialty}教练`,
      path: `/pages/detail/detail?id=${coach.id}`,
      imageUrl: coach.avatar
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    const coach = this.data.coach;
    return {
      title: `发现优质教练：${coach.name} - ${coach.specialty}`,
      imageUrl: coach.avatar
    };
  }
});