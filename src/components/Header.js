import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseBtn from './CloseBtn';
import SearchText from './SearchText';

const logo = window.chrome.runtime.getURL('logo128.png');;

const Header = (props) => {
  const closeBtnSize = 16;
  return (
    <Style.Header>
      <Style.Top>
        <Style.Logo width={`calc(100% - ${closeBtnSize}px)`}>
          <img src={logo} alt='logo' />
        </Style.Logo>
        <CloseBtn
          size={closeBtnSize}
          color='#fff'
          title='關閉'
          onClick={props.onClose}
        />
      </Style.Top>
      <SearchText
        value={props.text}
        onChange={props.onChange}
        onSubmit={props.onSubmit}
      />
    </Style.Header>
  );
};

Header.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Style = {
  Header: styled.div`
    width: 100%;
    height: 95px;
    background-color: #991e91;
    box-sizing: border-box;
    border: 0px;
    box-shadow: 0 0 5px 0 rgb(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
  `,
  Top: styled.div`
    height: 40px;
    padding: 6px 12px;
    box-sizing: border-box;
    display: flex;
  `,
  Logo: styled.div`
    width: ${(props) => props.width};
    display: flex;
  `,
};

export default Header;