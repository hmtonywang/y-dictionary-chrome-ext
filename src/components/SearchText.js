import { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseBtn from './CloseBtn';

const SearchText = (props) => {
  useEffect(() => {
    document.getElementById('search-text').focus();
  }, []);
  return (
    <Style.Search>
      <Style.Icon
        width='12'
        height='12'
        viewBox='0 0 12 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M11.7802 9.96975L9.75 7.9395C10.2225 7.152 10.5 6.23325 10.5 5.25C10.5 2.355 8.14425 0 5.25 0C2.35575 0 0 2.355 0 5.25C0 8.145 2.35575 10.5 5.25 10.5C6.234 10.5 7.152 10.2233 7.9395 9.75L9.96975 11.7802C10.116 11.9265 10.308 12 10.5 12C10.692 12 10.884 11.9265 11.0302 11.7802L11.7802 11.0302C12.0735 10.737 12.0735 10.263 11.7802 9.96975ZM5.25 9C3.17925 9 1.5 7.32075 1.5 5.25C1.5 3.17925 3.17925 1.5 5.25 1.5C7.32075 1.5 9 3.17925 9 5.25C9 7.32075 7.32075 9 5.25 9Z'
          fill='#898D9A'
        />
      </Style.Icon>
      <Style.Input
        id='search-text'
        type='text'
        autofocus
        placeholder='請輸入單字'
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        onKeyDown={(event) => {
          if (props.value && event.key === 'Enter') {
            props.onSubmit();
          }
        }}
      />
      {props.value && (
        <CloseBtn
          title='清除'
          onClick={() => props.onChange('')}
        />
      )}
    </Style.Search>
  );
};

SearchText.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const Style = {
  Search: styled.div`
    display: flex;
    min-height: 40px;
    background: #f7f7f8;
    border-radius: 40px;
    margin: 0 12px;
    border-style: hidden;
    flex-direction: row;
    align-items: center;
  `,
  Icon: styled.svg`
    margin: 0 4px 0 12px;
  `,
  Input: styled.input`
    width: 80%;
    height: 20px;
    color: #40485a;
    caret-color: #40485a;
    background: #f7f7f8;
    border-style: hidden;
    outline: unset;
    font-family: Roboto, Helvetica, arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    line-height: normal;
  `,
};

export default SearchText;