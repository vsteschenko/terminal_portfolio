import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const myProjects = ['portfolio.md', 'skills.json'];
  const listOfProjects = ['www.chew-champion.com', 'www.chat.com', 'www.game.com', 'www.weather.com'];
  const listOfSkills = ["Languages: JS, Python", "Backend: Express, Django", "Frontend: React", "Database: MariaDB, Postgresql"]

  const handleKeyDown = (e) => {
    if(e.keyCode == 13) {
      clickHandler();
    };
  };

  const clickHandler = () => {
    if(input.trim() !== '') {
      if (input.trim() === 'ls') {
        setMessages(prevMessages => [...prevMessages, myProjects]);
      } else if(input.trim() === 'cat portfolio.md') {
        setMessages(prevMessages => [...prevMessages, listOfProjects])
      } else if(input.trim() === 'cat skills.json') {
        setMessages(prevMessages => [...prevMessages, listOfSkills])
      } else {
        setMessages(prevMessages => [...prevMessages, {text: `guest@vsteschenko:~ %  command doesn't exist`}]);
      }
      setInput('');
    };
  };

  return (
    <>
      <div>You are welcome to see my portfolio!</div>
      <div>
        {messages.map((message, index) => {
          if (Array.isArray(message)) {
            return (
              <>
                <p>guest@vsteschenko:~ %  ls</p>
                <div key={index} className="Skills">
                  {message.map((project, ind) => <div key={ind}>{project}</div>)}
                </div>
              </>
            );
          } else {
            return <p key={index}>{message.text}</p>
          }
        })}
      </div>
      <div className="DivInput">
        guest@vsteschenko:~ % <input className='Input' type='text' value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}></input>
      </div>
    </>
  )
}

export default App