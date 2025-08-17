// boundary_detector_trainer.js
class BoundaryDetectorTrainer {
  constructor() {
      this.boundaryData = [];
  }

  // 训练边界检测器
  async trainBoundaryDetector() {
      console.log('开始训练边界检测器...');
      
      // 1. 收集边界数据
      const boundaryData = await this.collectBoundaryData();
      
      // 2. 训练分类器
      const classifier = await this.trainClassifier(boundaryData);
      
      // 3. 测试边界检测
      await this.testBoundaryDetection(classifier);
      
      return classifier;
  }

  async collectBoundaryData() {
      // 佛学关键词
      const buddhistKeywords = [
          '情绪', '心理', '烦恼', '痛苦', '焦虑', '抑郁', '愤怒', 
          '悲伤', '恐惧', '孤独', '压力', '失眠', '人际关系',
          '生活意义', '内心平静', '智慧', '慈悲', '修行', '禅定',
          '正念', '慈悲心', '放下', '执着', '因果', '无常', '空性'
      ];
      
      // 非佛学关键词
      const nonBuddhistKeywords = [
          '股票', '投资', '赚钱', '政治', '军事', '科技', '医学',
          '法律', '天气', '体育', '娱乐', '美食', '旅游', '购物',
          '时尚', '美容', '健身', '游戏', '音乐', '电影', '小说'
      ];
      
      // 生成训练数据
      for (const keyword of buddhistKeywords) {
          this.boundaryData.push({
              prompt: `我最近${keyword}很严重，怎么办？`,
              category: 'buddhist',
              confidence: 0.9
          });
      }
      
      for (const keyword of nonBuddhistKeywords) {
          this.boundaryData.push({
              prompt: `如何${keyword}？`,
              category: 'non_buddhist',
              confidence: 0.9
          });
      }
      
      return this.boundaryData;
  }

  async trainClassifier(data) {
      // 这里可以使用简单的规则分类器或机器学习模型
      console.log('训练边界分类器...');
      
      return {
          classify: (prompt) => {
              const buddhistScore = this.calculateBuddhistScore(prompt);
              const nonBuddhistScore = this.calculateNonBuddhistScore(prompt);
              
              if (buddhistScore > nonBuddhistScore) {
                  return { category: 'buddhist', confidence: buddhistScore };
              } else {
                  return { category: 'non_buddhist', confidence: nonBuddhistScore };
              }
          }
      };
  }

  calculateBuddhistScore(prompt) {
      const buddhistKeywords = ['佛', '禅', '修行', '慈悲', '智慧', '放下', '执着', '因果', '无常', '空性', '正念', '禅定'];
      let score = 0;
      
      for (const keyword of buddhistKeywords) {
          if (prompt.includes(keyword)) {
              score += 0.1;
          }
      }
      
      return Math.min(score, 1.0);
  }

  calculateNonBuddhistScore(prompt) {
      const nonBuddhistKeywords = ['股票', '赚钱', '政治', '科技', '医学', '法律', '天气', '体育', '娱乐', '美食', '旅游', '购物'];
      let score = 0;
      
      for (const keyword of nonBuddhistKeywords) {
          if (prompt.includes(keyword)) {
              score += 0.15;
          }
      }
      
      return Math.min(score, 1.0);
  }

  async testBoundaryDetection(classifier) {
      console.log('测试边界检测...');
      
      const testCases = [
          "我最近很焦虑，怎么办？",
          "如何炒股赚钱？",
          "如何培养慈悲心？",
          "推荐几本小说",
          "如何放下执着？",
          "如何做红烧肉？"
      ];
      
      for (const testCase of testCases) {
          const result = classifier.classify(testCase);
          console.log(`问题: "${testCase}" -> 分类: ${result.category} (置信度: ${result.confidence.toFixed(2)})`);
      }
  }
}

module.exports = BoundaryDetectorTrainer;