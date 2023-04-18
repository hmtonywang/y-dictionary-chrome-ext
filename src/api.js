import CryptoJS from 'crypto-js';
import { API_URL, API_KEY } from './config';

const sign = (str, secret) => {
  return CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA512(str, secret));
};

export const lookup = async (value) => {
  if (!value) {
    return;
  }
  const path = `/v1/words/${value}`;
  const url = `${API_URL}${path}`;
  const timestamp = new Date().getTime();
  const signature = sign(`GET&${encodeURI(path)}&${timestamp}`, API_KEY);
  const headers = {
    'X-API-KEY': API_KEY,
    'X-TIMESTAMP': timestamp,
    'X-SIGNATURE': signature,
  };
  let res;
  try {
    res = await fetch(url, { headers });
  } catch (error) {
    console.error(error);
    throw new Error('查詢失敗');
  }
  if (res.status === 200) {
    try {
      const json = await res.json();
      return json.data || json;
    } catch (error) {
      console.error(error);
      throw new Error('查詢失敗');
    }
  }
  if (res.status === 429) {
    throw new Error('忙碌中，請稍後再嘗試');
  }
  try {
    const json = await res.json();
    throw new Error(json.message);
  } catch (error) {
    console.error(error);
    throw new Error('查詢失敗');
  }
};

const obj = {
  lookup,
};

export default obj;