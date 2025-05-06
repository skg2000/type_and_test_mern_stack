import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { fetchTypingText } from '../API/fetchText';
import HistoryModal from './HistoryModal';
import { Link } from 'react-router-dom';
import { saveTypingHistory, getTypingHistory, saveToLeaderboard } from '../API/api';

const TypingTest = () => {
  const maxTime = 60;
  const [paragraph, setParagraph] = useState('');
  const [words, setWords] = useState([]);
  const [typedWords, setTypedWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [typedValue, setTypedValue] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [isTyping, setIsTyping] = useState(false);
  const [CPM, setCPM] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    loadNewParagraph();
    loadHistory();
  }, []);

  const loadNewParagraph = async () => {
    const text = await fetchTypingText();
    const splitWords = text.trim().split(/\s+/);
    setParagraph(text);
    setWords(splitWords);
    setTypedWords([]);
    setTypedValue('');
    setWordIndex(0);
    setMistakes(0);
    setCPM(0);
    setWPM(0);
    setTimeLeft(maxTime);
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const loadHistory = async () => {
    const data = await getTypingHistory();
    setHistoryData(data);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let timer;
    if (isTyping && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          const correctChars = typedWords.filter(w => w.correct).reduce((sum, w) => sum + w.word.length + 1, 0);
          const totalTime = maxTime - newTime || 1;
          setCPM(Math.floor((correctChars * 60) / totalTime));
          setWPM(Math.floor((correctChars / 5) * (60 / totalTime)));
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTyping(false);
      saveResults();
    }
    return () => clearInterval(timer);
  }, [isTyping, timeLeft, typedWords]);

  const saveResults = async () => {
    const accuracy = wordIndex > 0 ? ((wordIndex - mistakes) / wordIndex) * 100 : 0;
    await saveTypingHistory({
      WPM,
      CPM,
      mistakes,
      accuracy: accuracy.toFixed(1),
      date: new Date().toISOString()
    });
    await saveToLeaderboard({ username: 'You', wpm: WPM });
    loadHistory();
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (!isTyping && timeLeft > 0) {
      setIsTyping(true);
    }

    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const actualWord = words[wordIndex] || '';
      const isCorrect = typedWord === actualWord;
      setTypedWords(prev => [...prev, { word: typedWord, correct: isCorrect }]);
      if (!isCorrect) setMistakes(prev => prev + 1);
      setWordIndex(prev => prev + 1);
      setTypedValue('');
    } else {
      setTypedValue(value);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const accuracy = wordIndex > 0 ? ((wordIndex - mistakes) / wordIndex) * 100 : 0;

  const renderWord = (word, index) => {
    if (index === wordIndex) {
      return (
        <span className="word active" key={index}>
          {word.split('').map((char, i) => {
            const typedChar = typedValue[i];
            let className = '';
            if (typedChar == null) className = 'pending';
            else if (typedChar === char) className = 'correct-char';
            else className = 'wrong-char';
            return <span key={i} className={className}>{char}</span>;
          })}{' '}
        </span>
      );
    } else if (index < wordIndex) {
      const typed = typedWords[index];
      const className = typed?.correct ? 'correct' : 'wrong';
      return <span className={`word ${className}`} key={index}>{word} </span>;
    }
    return <span className="word" key={index}>{word} </span>;
  };

  return (
    <div className="container">
      <div className="header">
        <h1>⌨️ Typing Speed Test</h1>
        <button onClick={toggleTheme}>{theme === 'light' ? '🌙 Dark' : '☀️ Light'}</button>
        <button onClick={() => setShowHistory(true)}>📜 History</button>
        <Link to="/multiplayer" className="btn">🎮 Multiplayer</Link>
        <Link to="/leaderboard" className="btn">🏆 Leaderboard</Link>
      </div>

      <div className="test">
        <input
          type="text"
          ref={inputRef}
          value={typedValue}
          onChange={handleChange}
          className="input-field"
          placeholder="Start typing..."
          disabled={timeLeft === 0 || wordIndex >= words.length}
        />
        <div className="paragraph">
          {words.map((word, index) => renderWord(word, index))}
        </div>
      </div>

      <div className="result">
        <p>⏱ Time Left: <strong>{timeLeft}s</strong></p>
        <p>❌ Mistakes: <strong>{mistakes}</strong></p>
        <p>⚡ CPM: <strong>{CPM}</strong></p>
        <p>🚀 WPM: <strong>{WPM}</strong></p>
        <p>🎯 Accuracy: <strong>{accuracy.toFixed(1)}%</strong></p>
        <button onClick={loadNewParagraph}>🔁 Restart</button>
      </div>

      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={historyData}
      />
    </div>
  );
};

export default TypingTest;
