import PropTypes from 'prop-types';

const ErrorResult = (props) => {
  const { error } = props;
  let message;
  if (error.status === 429) {
    message = '查詢過於頻繁';
  } else {
    message = '查詢失敗';
  }
  return (
    <div>
      <p>{message}</p>
      <p>請稍後再試一次</p>
    </div>
  );
};

ErrorResult.propTypes = {
  error: PropTypes.instanceOf(Error),
};

export default ErrorResult;