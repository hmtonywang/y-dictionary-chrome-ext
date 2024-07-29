import PropTypes from 'prop-types';
import styled from 'styled-components';
import NotFound from './NotFound';
import ErrorResult from './ErrorResult';
import Link from './Link';

const MainCard = (props) => {
  const { value } = props;
  return (
    <Style.Card>
      <Style.CardContent>
        <Style.Title>{value.title}</Style.Title>
        {value.phonetic && value.phonetic.length > 0 && (
          <Style.Phonetic>
            <Style.InlineUl>
              {value.phonetic.map((item) => (
                <li>{item}</li>
              ))}
            </Style.InlineUl>
          </Style.Phonetic>
        )}
        {value.explanations && value.explanations.length > 0 && (
          <Style.Explanations>
            <Style.BaseUl>
              {value.explanations.map((item) => (
                <li>
                  {item.pos && <Style.Pos>{item.pos}</Style.Pos>}
                  <span>{item.explanation}</span>
                </li>
              ))}
            </Style.BaseUl>
          </Style.Explanations>
        )}
      </Style.CardContent>
      {props.value.notes && props.value.notes.length > 0 && (
        <Style.Notes>
          <Style.BaseUl>
            {props.value.notes.map((item) => (
              <li>{item}</li>
            ))}
          </Style.BaseUl>
        </Style.Notes>
      )}
    </Style.Card>
  );
};

const OtherCard = (props) => {
  const { value, onClickOtherText } = props;
  return (
    <Style.Card>
      <Style.CardContent>
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
      </Style.CardContent>
    </Style.Card>
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
      <Style.BaseUl>
        {value.rows.map((row) => {
          const { text, href } = row;
          return <Link text={text} href={href} onClickOtherText={onClickOtherText} />;
        })}
      </Style.BaseUl>
    </Style.Row>
  );
};

const ContentRow = (props) => {
  const { value } = props;
  return (
    <Style.Row margin={2}>
      <Style.BaseUl>
        {value.rows.map((rows) => {
          return (
            <li>
              {rows.pos
                ? (
                  <div>
                    <Style.Pos>{rows.pos}</Style.Pos>
                    <span>{rows.explanation}</span>
                  </div>
                )
                : <div>{`• ${rows.explanation}`}</div>
              }
              {rows.examples && rows.examples.length > 0 && (
                <Style.Row margin={1}>
                  <Style.BaseUl>
                    {rows.examples.map(example =>
                      <li><Style.Example>{example}</Style.Example></li>
                    )}
                  </Style.BaseUl>
                </Style.Row>
              )}
            </li>
          );
        })}
      </Style.BaseUl>
    </Style.Row>
  );
};

const PhoneticRow = (props) => {
  const { value } = props;
  return (
    <Style.Row margin={2}>
      <Style.InlineUl>
        {value.rows.map((row) => (
          <li>{row}</li>
        ))}
      </Style.InlineUl>
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
        {value.main && value.main.title && <MainCard value={value.main} onClickOtherText={onClickOtherText} />}
        {value.secondary && value.secondary.length > 0 &&
          value.secondary.map((item) => <OtherCard value={item} onClickOtherText={onClickOtherText} />)
        }
        {value.more && value.more.length > 0 &&
          value.more.map((item) => <OtherCard value={item} onClickOtherText={onClickOtherText} />)
        }
      </div>
    </Style.Result>
  );
};

Result.propTypes = {
  onClickOtherText: PropTypes.func.isRequired,
};

const baseUl = styled.ul`
  vertical-align: top;
  padding: 0;
  list-style: none;
  list-style-position: outside;
`;

const Style = {
  Result: styled.div`
    margin: 16px 12px 0 12px;
  `,
  Card: styled.div`
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
  CardContent: styled.div`
    padding: 10px 6px;
  `,
  Title: styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
    color: #101518;
    line-height: 24px;
    font-size: 24px;
    font-weight: 500;
  `,
  BaseUl: baseUl,
  InlineUl: styled(baseUl)`
    li {
      display: inline-block;
      font-size: 14px;
      margin-right: 10px;
      vertical-align: top;
    }
  `,
  Phonetic: styled.div`
    margin-bottom: 10px;
  `,
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