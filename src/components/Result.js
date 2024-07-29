import PropTypes from 'prop-types';
import styled from 'styled-components';
import NotFound from './NotFound';
import ErrorResult from './ErrorResult';
import Link from './Link';
import Block from './Block';
import BaseUl from './BaseUl';
import InlineUl from './InlineUl';
import Explanations from './Explanations';

const MainBlock = (props) => {
  const { value, notes } = props;
  return (
    <Block
      notes={notes && notes.length > 0
        ? (
          <Style.Notes>
            <BaseUl items={notes} />
          </Style.Notes>
        )
        : null
      }
    >
      <Style.Title>{value.title}</Style.Title>
      {value.phonetic && value.phonetic.length > 0 && (
        <Style.Phonetic>
          <InlineUl items={value.phonetic} />
        </Style.Phonetic>
      )}
      {value.explanations && value.explanations.length > 0 && (
        <Explanations
          items={value.explanations.map((item) => (
            <div>
              {item.pos && <Style.Pos>{item.pos}</Style.Pos>}
              <span>{item.explanation}</span>
            </div>
          ))}
        />
      )}
    </Block>
  );
};

const OtherBlock = (props) => {
  const { value, onClickOtherText } = props;
  return (
    <Block>
      <Style.Title>{value.name}</Style.Title>
      {value.rows && value.rows.length > 0 &&
        value.rows.map((row) => {
          if (row.type === 'title') {
            return <TitleRow value={row} onClickOtherText={onClickOtherText} />;
          } else if (row.type === 'link' && row.rows && row.rows.length > 0) {
            return <LinkRow value={row} onClickOtherText={onClickOtherText} />;
          } else if (row.type === 'content' && row.rows && row.rows.length > 0) {
            return <ContentRow value={row} onClickOtherText={onClickOtherText} />;
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
  const { value, onClickOtherText } = props;
  const { label, text, href } = value;
  return (
    <Style.Row>
      {label && <Style.Pos>{label}</Style.Pos>}
      {href
        ? <Link text={text} href={href} onClickOtherText={onClickOtherText} />
        : <span>{value.text}</span>
      }
    </Style.Row>
  );
};

const LinkRow = (props) => {
  const { value, onClickOtherText } = props;
  return (
    <Style.Row margin={2}>
      <BaseUl
        items={value.rows.map((row) => {
          const { text, href } = row;
          return <Link text={text} href={href} onClickOtherText={onClickOtherText} />;
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
                <Style.Pos>{rows.pos}</Style.Pos>
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

const Result = (props) => {
  const { error, value, onClickOtherText } = props;
  if (error) {
    return (
      <Style.Result>
        <ErrorResult error={error} />
      </Style.Result>
    );
  }
  if (!value) {
    return '';
  }
  if (value === 'Not Found') {
    return (
      <Style.Result>
        <NotFound />
      </Style.Result>
    );
  }
  return (
    <Style.Result>
      <div>
        {value.main && value.main.title && <MainBlock value={value.main} notes={value.notes} onClickOtherText={onClickOtherText} />}
        {value.secondary && value.secondary.length > 0 &&
          value.secondary.map((item) => <OtherBlock value={item} onClickOtherText={onClickOtherText} />)
        }
        {value.more && value.more.length > 0 &&
          value.more.map((item) => <OtherBlock value={item} onClickOtherText={onClickOtherText} />)
        }
      </div>
    </Style.Result>
  );
};

Result.propTypes = {
  onClickOtherText: PropTypes.func.isRequired,
};

const Style = {
  Result: styled.div`
    margin: 16px 12px 0 12px;
  `,
  Title: styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
    color: #101518;
    line-height: 24px;
    font-size: 24px;
    font-weight: 500;
  `,
  Phonetic: styled.div`
    margin-bottom: 10px;
  `,
  Pos: styled.span`
    display: inline-block;
    margin-right: 12px;
    font-size: 14px;
    vertical-align: middle;
    min-width: 36px;
    height: 22px;
    border-radius: 2px;
    background-color: #006cb7;
    text-align: center;
    color: #fff;
    padding: 0 2px;
  `,
  Notes: styled.div`
    background-color: #fafafc;
    border-top: solid 1px #e5e5e5;
    padding: 10px 6px;
    ul {
      li {
        margin-top: 10px;
        :first-child {
          margin-top: 0;
        }
      }
    }
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

export default Result;