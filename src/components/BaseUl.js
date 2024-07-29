import PropTypes from 'prop-types';
import styled from 'styled-components';

const BaseUl = (props) => {
  const { items } = props;
  return (
    <Style.BaseUl>
      {items.map((item) => {
        return <li>{item}</li>;
      })}
    </Style.BaseUl>
  );
};

BaseUl.propTypes = {
  items: PropTypes.array.isRequired,
};

export const Style = {
  BaseUl: styled.ul`
    vertical-align: top;
    padding: 0;
    list-style: none;
    list-style-position: outside;
  `,
};

export default BaseUl;