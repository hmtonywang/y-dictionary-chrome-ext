import { LOOKUP_API } from './config';

export const lookup = async (value) => {
  if (!value) {
    return;
  }
  let res;
  try {
    res = await fetch(`${LOOKUP_API}${value}`);
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
    throw new Error(json.error);
  } catch (error) {
    console.error(error);
    throw new Error('查詢失敗');
  }
};

const obj = {
  lookup,
};

export default obj;