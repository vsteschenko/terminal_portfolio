import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const skills = [
  { languages: ["JavaScript", "Python"] },
  { frontend: "React" },
  { backend: ["Django", "Express"] },
];

const portfolio = ['project 1', ' project 2', ' project 3'];

const files = {
  "skills.json": JSON.stringify(skills, null, 2),
  "portfolio.md": portfolio,
};

const helpText = ["Available commands:","- ls: List available files", "- cat [file]", "- clear: Clear the screen except input line", "- su [username]", "- help: List available commands"];

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState('guest');
  const [showHelpMessage, setShowHelpMessage] = useState(true);
  const [typedMessage, setTypedMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();

    const welcomeText = "Welcome to my Portfolio! Type 'help' if you're unsure how to use it.";
    let index = 0;
    const timer = setInterval(() => {
      if (index <= welcomeText.length) {
        setTypedMessage(welcomeText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const commands = {
    'clear': 'clear',
    'switch user': `Switching user. Current user: ${user === 'guest' ? 'admin' : 'guest'}`,
    'help': helpText,
    'ls': Object.keys(files).join('\n'),
  };

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      const newHistory = [...history, `${user}@vsteschenko:~$ ${input}`];
      const [command, ...args] = input.split(' ');

      if (commands[command]) {
        if (command === 'clear') {
          setHistory([]);
        } else if (command === 'switch user') {
          setUser(user === 'guest' ? 'admin' : 'guest');
          setHistory([...newHistory, commands[command]]);
        } else if (command === 'help') {
          setHistory([...newHistory, ...commands[command]]);
        } else {
          setHistory([...newHistory, commands[command]]);
        }
      } else if (command === 'cat' && args[0] && files[args[0]]) {
        setHistory([...newHistory, files[args[0]]]);
      } else if (command === 'su' && args[0]) {
        setUser(args[0]);
        setHistory([...newHistory, `Switching user to ${args[0]}. Current user: ${args[0]}`]);
      } else {
        setHistory([...newHistory, `Command not found: ${input}`]);
      }
      setInput('');
    }
  };

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="terminal" onClick={handleClick}>
      {showHelpMessage && <div className="helpMessage">{typedMessage}</div>}
      {history.map((item, index) => (
        <div key={index} className="historyItem">{item}</div>
      ))}
      <div className="inputLine">
        <span>{user}@<span className="Name">vsteschenko</span>:~$ </span>
        <input
          ref={inputRef}
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInput}
        />
      </div>
    </div>
  );
};

export default Terminal;
