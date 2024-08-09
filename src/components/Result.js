import PropTypes from 'prop-types';
import styled from 'styled-components';
import NotFound from './NotFound';
import ErrorResult from './ErrorResult';
import MainBlock from './MainBlock';
import OtherBlock from './OtherBlock';

const Result = (props) => {
  const { error, value, onSubmit } = props;
  if (error) {
    return (
      <Style.Result>
        <ErrorResult error={error} />
      </Style.Result>
    );
  }
  if (!value) {
    return '';
  }
  if (value === 'Not Found') {
    return (
      <Style.Result>
        <NotFound />
      </Style.Result>
    );
  }
  return (
    <Style.Result>
      <div>
        {value.main && value.main.title && <MainBlock value={value.main} notes={value.notes} onSubmit={onSubmit} />}
        {value.secondary && value.secondary.length > 0 &&
          value.secondary.map((item) => <OtherBlock value={item} onSubmit={onSubmit} />)
        }
        {value.more && value.more.length > 0 &&
          value.more.map((item) => <OtherBlock value={item} onSubmit={onSubmit} />)
        }
      </div>
    </Style.Result>
  );
};

Result.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const Style = {
  Result: styled.div`
    margin: 16px 12px 0 12px;
  `,
};

export default Result;