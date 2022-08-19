import React from 'react';

import './style.css';

const ResetButton = ({resetChat}) => {

  const clickHandler = () => resetChat();
  
  return (
    <button className='reset-button' onClick={clickHandler}>Новый чат</button>
  )
}

export default ResetButton