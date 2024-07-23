import CryptoJS from 'crypto-js';
import { API_URL, API_KEY } from '../config';

const getHmacSignatureHeaders = (path, method) => {
  const timestamp = new Date().getTime();
  const signature = hmacSignature(`${method}&${encodeURI(path)}&${timestamp}`, API_KEY);
  const headers = {
    'X-API-KEY': API_KEY,
    'X-TIMESTAMP': timestamp,
    'X-SIGNATURE': signature,
  };
  return headers;
};

const hmacSignature = (str, secret) => {
  return CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA512(str, secret));
};

export const get = async (path) => {
  const method = 'GET';
  const url = `${API_URL}${path}`;
  const headers = getHmacSignatureHeaders(path, method);
  try {
    const res = await fetch(url, { headers });
    const json = await res.json();
    return json;
  } catch (error) {
    throw error;
  }
};