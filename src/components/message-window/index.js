import React from 'react';
import Message from '../message';

import './style.css';

const MessageWindow = ({messages}) => {

  return (
    <div className="chat-window">
      {messages.length > 0 ? messages.map((item, index) => <Message key={item['text'] + index} isReceive={item['type'] === 'receive'} message={item['text']} />) : ''}
    </div>
  )
}

export default MessageWindow