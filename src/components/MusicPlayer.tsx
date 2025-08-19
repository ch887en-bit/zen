import React, { useRef, useEffect, useState } from 'react';
import { SoundOutlined } from '@ant-design/icons';
import './MusicPlayer.css';
import volumeDown from '../assets/images/volume-down.svg';
import volumeUp from '../assets/images/volume-up.svg';
import { useTranslation } from 'react-i18next';

const MusicPlayer: React.FC = () => {

  const [isPlaying, setIsPlaying] = useState(false); // 初始状态为未播放
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t } = useTranslation();
  
  // 当前音乐（只有一首）
  const currentMusic = {
    src: '/music/music.mp3',
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 设置循环播放
    audio.loop = true;

  }, []);

  // 移除自动播放的useEffect
  // useEffect(() => {
  //   const audio = audioRef.current;
  //   audio?.play();
  //   setIsPlaying(true);
  // }, []);


  return (
    <div className="music-player">
      {/* 音频元素 */}
      <audio
        ref={audioRef}
        src={currentMusic.src}
        preload="metadata"
        loop={true}
      />
      
      {/* 音乐控制按钮 */}
      <div 
        className="music-control-button"
        onClick={() => {
          const audio = audioRef.current;
          if (!audio) return;
          if (audio.paused) {
            audio.play();
            setIsPlaying(true);
          } else {
            audio.pause();
            setIsPlaying(false);
          }
        }}
      >
        <div className={'music-text'}>{isPlaying ? t('nav.musicOn') : t('nav.musicOff') }</div>
        <img src={!isPlaying ? volumeUp : volumeDown} alt="volume-up" className={'icon-music'} />
      </div>
    </div>
  );
};

export default MusicPlayer;
