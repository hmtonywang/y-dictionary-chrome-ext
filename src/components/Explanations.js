import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseUl from './BaseUl';

const Explanations = (props) => {
  const { items } = props;
  return (
    <Style.Explanations>
      <BaseUl items={items} />
    </Style.Explanations>
  );
};

Explanations.propTypes = {
  items: PropTypes.array.isRequired,
};

const Style = {
  Explanations: styled.div`
    margin-bottom: 10px;
    ul {
      li {
        margin-top: 12px;
        margin-bottom: 12px;
        line-height: 22px;
        min-height: 22px;
      }
    }
  `,
};

export default Explanations;