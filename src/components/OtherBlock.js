import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from './Link';
import Block from './Block';
import BaseUl from './BaseUl';
import InlineUl from './InlineUl';
import Pos from './Pos';

const OtherBlock = (props) => {
  const { value, onSubmit } = props;
  return (
    <Block title={value.name}>
      {value.rows && value.rows.length > 0 &&
        value.rows.map((row) => {
          if (row.type === 'title') {
            return <TitleRow value={row} onSubmit={onSubmit} />;
          } else if (row.type === 'link' && row.rows && row.rows.length > 0) {
            return <LinkRow value={row} onSubmit={onSubmit} />;
          } else if (row.type === 'content' && row.rows && row.rows.length > 0) {
            return <ContentRow value={row} onSubmit={onSubmit} />;
          } else if (row.type === 'phonetic' && row.rows && row.rows.length > 0) {
            return <PhoneticRow value={row} />;
          }
          return false;
        })
      }
    </Block>
  );
};

const TitleRow = (props) => {
  const { value, onSubmit } = props;
  const { label, text, href } = value;
  return (
    <Style.Row>
      {label && <Pos value={label} />}
      {href
        ? <Link text={text} href={href} onSubmit={onSubmit} />
        : <span>{value.text}</span>
      }
    </Style.Row>
  );
};

const LinkRow = (props) => {
  const { value, onSubmit } = props;
  return (
    <Style.Row margin={2}>
      <BaseUl
        items={value.rows.map((row) => {
          const { text, href } = row;
          return <Link text={text} href={href} onSubmit={onSubmit} />;
        })}
      />
    </Style.Row>
  );
};

const ContentRow = (props) => {
  const { value } = props;
  return (
    <Style.Row margin={2}>
      <BaseUl
        items={value.rows.map((rows) => {
          const items = [rows.pos
            ? (
              <div>
                <Pos value={rows.pos} />
                <span>{rows.explanation}</span>
              </div>
            )
            : <div>{`• ${rows.explanation}`}</div>
          ];
          if (rows.examples && rows.examples.length > 0) {
            items.push(
              <Style.Row margin={1}>
                <BaseUl
                  items={rows.examples.map(example =>
                    <Style.Example>{example}</Style.Example>
                  )}
                />
              </Style.Row>
            );
          }
          return items;
        })}
      />
    </Style.Row>
  );
};

const PhoneticRow = (props) => {
  const { value } = props;
  return (
    <Style.Row margin={2}>
      <InlineUl items={value.rows} />
    </Style.Row>
  );
};

OtherBlock.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rows: PropTypes.array,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const Style = {
  Result: styled.div`
    margin: 16px 12px 0 12px;
  `,
  Row: styled.div`
    margin-left: ${props => `${props.margin * 10}px`};
    margin-top: 12px;
    margin-bottom: 12px;
    line-height: 22px;
    min-height: 22px;
    :first-child {
      margin-top: 0;
    }
  `,
  Example: styled.p`
    color: #757575;
    line-height: 20px;
  `,
};

export default OtherBlock;