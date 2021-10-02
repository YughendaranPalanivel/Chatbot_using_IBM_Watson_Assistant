import React, {useState} from 'react';
import Axios from 'axios';
import Header from './Components/Header';
import Message from './Components/Message';
import './App.css';


const App = () =>{


  const [messageQueue, setMessageQueue] = useState([
    {
      message: 'Hello, I am Alexandra',
      isBot: true
    },
    {
      message: 'How can I help you?',
      isBot: true
    },
    {
      message: 'Hello',
      isBot: false
    },
    {
      message: 'Hello, how can I help you?',
      isBot: true
    }
  ])

  const handleSubmit = async(event) => {
    event.preventDefault();
    var message = document.getElementById('message-box').value.trim();
    if(message === ""){return;}
    setMessageQueue([...messageQueue,{message:message,isBot:false}]);
    try{
      Axios.get('http://localhost:8000/').then(res => localStorage.setItem('session_id',res.data.session_id));
      Axios.post('http://localhost:8000/message',{ input:message},{headers:{session_id: localStorage.getItem('session_id')}})
      .then(res =>{
        setMessageQueue([...messageQueue,{message:message,isBot:false},{message:res.data.output.generic[0].text,isBot:true}])}
        );
    }
    catch(err){
      console.log(err);
    }
    document.getElementById('message-box').value = "";
  }

  return(
  <div className = "App">
    <Header />
    <div className="dashboard">
      <div className="message-pile" id="message-pile-wraper">
        {messageQueue.map((val, key) => {return(<Message key={key} message={val.message} isBot={val.isBot}/>);})}
      </div>
    </div>
    <form className = "App__form">
      <input type="text" id="message-box" placeholder="write a reply..."></input>
      <button onClick={handleSubmit} >Send</button>
    </form>
    </div>);
}

export default App;




// const ChatBot = () => {


  // useEffect(() => {
  //   window.scrollTo(0,500);
  // }, [])
  
//   return (
//     <div className="chat-bot">
//       <div className="message-pile" id="message-pile-wraper">
//       {
//         messageQueue.map((val, key) => {
//             return(<Message key={key} message={val.message} isBot={val.isBot}/>);
//         })
//       }
//       </div>
//       <form className="message-form">
//         <input id="message-box" className="message" name="chat" type="text" placeholder="Type Something . . ."/>
//         <button onClick = {handleSubmit} className="send-icon chat-icon"><SendIcon /></button>
//       </form>
//     </div>
//   );
// }


