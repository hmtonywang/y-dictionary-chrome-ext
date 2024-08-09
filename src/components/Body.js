import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { lookWordsUp } from '../api/words';
import Result from './Result';
import Spinner from './Spinner';

const useLookWordsUp = (words) => {
  return useQuery({
    queryKey: ['words', words],
    queryFn: () => lookWordsUp(words)
  });
};

const Body = (props) => {
  const { words } = props;
  const {
    data,
    isLoading,
    error
  } = useLookWordsUp(words);
  return (
    <Style.Body>
      {isLoading
        ? <Spinner />
        : <Result
            value={data}
            error={error}
            onClickOtherText={props.onClickOtherText}
          />
      }
    </Style.Body>
  );
};

Body.propTypes = {
  words: PropTypes.string,
  onClickOtherText: PropTypes.func.isRequired,
};

const Style = {
  Body: styled.div`
    padding-top: 70px;
    padding-bottom: 45px;
  `,
};

export default Body;