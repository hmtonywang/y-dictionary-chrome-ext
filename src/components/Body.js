import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchResult from './SearchResult';
import Spinner from './Spinner';

const Body = (props) => {
  return (
    <Style.Body>
      {props.loading
        ? <Spinner />
        : <SearchResult
            value={props.result}
            onClickOtherText={props.onClickOtherText}
          />
      }
    </Style.Body>
  );
};

Body.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClickOtherText: PropTypes.func.isRequired,
};

const Style = {
  Body: styled.div`
    padding-top: 100px;
    padding-bottom: 45px;
    overflow: hidden;
  `,
};

export default Body;