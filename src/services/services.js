import { apiUrl } from '../config';

export const fetchRequest = async (link, method, auth, body) => {
  const res = await fetch(`${apiUrl}${link}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${auth}`,
    },
    body: JSON.stringify(body),
  });
  return res;
};

export const logReg = async (link, method, body) => {
  const res = await fetch(`${apiUrl}${link}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(body),
  });
  return res;
};