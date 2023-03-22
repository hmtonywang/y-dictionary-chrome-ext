import styled from 'styled-components';

const Footer = () => {
  return (
    <Style.Footer>
      <a
        href='https://tw.dictionary.search.yahoo.com/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Yahoo奇摩字典
      </a>
    </Style.Footer>
  );
};

const Style = {
  Footer: styled.div`
    height: 30px;
    padding: 6px 12px;
    box-sizing: border-box;
    display: flex;
    background-color: #fff;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #f7f7f8;
  `,
};

export default Footer;