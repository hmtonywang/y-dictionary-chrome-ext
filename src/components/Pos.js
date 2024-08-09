import PropTypes from 'prop-types';
import styled from 'styled-components';

const Pos = (props) => {
  const { value } = props;
  return (
    <Style.Pos>{value}</Style.Pos>
  );
};

Pos.propTypes = {
  value: PropTypes.string.isRequired,
};

const Style = {
  Pos: styled.span`
    display: inline-block;
    margin-right: 12px;
    font-size: 14px;
    vertical-align: middle;
    min-width: 36px;
    height: 22px;
    border-radius: 2px;
    background-color: #006cb7;
    text-align: center;
    color: #fff;
    padding: 0 2px;
  `,
};

export default Pos;