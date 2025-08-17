// data_augmenter.js

class DataAugmenter {
  constructor() {
      this.augmentedData = [];
  }

  augmentTrainingData(baseData) {
      console.log('开始数据增强...');
      
      // 同义词替换
      const synonyms = {
          '焦虑': ['担心', '忧虑', '不安', '紧张'],
          '抑郁': ['沮丧', '消沉', '低落', '郁闷'],
          '愤怒': ['生气', '恼火', '气愤', '暴怒'],
          '悲伤': ['难过', '伤心', '痛苦', '哀伤'],
          '恐惧': ['害怕', '恐惧', '惊恐', '畏惧'],
          '孤独': ['寂寞', '孤单', '孤寂', '独处'],
          '压力': ['负担', '重压', '压迫', '紧张'],
          '失眠': ['睡不着', '睡眠不足', '夜不能寐', '辗转反侧']
      };
      
      // 保留原数据
      this.augmentedData = [...baseData];
      
      // 生成变体
      for (const item of baseData) {
          for (const [emotion, alternatives] of Object.entries(synonyms)) {
              if (item.prompt.includes(emotion)) {
                  for (const alt of alternatives) {
                      const newPrompt = item.prompt.replace(new RegExp(emotion, 'g'), alt);
                      const newCompletion = item.completion.replace(new RegExp(emotion, 'g'), alt);
                      
                      this.augmentedData.push({
                          prompt: newPrompt,
                          completion: newCompletion
                      });
                  }
              }
          }
      }
      
      console.log(`数据增强完成，原数据 ${baseData.length} 条，增强后 ${this.augmentedData.length} 条`);
      return this.augmentedData;
  }

  // 问题变体生成
  generateQuestionVariants(baseQuestion) {
      const variants = [
          baseQuestion,
          `请问：${baseQuestion}`,
          `大师，${baseQuestion}`,
          `师父，${baseQuestion}`,
          `请教一下：${baseQuestion}`,
          `我想知道：${baseQuestion}`
      ];
      
      return variants;
  }
}

module.exports = DataAugmenter;