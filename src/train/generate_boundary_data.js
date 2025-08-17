// generate_boundary_data.js
const axios = require('axios');

class BoundaryDataGenerator {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.boundaryData = [];
    }

    async generateBoundaryTrainingData() {
        console.log('开始生成边界控制训练数据...');
        
        // 佛学范畴内的问题模板
        const buddhistQuestions = [
            "我最近感到{emotion}，{situation}，不知道该怎么办",
            "我总是{behavior}，这让我很困扰",
            "我和{person}的关系出现了问题，{problem}",
            "我觉得{feeling}，找不到生活的意义",
            "如何{action}？"
        ];
        
        // 超出佛学范畴的问题模板
        const nonBuddhistQuestions = [
            "如何{skill}？",
            "推荐{product}",
            "如何{activity}？",
            "最新的{field}有哪些？",
            "如何{health_goal}？"
        ];
        
        const emotions = ['焦虑', '抑郁', '愤怒', '悲伤', '恐惧', '孤独', '压力', '失眠'];
        const situations = ['工作压力很大', '学习很困难', '人际关系复杂', '对未来迷茫'];
        const behaviors = ['控制不住脾气', '拖延症严重', '容易紧张', '缺乏自信'];
        const persons = ['朋友', '家人', '同事', '伴侣'];
        const problems = ['经常吵架', '沟通困难', '信任缺失', '价值观冲突'];
        const feelings = ['空虚', '迷茫', '无助', '孤独'];
        const actions = ['培养慈悲心', '修习禅定', '放下执着', '培养正念'];
        
        const skills = ['炒股赚钱', '提高英语', '学习编程', '弹钢琴', '画画'];
        const products = ['小说', '电影', '音乐', '游戏', '化妆品'];
        const activities = ['做红烧肉', '打篮球', '游泳', '旅游', '购物'];
        const fields = ['科技产品', '时尚潮流', '美食推荐', '旅游景点', '娱乐新闻'];
        const healthGoals = ['减肥', '增肌', '治疗感冒', '美容护肤', '健身'];
        
        // 生成佛学范畴内的问题
        for (const template of buddhistQuestions) {
            for (const emotion of emotions) {
                for (const situation of situations) {
                    const prompt = template
                        .replace('{emotion}', emotion)
                        .replace('{situation}', situation)
                        .replace('{behavior}', behaviors[Math.floor(Math.random() * behaviors.length)])
                        .replace('{person}', persons[Math.floor(Math.random() * persons.length)])
                        .replace('{problem}', problems[Math.floor(Math.random() * problems.length)])
                        .replace('{feeling}', feelings[Math.floor(Math.random() * feelings.length)])
                        .replace('{action}', actions[Math.floor(Math.random() * actions.length)]);
                    
                    try {
                        const completion = await this.generateBuddhistResponse(prompt);
                        
                        this.boundaryData.push({
                            prompt: prompt,
                            completion: completion,
                            category: 'buddhist'
                        });
                        
                    } catch (error) {
                        console.error('生成佛学回答失败:', error);
                    }
                }
            }
        }
        
        // 生成超出佛学范畴的问题
        for (const template of nonBuddhistQuestions) {
            for (const skill of skills) {
                for (const product of products) {
                    const prompt = template
                        .replace('{skill}', skill)
                        .replace('{product}', product)
                        .replace('{activity}', activities[Math.floor(Math.random() * activities.length)])
                        .replace('{field}', fields[Math.floor(Math.random() * fields.length)])
                        .replace('{health_goal}', healthGoals[Math.floor(Math.random() * healthGoals.length)]);
                    
                    const completion = this.generateRejectionResponse(prompt);
                    
                    this.boundaryData.push({
                        prompt: prompt,
                        completion: completion,
                        category: 'non_buddhist'
                    });
                }
            }
        }
        
        console.log(`边界控制训练数据生成完成，共 ${this.boundaryData.length} 条`);
        return this.boundaryData;
    }

    async generateBuddhistResponse(prompt) {
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: '你是一个佛学大师，请根据佛经内容回答情绪心理问题。回答要包含具体的佛经引用和实用建议。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            
            return response.data.choices[0].message.content;
            
        } catch (error) {
            throw new Error(`GPT API调用失败: ${error.message}`);
        }
    }

    generateRejectionResponse(prompt) {
        const rejectionTemplates = [
            `抱歉，'${prompt}' 这个问题不在佛学讨论范围内。佛学关注的是内心的智慧与慈悲，而非${this.getCategory(prompt)}。建议你咨询相关领域的专业人士。`,
            
            `这个问题超出了佛学的范畴。佛学教导我们关注心灵成长和智慧开发，而非${this.getCategory(prompt)}。如需帮助，建议寻找相关专家。`,
            
            `佛学不讨论${this.getCategory(prompt)}相关的问题。佛学关注的是内在的修行和智慧的培养。建议你咨询该领域的专业人士。`
        ];
        
        return rejectionTemplates[Math.floor(Math.random() * rejectionTemplates.length)];
    }

    getCategory(prompt) {
        if (prompt.includes('赚钱') || prompt.includes('炒股') || prompt.includes('投资')) {
            return '金融投资';
        } else if (prompt.includes('英语') || prompt.includes('编程') || prompt.includes('技能')) {
            return '技能学习';
        } else if (prompt.includes('小说') || prompt.includes('电影') || prompt.includes('娱乐')) {
            return '娱乐休闲';
        } else if (prompt.includes('减肥') || prompt.includes('治疗') || prompt.includes('健康')) {
            return '健康医疗';
        } else {
            return '其他专业领域';
        }
    }
}

module.exports = BoundaryDataGenerator;