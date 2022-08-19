export const apiRequest = (action, body) => {
  return fetch(`https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.${action}`, {
    method: 'POST',
    body: JSON.stringify(body)
  })
  .then(res => res.json())
}

export const apiInitChat = () => {
return apiRequest('init', {
    uuid: '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4'
  })
}

export const apiWelcome = (cuid) => {
  return apiRequest('event', {
    cuid: cuid,
    euid: "00b2fcbe-f27f-437b-a0d5-91072d840ed3"
  })
}

export const apiSendMessage = (cuid, text) => {
  return apiRequest('request', {
    cuid: cuid,
    text: text
  })
}

export const apiReset = () => {
  return apiRequest('init', {
    uuid: '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4'
  }).then(res => {
    localStorage.setItem('cuid', res['result']['cuid']);
    return apiWelcome(res['result']['cuid'])
  })
}