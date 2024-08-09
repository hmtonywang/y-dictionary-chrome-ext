import PropTypes from 'prop-types';
import styled from 'styled-components';

const Block = (props) => {
  const { title, notes } = props;
  return (
    <Style.Block>
      <Style.BlockContent>
        {title && <Style.BlockTitle>{title}</Style.BlockTitle>}
        {props.children}
      </Style.BlockContent>
      {notes}
    </Style.Block>
  );
};

Block.propTypes = {
  title: PropTypes.string,
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
  BlockTitle: styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
    color: #101518;
    line-height: 24px;
    font-size: 24px;
    font-weight: 500;
  `,
};

export default Block;