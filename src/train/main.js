// main.js
const BuddhistDataCollector = require('./buddhist_scraper');
const GPTDataGenerator = require('./gpt_data_generator');
const ManualDataCurator = require('./manual_data_curator');
const DataAugmenter = require('./data_augmenter');
const fs = require('fs').promises;

class BuddhistAITrainer {
    constructor(openaiApiKey) {
        this.openaiApiKey = openaiApiKey;
        this.allTrainingData = [];
    }

    async run() {
        console.log('🚀 开始收集佛学AI训练数据...\n');
        
        try {
            // 1. 手动整理数据
            // console.log('📝 第一阶段：手动整理数据');
            // const curator = new ManualDataCurator();
            // const manualData = curator.createManualTrainingData();
            // this.allTrainingData.push(...manualData);
            
            // 2. 使用GPT生成数据
            if (this.openaiApiKey) {
                console.log('\n�� 第二阶段：使用GPT生成数据');
                const gptGenerator = new GPTDataGenerator(this.openaiApiKey);
                const gptData = await gptGenerator.generateTrainingData();
                this.allTrainingData.push(...gptData);
            }
            
            // // 3. 从网站爬取数据
            // console.log('\n🌐 第三阶段：从网站爬取数据');
            // const scraper = new BuddhistDataCollector();
            // const scrapedData = await scraper.scrapeBuddhistContent();
            // this.allTrainingData.push(...scrapedData);
            
            // 4. 数据增强
            console.log('\n🔄 第四阶段：数据增强');
            const augmenter = new DataAugmenter();
            const augmentedData = augmenter.augmentTrainingData(this.allTrainingData);
            
            // 5. 数据去重和验证
            console.log('\n✅ 第五阶段：数据去重和验证');
            const finalData = this.deduplicateAndValidate(augmentedData);
            
            // 6. 保存数据
            console.log('\n💾 第六阶段：保存数据');
            await this.saveData(finalData);
            
            console.log(`\n�� 数据收集完成！共收集 ${finalData.length} 条高质量训练数据`);
            
        } catch (error) {
            console.error('❌ 数据收集过程中出现错误:', error);
        }
    }

    deduplicateAndValidate(data) {
        console.log('开始数据去重和验证...');
        
        // 去重
        const uniqueData = [];
        const seenPrompts = new Set();
        
        for (const item of data) {
            if (!seenPrompts.has(item.prompt) && 
                item.prompt.length >= 10 && 
                item.completion.length >= 50) {
                uniqueData.push(item);
                seenPrompts.add(item.prompt);
            }
        }
        
        console.log(`去重后数据量: ${uniqueData.length}`);
        return uniqueData;
    }

    async saveData(data) {
        // 保存为JSONL格式
        const jsonlContent = data.map(item => JSON.stringify(item)).join('\n');
        await fs.writeFile('buddhist_training_data.jsonl', jsonlContent, 'utf8');
        
        // 保存为JSON格式（便于查看）
        await fs.writeFile('buddhist_training_data.json', JSON.stringify(data, null, 2), 'utf8');
        
        console.log('数据已保存为 buddhist_training_data.jsonl 和 buddhist_training_data.json');
    }
}

// 使用示例
async function main() {
    const openaiApiKey = 'sk-KEva6LAfc6x9bctxE4Cf78788cFe44F4A9D0Be922fFa5a5c';
    
    if (openaiApiKey === 'your-openai-api-key') {
        console.log('⚠️  请设置 OPENAI_API_KEY 环境变量或直接传入API密钥');
        console.log('export OPENAI_API_KEY="your-actual-api-key"');
        return;
    }
    
    const trainer = new BuddhistAITrainer(openaiApiKey);
    await trainer.run();
}

// 如果直接运行此文件
if (require.main === module) {
    main().catch(console.error);
}

module.exports = BuddhistAITrainer;