// main_boundary_training.js
const BoundaryDataGenerator = require('./generate_boundary_data');
const BoundaryDetectorTrainer = require('./boundary_detector_trainer');
const fs = require('fs').promises;

async function main() {
    try {
        console.log('🚀 开始佛学AI边界控制训练...\n');
        
        // 1. 生成边界训练数据
        console.log('📝 第一阶段：生成边界训练数据');
        const generator = new BoundaryDataGenerator(process.env.OPENAI_API_KEY);
        const boundaryData = await generator.generateBoundaryTrainingData();
        
        // 2. 训练边界检测器
        console.log('\n🔍 第二阶段：训练边界检测器');
        const trainer = new BoundaryDetectorTrainer();
        const classifier = await trainer.trainBoundaryDetector();
        
        // 3. 保存训练数据
        console.log('\n💾 第三阶段：保存训练数据');
        await saveTrainingData(boundaryData);
        
        // 4. 生成微调用的JSONL文件
        console.log('\n📊 第四阶段：生成微调数据');
        await generateFineTuningData(boundaryData);
        
        console.log('\n✅ 边界控制训练完成！');
        console.log('现在你可以使用这些数据来微调你的佛学AI模型了。');
        
    } catch (error) {
        console.error('❌ 训练过程中出现错误:', error);
    }
}

async function saveTrainingData(data) {
    // 保存为JSON格式
    await fs.writeFile('boundary_training_data.json', JSON.stringify(data, null, 2), 'utf8');
    
    // 按类别分类保存
    const buddhistData = data.filter(item => item.category === 'buddhist');
    const nonBuddhistData = data.filter(item => item.category === 'non_buddhist');
    
    await fs.writeFile('buddhist_questions.json', JSON.stringify(buddhistData, null, 2), 'utf8');
    await fs.writeFile('non_buddhist_questions.json', JSON.stringify(nonBuddhistData, null, 2), 'utf8');
    
    console.log(`佛学问题: ${buddhistData.length} 条`);
    console.log(`非佛学问题: ${nonBuddhistData.length} 条`);
}

async function generateFineTuningData(data) {
    // 转换为微调格式
    const fineTuningData = data.map(item => ({
        prompt: item.prompt,
        completion: item.completion
    }));
    
    // 保存为JSONL格式
    const jsonlContent = fineTuningData.map(item => JSON.stringify(item)).join('\n');
    await fs.writeFile('boundary_fine_tuning_data.jsonl', jsonlContent, 'utf8');
    
    console.log(`微调数据已保存: ${fineTuningData.length} 条`);
}

// 运行训练
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { main, saveTrainingData, generateFineTuningData };