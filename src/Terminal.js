import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const skills = [
  { languages: ["JavaScript", "Python"] },
  { frontend: "React" },
  { backend: ["Django", "Express"] },
  { databases: ["Postgres", "MongoDB"]},
  { deploy: ["Heroku", "Google Cloud"]},
];

const portfolio = ['https://chew-champion.netlify.app/', 'https://slava-lokkeroom.netlify.app/register - under maintenance'];

const files = {
  "skills.json": JSON.stringify(skills, null, 2),
  "portfolio.md": JSON.stringify(portfolio, null, 2),
};

const contact = ['linkedin - https://www.linkedin.com/in/viacheslav-steshchenko/', 'github - https://github.com/vsteschenko']

const helpText = ["Available commands:","- ls: List available files", "- cat [file]: Open file", "- clear: Clear the screen except input line", "- su [username]: Switch user", "- help: List available commands"];

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState('guest');
  const [showHelpMessage, setShowHelpMessage] = useState(true);
  const [typedMessage, setTypedMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();

    const welcomeText = `Welcome to my Portfolio! Type 'help' if you're unsure how to use it.`;
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
    'contact': contact.join('\n'),
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
        <h2 className="About">About Me</h2>
        <p>Hello, my name is Slava and I am a Junior web developer. My passion for programming started in 2019 when I was writing simple scripts to save my time.</p>
        
        <h3 className="About">My Journey</h3>
        <p>In February 2023, I took an introductory course in Python on Coursera and liked it. I studied the following courses:</p>
        <ul>
            <li>Crash Course On Python - simple intro to syntax and capabilities of programming</li>
            <li>Using Python to Interact with Operating System - creating, moving files, copying files together with simple BASH scripting</li>
            <li>Troubleshooting and Debugging Techniques - intro into debugging and the basics of troubleshooting</li>
            <li>Intro to Git and Github - intro into version control system and use cases</li>
            <li>Configuration Management and the Cloud - intro into Google Cloud, puppet language and deploying and managing a fleet of machines on Google Cloud. This was the most interesting course by far</li>
        </ul>
        <p>In September 2023, I obtained a Google IT Automation with Python certificate. Around this time, I was recommended a training at BeCode where I have been enrolled since January 2024.</p>
        
        <h3 className="About">BeCode Bootcamp</h3>
        <p>BeCode is an amazing bootcamp for developers. It's a community of learners and developers thinking alike, building cool websites, and having fun. The core of BeCode is active learning, which is essentially learning by doing. I was gradually introduced to Git, variables, functions, OOP, then SQL, HTML and CSS, Express, React, Django, and mobile development.</p>
        <p>This bootcamp has prepared me well for the next step in my career, and I am proud to be part of this community.</p>
        
        <h3>Looking Forward</h3>
        <p>Currently, I am looking for an internship where I can apply my skills and contribute to meaningful projects.</p>
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