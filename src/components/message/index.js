import React from 'react';


import './style.css';

const Message = ({isReceive, message}) => {

  return (
    <div className={`message ${isReceive ? 'receive' : 'send'}`}>
      <div className="content" dangerouslySetInnerHTML={{__html: message}} />
    </div>
  )
}

export default Message