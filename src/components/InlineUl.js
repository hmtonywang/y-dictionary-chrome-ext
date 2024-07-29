import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Style as BaseUlStyle } from './BaseUl';

const InlineUl = (props) => {
  const { items } = props;
  return (
    <Style.InlineUl>
      {items.map((item) => {
        return <li>{item}</li>;
      })}
    </Style.InlineUl>
  );
};

InlineUl.propTypes = {
  items: PropTypes.array.isRequired,
};

const Style = {
  InlineUl: styled(BaseUlStyle.BaseUl)`
  li {
    display: inline-block;
    font-size: 14px;
    margin-right: 10px;
    vertical-align: top;
  }
`,
};

export default InlineUl;