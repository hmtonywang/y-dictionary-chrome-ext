import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { lookWordsUp } from '../api/words';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const getSearchParams = () => {
  const params = new URLSearchParams(window.location.search);
  return params;
};

const App = () => {
  const params = getSearchParams();
  const [words, setWords] = useState(params.get('words') || '');
  const [submitWords, setSubmitWords] = useState('');
  const communicateWithServiceWorker = () => {
    window.chrome.runtime.onMessage.addListener((msg) => {
      const { from, action, words} = msg;
      if (from === 'y-dictionary-service-worker' && action === 'look-words-up') {
        setWords(words);
        setSubmitWords(words);
      }
    })
    window.chrome.runtime.connect({ name: 'y-dictionary-side-panel' });
  };
  useEffect(() => {
    if (words) {
      setSubmitWords(words);
    }
    communicateWithServiceWorker();
  }, []);
  
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error
  } = useQuery({
    queryKey: ['words', submitWords],
    queryFn: () => lookWordsUp(submitWords)
  });
  return (
    <Style.App id='app'>
      <Header
        text={words}
        onChange={setWords}
        onSubmit={setSubmitWords}
      />
      <Body
        isLoading={isLoading}
        result={data}
        error={error}
        onClickOtherText={(text) => {
          setWords(text);
          setSubmitWords(text);
        }}
      />
      <Footer />
    </Style.App>
  );
};

const Style = {
  App: styled.div`
    width: 100%;
    background: #ffffff;
    color: #000;
    font-size: 14px;
  `,
};

export default App;