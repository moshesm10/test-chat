import React, {useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';
import Input from './components/input';
import MessageWindow from './components/message-window';
import ResetButton from './components/reset-button';
import {apiInitChat, apiWelcome, apiSendMessage, apiReset} from './helpers/apiRequest';
import {scrollToBottom} from './helpers/scroll-to-bottom';
import smoothscroll from 'smoothscroll-polyfill';

import './common-style/vars.css';
import './common-style/common.css';

smoothscroll.polyfill();

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const chatHistory = JSON.parse(localStorage.getItem('chat_history'))
    if (chatHistory !== null && chatHistory.length > 0) {
      setMessages(chatHistory)
    }
  }, []);

  useEffect(() => {
    const cuid = localStorage.getItem('cuid');
    if (!cuid || cuid === 'null') {
      apiInitChat().then(res => {
        localStorage.setItem('cuid', res['result']['cuid']);

        startChat(res['result']['cuid']);
      });
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
    scrollToBottom(document.querySelector('.window-wrapper'));
  }, [messages])

  const addMessageToView = (type, text) => {
    setMessages((messages) => [...messages, {type: type, text: text}]);
  }

  const startChat = (cuid) => {
    apiWelcome(cuid).then(res => {
      addMessageToView('receive', res['result']['text']['value']);
    }).catch(res => {
      setIsError(true);
      console.log(res)
    })
  }

  const sendMessage = (text) => {
    addMessageToView('send', text);

    const cuid = localStorage.getItem('cuid');
    apiSendMessage(cuid, text).then(res => {
      if (res['result']['cuid'] !== cuid) {
        localStorage.setItem('cuid', res['result']['cuid']);
      }

      addMessageToView('receive', res['result']['text']['value']);
    }).catch(res => {
      setIsError(true);
      console.log(res)
    })
  }

  const resetChat = () => {
    localStorage.removeItem('chat_history');
    setMessages([]);
    
    apiReset().then(res => {
      addMessageToView('receive', res['result']['text']['value']);
    }).catch(res => {
      setIsError(true);
      console.log(res)
    })
  }
  
  return (
    <div className="chat">
      <header>
        <h1>Тестовый чат</h1>
      </header>
      <main>
        <div className="window-wrapper">
          {!isError ? <MessageWindow messages={messages} /> : <span className="error">Ошибка на сервере</span>}
          
        </div>
        <Input sendMessage={sendMessage} />
      </main>
      <ResetButton resetChat={resetChat} />
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);