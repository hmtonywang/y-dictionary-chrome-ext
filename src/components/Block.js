import PropTypes from 'prop-types';
import styled from 'styled-components';

const Block = (props) => {
  return (
    <Style.Block>
      <Style.BlockContent>
        {props.children}
      </Style.BlockContent>
      {props.notes}
    </Style.Block>
  );
};

const Style = {
  Block: styled.div`
    background-color: #fff;
    box-shadow: 0 3px 5px 0 rgb(0, 0, 0, 0.5);
    border: solid 1px #dbdbdb;
    margin-left: 3px;
    margin-right: 3px;
    margin-bottom: 6px;
    margin-top: 10px;
    :first-child {
      margin-top: 0;
    }
  `,
  BlockContent: styled.div`
    padding: 10px 6px;
  `,
};

export default Block;