import PropTypes from 'prop-types';
import styled from 'styled-components';
import Result from './Result';
import Spinner from './Spinner';

const Body = (props) => {
  return (
    <Style.Body>
      {props.isLoading
        ? <Spinner />
        : <Result
            value={props.result}
            error={props.error}
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
    padding-top: 70px;
    padding-bottom: 45px;
  `,
};

export default Body;