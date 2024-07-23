
const Error = (props) => {
  let message = '查詢失敗';
  return (
    <div>
      <p>{message}</p>
      <p>請稍後再試一次</p>
    </div>
  );
};

export default Error;