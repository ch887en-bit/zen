// lib/cloudflare-api.ts
const WORKER_URL = 'https://api.laozhang.ai/v1'

export class CloudflareAPI {
  static async chat(messages: any[], stream = false) {
    const response = await fetch(`${WORKER_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer sk-KEva6LAfc6x9bctxE4Cf78788cFe44F4A9D0Be922fFa5a5c`
      },
      body: JSON.stringify({ messages, stream, model: 'chatgpt-4o-latest', max_tokens: 300, temperature: 0.7 }),
    })

    if (stream) {
      return response.body
    }

    return response.json()
  }

  static async generateImage(prompt: string, size = '1024x1024') {
    const response = await fetch(`${WORKER_URL}/image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, size }),
    })

    return response.json()
  }

  static async generatePageContent(query: string) {
    const response = await fetch(`${WORKER_URL}/page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    return response.json()
  }

  // 演示用的本地API（当Worker未部署时使用）
  static async demoChat(messages: any[]) {
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          choices: [{
            message: {
              content: "这是一个演示回答。当Cloudflare Worker部署完成后，这里将显示真实的AI回答。"
            }
          }]
        })
      }, 1000)
    })
  }

  static async demoGeneratePageContent(query: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          content: {
            title: `关于"${query}"的智慧回答`,
            userQuery: query,
            responses: [
              {
                content: "这是一个演示回答。当Cloudflare Worker部署完成后，这里将显示真实的AI智慧回答。",
                quote: "诸行无常，是生灭法",
                source: "法华经",
                followUp: ""
              }
            ],
            imagePrompt: "A serene Zen meditation scene with soft colors and peaceful atmosphere"
          }
        })
      }, 1000)
    })
  }
}