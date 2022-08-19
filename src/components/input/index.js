import React, {useState, useEffect} from 'react';

import './style.css';

const Input = ({sendMessage}) => {
  const [inputText, setInputText] = useState('');

  const keyDownHandler = event => {
    if (event.key === 'Enter') {
      event.preventDefault();

      sendMessage(inputText);
      setInputText('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  });

  const inputHandler = (event) => setInputText(event.target.value);

  const clickHandler = () => {
    if (inputText) {
      setInputText('');
      sendMessage(inputText);
    }
  };
  
  return (
    <div className="input-wrapper">
      <textarea className="input__text" onChange={inputHandler} name="text" placeholder="Введите сообщение..." value={inputText}></textarea>
      <button className={`input__send-button ${!inputText ? 'disable' : ''}`} onClick={clickHandler}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.32387 0.0955428L29.4883 14.1661C29.6419 14.2428 29.7712 14.3616 29.8616 14.509C29.9521 14.6564 30 14.8265 30 15.0001C30 15.1737 29.9521 15.3439 29.8616 15.4913C29.7712 15.6387 29.6419 15.7575 29.4883 15.8342L1.32203 29.9047C1.16424 29.9833 0.987489 30.0143 0.812836 29.9939C0.638182 29.9735 0.472985 29.9027 0.336918 29.7898C0.200852 29.6769 0.0996511 29.5268 0.0453685 29.3573C-0.00891409 29.1877 -0.0139905 29.0059 0.0307435 28.8335L2.82059 18.1495C2.86581 17.9767 2.95926 17.8207 3.08971 17.7003C3.22017 17.5799 3.38211 17.5002 3.55611 17.4708L16.1774 15.3377C16.2526 15.325 16.3235 15.2936 16.3837 15.2462C16.4439 15.1988 16.4915 15.1369 16.5222 15.0662L16.5552 14.9546C16.5723 14.8512 16.5545 14.7449 16.5045 14.6531C16.4546 14.5612 16.3755 14.4892 16.2801 14.4487L16.1774 14.419L3.48641 12.2747C3.31274 12.245 3.1512 12.1651 3.02109 12.0448C2.89098 11.9244 2.79782 11.7686 2.75272 11.596L0.0307435 1.16859C-0.0144558 0.996085 -0.00973059 0.814033 0.0443552 0.644175C0.0984411 0.474318 0.199602 0.323832 0.335758 0.210688C0.471914 0.0975438 0.637311 0.0265222 0.812199 0.00610436C0.987088 -0.0143135 1.16408 0.0167354 1.32203 0.0955428H1.32387Z" fill="white"/>
        </svg>
      </button>
    </div>
  )
}

export default Input