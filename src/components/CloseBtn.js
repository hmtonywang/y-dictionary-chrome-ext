import PropTypes from 'prop-types';
import styled from 'styled-components';

const CloseBtn = (props) => {
  const size = props.size || 12;
  return (
    <Style.CloseBtn
      type='button'
      title={props.title || ''}
      size={size}
      onClick={props.onClick}
    >
      <svg
        width={size}
        height={size}
        viewBox='0 0 13 13'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M12.9562 1.20857L11.7432 0L6.93431 4.79143L2.1254 0L0.912415 1.20857L5.72133 6L0.912415 10.7914L2.1254 12L6.93431 7.20857L11.7432 12L12.9562 10.7914L8.14729 6L12.9562 1.20857Z'
          fill={props.color || '#40485A'}
        />
      </svg>
    </Style.CloseBtn>
  );
};

CloseBtn.propTypes = {
  title: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

const Style = {
  CloseBtn: styled.button`
    width: ${(props) => `${props.size || 12}px`};
    height: auto;
    cursor: pointer;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
  `,
};

export default CloseBtn;