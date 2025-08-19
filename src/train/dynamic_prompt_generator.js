// dynamic_prompt_generator.js
import SYSTEM_PROMPTS from './system_prompts';
class DynamicPromptGenerator {
  constructor() {
      this.basePrompts = SYSTEM_PROMPTS;
  }

  // 根据问题类型生成动态提示
  generateDynamicPrompt(question) {
      const questionType = this.classifyQuestion(question);
      
      if (questionType === 'buddhist') {
          return this.generateBuddhistPrompt(question);
      } else {
          return this.generateRejectionPrompt(question);
      }
  }

  // 问题分类
  classifyQuestion(question) {
      const buddhistKeywords = [
          '焦虑', '抑郁', '愤怒', '悲伤', '恐惧', '孤独', '压力', '失眠',
          '烦恼', '痛苦', '人际关系', '生活意义', '内心平静', '智慧',
          '慈悲', '修行', '禅定', '正念', '放下', '执着', '因果', '无常'
      ];
      
      const nonBuddhistKeywords = [
          '股票', '投资', '赚钱', '政治', '军事', '科技', '医学',
          '法律', '天气', '体育', '娱乐', '美食', '旅游', '购物',
          '时尚', '美容', '健身', '游戏', '音乐', '电影', '小说',
          '赌博'
      ];
      
      const buddhistScore = buddhistKeywords.filter(keyword => 
          question.includes(keyword)
      ).length;
      
      const nonBuddhistScore = nonBuddhistKeywords.filter(keyword => 
          question.includes(keyword)
      ).length;
      
      return buddhistScore > nonBuddhistScore ? 'buddhist' : 'non_buddhist';
  }

  // 生成佛学问题提示
  generateBuddhistPrompt(question) {
      return `${this.basePrompts.detailed}

当前问题：${question}

请根据以上角色定义和专长领域，基于佛经内容给出专业、慈悲、实用的回答。
用markdown的格式发给我，只有佛经以及出处请强调展示，用blcokquote包裹，其他内容不需要格式
`;
  }

  // 生成拒绝回答提示
  generateRejectionPrompt(question) {
      return `${this.basePrompts.boundary_control}

当前问题：${question}

这个问题不在佛学讨论范围内。请礼貌拒绝回答，并说明佛学的关注重点。`;
  }
}

export default DynamicPromptGenerator;