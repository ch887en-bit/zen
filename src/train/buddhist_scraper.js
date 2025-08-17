// buddhist_scraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

class BuddhistDataCollector {
    constructor() {
        this.trainingData = [];
        this.baseUrls = [
            'https://www.fjnet.com/',
            'https://www.fjdh.cn/',
            'https://www.fjnet.com/'
        ];
    }

    async scrapeBuddhistContent() {
        console.log('开始爬取佛学网站内容...');
        
        for (const url of this.baseUrls) {
            try {
                console.log(`正在爬取: ${url}`);
                const response = await axios.get(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });
                
                const $ = cheerio.load(response.data);
                
                // 提取文章内容
                const articles = $('article, .content, .article');
                
                articles.each((index, element) => {
                    const title = $(element).find('h1, h2, h3').first().text().trim();
                    const content = $(element).find('p, .text').text().trim();
                    
                    if (title && content && content.length > 100) {
                        this.trainingData.push({
                            prompt: `请解释：${title}`,
                            completion: content.substring(0, 500) + '...'
                        });
                    }
                });
                
                // 避免请求过快
                await this.delay(2000);
                
            } catch (error) {
                console.error(`爬取 ${url} 失败:`, error.message);
            }
        }
        
        console.log(`爬取完成，共收集 ${this.trainingData.length} 条数据`);
        return this.trainingData;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = BuddhistDataCollector;