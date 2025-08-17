// gpt_data_generator.js
const axios = require('axios');

class GPTDataGenerator {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.openai.com/v1/chat/completions';
        this.trainingData = [];
    }

    async generateTrainingData() {
        console.log('开始使用GPT生成佛学训练数据...');
        
        // 情绪问题模板
        const emotionalTemplates = [
            '我最近感到{emotion}，{situation}，不知道该怎么办',
            '我总是{behavior}，这让我很困扰',
            '我和{person}的关系出现了问题，{problem}',
            '我觉得{feeling}，找不到生活的意义'
        ];
        
        const emotions = ['焦虑', '抑郁', '愤怒', '悲伤', '恐惧', '孤独', '压力', '失眠'];
        const situations = ['工作压力很大', '学习很困难', '人际关系复杂', '对未来迷茫'];
        const behaviors = ['控制不住脾气', '拖延症严重', '容易紧张', '缺乏自信'];
        const persons = ['朋友', '家人', '同事', '伴侣'];
        const problems = ['经常吵架', '沟通困难', '信任缺失', '价值观冲突'];
        const feelings = ['空虚', '迷茫', '无助', '孤独'];
        
        let count = 0;
        const maxCount = 200; // 限制生成数量
        
        for (const template of emotionalTemplates) {
            for (const emotion of emotions) {
                for (const situation of situations) {
                    if (count >= maxCount) break;
                    
                    const prompt = template
                        .replace('{emotion}', emotion)
                        .replace('{situation}', situation)
                        .replace('{behavior}', behaviors[Math.floor(Math.random() * behaviors.length)])
                        .replace('{person}', persons[Math.floor(Math.random() * persons.length)])
                        .replace('{problem}', problems[Math.floor(Math.random() * problems.length)])
                        .replace('{feeling}', feelings[Math.floor(Math.random() * feelings.length)]);
                    
                    try {
                        const completion = await this.generateBuddhistResponse(prompt);
                        
                        this.trainingData.push({
                            prompt: prompt,
                            completion: completion
                        });
                        
                        count++;
                        console.log(`已生成 ${count}/${maxCount} 条数据`);
                        
                        // 避免API限制
                        await this.delay(1000);
                        
                    } catch (error) {
                        console.error('生成数据失败:', error.message);
                    }
                }
            }
        }
        
        console.log(`GPT生成完成，共生成 ${this.trainingData.length} 条数据`);
        return this.trainingData;
    }

    async generateBuddhistResponse(prompt) {
        try {
            const response = await axios.post(this.baseURL, {
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

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = GPTDataGenerator;