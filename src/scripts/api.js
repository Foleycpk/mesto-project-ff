const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: 'b202a4e8-5e51-4e89-82f0-34fda1db945d',
    'Content-Type': 'application/json',
  },
};

function getResponseData(data) {
  if (data.ok) {
    return data.json();
  } else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((data) => {
      return getResponseData(data);
    });
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((data) => {
      return getResponseData(data);
    });
};

export const editUserProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  })
    .then((data) => {
      return getResponseData(data);
    });
};

export const createCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then((data) => {
      return getResponseData(data);
    });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((data) => {
      return getResponseData(data);
    });
};

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((data) => {
      return getResponseData(data);
    });
};

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((data) => {
      return getResponseData(data);
    });
};

export const changeAvatar = (imageLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${imageLink}`,
    }),
  })
    .then((data) => {
      return getResponseData(data);
    });
};
