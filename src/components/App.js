import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import api from '../api';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const INITIAL_STATE = {
  text: '',
  result: undefined,
  loading: false,
  error: undefined,
};

const ACTIONS = {
  TEXT: 'TEXT',
  LOOKUP: {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ACTIONS.LOOKUP.REQUEST:
      return {
        ...state,
        text: action.text,
        loading: true,
        result: undefined,
        error: undefined,
      };
    case ACTIONS.LOOKUP.SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.result,
      };
    case ACTIONS.LOOKUP.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  } 
};

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.text
      ? { ...INITIAL_STATE, text: props.text }
      : INITIAL_STATE);
  useEffect(() => {
    if (state.text) {
      lookup(state.text);
    }
    // eslint-disable-next-line
  }, []);
  const setText = (text) => {
    return dispatch({ type: 'TEXT', text });
  };
  const onClickOtherText = (text) => {
    if (text === state.text || state.loading) {
      return;
    }
    lookup(text);
  };
  const lookup = async (text) => {
    if (!text || state.loading) {
      return;
    }
    dispatch({ type: ACTIONS.LOOKUP.REQUEST, text });
    try {
      const result = await api.lookup(text);
      dispatch({ type: ACTIONS.LOOKUP.SUCCESS, result });
    } catch (error) {
      dispatch({ type: ACTIONS.LOOKUP.ERROR, error });
    }
  };
  return (
    <div id='app'>
      <Header
        text={state.text}
        onChange={setText}
        onSubmit={lookup}
        onClose={props.onClose}
      />
      <Body
        loading={state.loading}
        result={state.result}
        onClickOtherText={onClickOtherText}
      />
      <Footer />
    </div>
  );
};

App.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default App;