import { get } from './request';

const PATH = '/v1/words';

export const lookWordsUp = async (word) => {
  if (!word) {
    return;
  }
  const path = `${PATH}/${word}`;
  return await get(path);
};