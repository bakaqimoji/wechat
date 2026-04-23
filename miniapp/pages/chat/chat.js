Page({
  data: {
    coach: {},
    userAvatar: 'https://via.placeholder.com/60x60/2196F3/FFFFFF?text=我',
    inputValue: ''
  },

  onLoad(options) {
    console.log('聊天页面加载完成');
    const coachId = options.id;
    if (coachId) {
      // 根据教练ID获取教练信息
      const coaches = [
        {
          id: 1,
          name: '张教练',
          avatar: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=张'
        },
        {
          id: 2,
          name: '李教练',
          avatar: 'https://via.placeholder.com/80x80/FF9800/FFFFFF?text=李'
        },
        {
          id: 3,
          name: '王教练',
          avatar: 'https://via.placeholder.com/80x80/2196F3/FFFFFF?text=王'
        },
        {
          id: 4,
          name: '赵教练',
          avatar: 'https://via.placeholder.com/80x80/9C27B0/FFFFFF?text=赵'
        },
        {
          id: 5,
          name: '刘教练',
          avatar: 'https://via.placeholder.com/80x80/9C27B0/FFFFFF?text=刘'
        }
      ];

      const coach = coaches.find(c => c.id == coachId);
      if (coach) {
        this.setData({
          coach: coach
        });
      }
    }
  },

  onInputChange(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  onSendMessage() {
    const message = this.data.inputValue.trim();
    if (!message) {
      wx.showToast({
        title: '请输入消息内容',
        icon: 'none'
      });
      return;
    }

    // 这里可以添加发送消息的逻辑
    wx.showToast({
      title: '消息已发送',
      icon: 'success'
    });

    this.setData({
      inputValue: ''
    });
  },

  // 分享聊天记录
  onShareAppMessage() {
    const coach = this.data.coach;
    return {
      title: `正在与${coach.name}教练交流健身事宜`,
      path: `/pages/chat/chat?id=${coach.id}`,
      imageUrl: coach.avatar
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    const coach = this.data.coach;
    return {
      title: `与${coach.name}教练的健身交流`,
      imageUrl: coach.avatar
    };
  }
});