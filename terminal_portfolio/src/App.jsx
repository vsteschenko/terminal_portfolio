import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const myProjects = ['1', '2', '3', '4'];

  const handleKeyDown = (e) => {
    if(e.keyCode == 13) {
      clickHandler();
    };
  };

  const clickHandler = () => {
    if(input.trim() !== '') {
      if (input.trim() === 'ls') {
        setMessages(prevMessages => [...prevMessages, myProjects]);
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
                <ul key={index}>
                  {message.map((project, ind) => <li key={ind}>{project}</li>)}
                </ul>
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