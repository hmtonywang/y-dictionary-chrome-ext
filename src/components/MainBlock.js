import PropTypes from 'prop-types';
import styled from 'styled-components';
import Block from './Block';
import BaseUl from './BaseUl';
import InlineUl from './InlineUl';
import Explanations from './Explanations';
import Pos from './Pos';

const MainBlock = (props) => {
  const { value, notes } = props;
  return (
    <Block
      title={value.title}
      notes={notes && notes.length > 0
        ? (
          <Style.Notes>
            <BaseUl items={notes} />
          </Style.Notes>
        )
        : null
      }
    >
      {value.phonetic && value.phonetic.length > 0 && (
        <Style.Phonetic>
          <InlineUl items={value.phonetic} />
        </Style.Phonetic>
      )}
      {value.explanations && value.explanations.length > 0 && (
        <Explanations
          items={value.explanations.map((item) => (
            <div>
              {item.pos && <Pos value={item.pos} />}
              <span>{item.explanation}</span>
            </div>
          ))}
        />
      )}
    </Block>
  );
};

MainBlock.propTypes = {
  value: PropTypes.func.isRequired,
  notes: PropTypes.array,
};

const Style = {
  Phonetic: styled.div`
    margin-bottom: 10px;
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
};

export default MainBlock;