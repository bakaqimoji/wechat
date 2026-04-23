Page({
  data: {
    originalCoaches: [
      {
        id: 1,
        name: '张教练',
        specialty: '健身训练',
        location: '北京市朝阳区',
        price: '150',
        rating: '4.8',
        avatar: 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=张'
      },
      {
        id: 2,
        name: '李教练',
        specialty: '瑜伽教学',
        location: '上海市浦东新区',
        price: '120',
        rating: '4.9',
        avatar: 'https://via.placeholder.com/120x120/FF9800/FFFFFF?text=李'
      },
      {
        id: 3,
        name: '王教练',
        specialty: '跑步训练',
        location: '广州市天河区',
        price: '100',
        rating: '4.7',
        avatar: 'https://via.placeholder.com/120x120/2196F3/FFFFFF?text=王'
      },
      {
        id: 4,
        name: '赵教练',
        specialty: '拳击教学',
        location: '深圳市南山区',
        price: '180',
        rating: '4.6',
        avatar: 'https://via.placeholder.com/120x120/9C27B0/FFFFFF?text=赵'
      },
      {
        id: 5,
        name: '刘教练',
        specialty: '健身训练',
        location: '广州市越秀区',
        price: '200',
        rating: '5.0',
        avatar: 'https://via.placeholder.com/120x120/9C27B0/FFFFFF?text=刘'
      }
    ],
    coaches: [],
    activeTag: 'all',
    searchKeyword: ''
  },

  onLoad() {
    console.log('首页加载完成');
    // 初始化显示所有教练
    this.setData({
      coaches: this.data.originalCoaches
    });
  },

  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  onSearch() {
    const keyword = this.data.searchKeyword.trim();
    if (keyword) {
      // 搜索逻辑：根据教练姓名、专业或地点进行搜索
      const filteredCoaches = this.data.originalCoaches.filter(coach =>
        coach.name.includes(keyword) ||
        coach.specialty.includes(keyword) ||
        coach.location.includes(keyword)
      );

      this.setData({
        coaches: filteredCoaches,
        activeTag: 'all' // 搜索时重置标签筛选
      });

      wx.showToast({
        title: `找到 ${filteredCoaches.length} 位教练`,
        icon: 'none'
      });
    } else {
      // 如果搜索关键词为空，显示所有教练
      this.setData({
        coaches: this.data.originalCoaches,
        activeTag: 'all'
      });
    }
  },

  onClearSearch() {
    this.setData({
      searchKeyword: '',
      coaches: this.data.originalCoaches,
      activeTag: 'all'
    });
  },

  onTagTap(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      activeTag: tag,
      searchKeyword: '' // 切换标签时清空搜索关键词
    });

    // 根据标签筛选教练
    let filteredCoaches = this.data.originalCoaches;
    if (tag !== 'all') {
      const specialtyMap = {
        'yoga': '瑜伽教学',
        'fitness': '健身训练',
        'running': '跑步训练',
        'boxing': '拳击教学'
      };
      filteredCoaches = this.data.originalCoaches.filter(coach =>
        coach.specialty === specialtyMap[tag]
      );
    }

    this.setData({
      coaches: filteredCoaches
    });
  },

  onCoachTap(e) {
    const coachId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${coachId}`
    });
  },

  // 分享给朋友
  onShareAppMessage() {
    return {
      title: '发现优质健身教练，一起运动更快乐！',
      path: '/pages/index/index',
      imageUrl: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=健身教练找搭档'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '健身教练找搭档 - 找到你的专属教练',
      imageUrl: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=健身教练找搭档'
    };
  }
});
