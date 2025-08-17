import React, { useEffect, useState, useRef } from 'react'
import CustomeInput from './input'
import flowerImage from '../assets/images/flower.png'
import { CloudflareAPI } from '../lib/cloudflare-api'
import DynamicPromptGenerator from '../train/dynamic_prompt_generator'
import monkImage from '../assets/images/p2.png'
import Loading from './loading'

export default function InteractionPage({ title }: { title: string }) {
  // const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const promptGenerator = new DynamicPromptGenerator();
  // 添加 ref 用于滚动
  const pageContentRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    handleQuest(title)
  }, [])

  // 监听 list 变化，自动滚动到底部
  useEffect(() => {
    if (pageContentRef.current) {
      // 使用 setTimeout 确保 DOM 更新完成后再滚动
      setTimeout(() => {
        if (pageContentRef.current) {
          pageContentRef.current.scrollTop = pageContentRef.current.scrollHeight
        }
      }, 100)
    }
  }, [list])

  // 添加手动滚动到底部的函数
  const scrollToBottom = () => {
    if (pageContentRef.current) {
      pageContentRef.current.scrollTo({
        top: pageContentRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  const handleQuest = async (value: string) => {
    console.log('handleQuest', 1)
    // setIsLoading(true)
    let newList = []
    newList = [...list, {
      role: 'zen',
      content: value
    },{
      role: 'user',
      content: <div className='flex'>
        <div>佛祖在思考</div>
        <Loading />
      </div>
    }]
    setList(newList)
    const systemPrompt = promptGenerator.generateBuddhistPrompt(value);
    const res = await CloudflareAPI.chat(
      [
        {
          role: 'user',
          content: value
        },
        {
          role: 'system',
          content: systemPrompt
      },
      ],
    )
    // setIsLoading(false)
    // console.log(res, 'res')
    if (res.choices?.[0]?.message?.content) {
      newList = [...list, {
        role: 'zen',
        content: value
      }, {
        role: 'user',
        content: res.choices[0].message.content
      }]
    } else {
      newList = [...list, {
        role: 'zen',
        content: value
      }, {
        role: 'user',
        content: 'something went wrong'
      }]
    }
    setList(newList)
    setInputValue('') // 清空输入框
    // 手动触发滚动到底部
    setTimeout(scrollToBottom, 150)
    
  }

  return (
    <div className="interaction-page">
      {/* 顶部标题和分享按钮 */}
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="page-content" ref={pageContentRef}>
        {
          list.map((item, index) => (
            <div className={`bubble-container ${item.role === 'zen' ? 'zen-container' : 'user-container'}`} key={index}>
              {item.role === 'user' && <img src={flowerImage} alt="flow" className="flow-image" />}
              <div key={index} className={`${item.role}-bubble`}>
                <div>{item.content}</div>
              </div>
            </div>  
          ))
        }
      </div>
      <div className="input-section-container">
        {/* 小和尚插图 */}
        <div className="monk-illustration">
            <img src={monkImage} alt="monk" className="monk-image" />
          </div>
        <CustomeInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleQuest={() => handleQuest(inputValue)}
        />
        <p className="hint-text">- Clear your mind, pursue your quest -</p>
      </div>
      <div className="monk-image-container">
        <img src={monkImage} alt="monk" className="monk-image" />
      </div>
    </div>
  )
}