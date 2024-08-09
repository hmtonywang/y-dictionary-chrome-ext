import PropTypes from 'prop-types';
import styled from 'styled-components';

const Link = (props) => {
  const { text, href, onSubmit } = props;
  return (
    <Style.Link>
      <button
        onClick={() => onSubmit(text)}
      >
        {text}
      </button>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={href}
      >
        另開新分頁
      </a>
    </Style.Link>
  );
};

Link.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const Style = {
  Link: styled.div`
    button {
      display: inline-block;
      background: none;
      border: none;
      padding: 0;
      color: #069;
      text-decoration: underline;
      cursor: pointer;
      margin-right: 15px;
    }
    a {
      display: inline-block;
      font-size: 8px;
      vertical-align: middle;
      height: 14px;
      line-height: 14px;
      border-radius: 5px;
      background-color: #40485a;
      text-align: center;
      color: #fff;
      padding: 0 2px;
      text-decoration: none;
    }
  `
};

export default Link;