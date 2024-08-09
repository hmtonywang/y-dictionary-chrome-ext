import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import {
  MessageReceiver,
  PageReadyMessage,
  LookWordsUpMessage
} from '../modules/chrome_runtime_message';

const receiver = new MessageReceiver(window.chrome);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [text, setText] = useState('');
  const [words, setWords] = useState('');
  useEffect(() => {
    receiver
      .listen(PageReadyMessage)
      .listen(LookWordsUpMessage, (message) => {
        const payload = message.getPayload();
        lookWordsUp(payload);
      })
      .start();
  }, []);
  function lookWordsUp (words) {
    setText(words);
    setWords(words);
  }
  return (
    <Style.App id='app'>
      <Header
        text={text}
        onChange={setText}
        onSubmit={() => setWords(text)}
      />
      <QueryClientProvider client={queryClient}>
        <Body
          words={words}
          onClickOtherText={lookWordsUp}
        />
      </QueryClientProvider>
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