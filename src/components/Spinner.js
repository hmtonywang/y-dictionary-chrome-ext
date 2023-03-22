import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <Style.Spinner>
      <ClipLoader
        color='#40485a'
        size='12px'
      />
      <span>載入中...</span>
    </Style.Spinner>
  );
};

const Style = {
  Spinner: styled.div`
    margin: 16px 12px 0 12px;
    color: #40485a;
    text-align: center;
    span {
      margin-left: 10px;
    }
  `,
};

export default Spinner;