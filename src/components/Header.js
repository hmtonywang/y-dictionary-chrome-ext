import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from './TextInput';

const Header = (props) => {
  return (
    <Style.Header>
      <TextInput
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
};

const Style = {
  Header: styled.div`
    width: 100%;
    height: 55px;
    padding-top: 15px;
    background-color: #991e91;
    border: 0px;
    box-shadow: 0 0 5px 0 rgb(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
  `,
};

export default Header;