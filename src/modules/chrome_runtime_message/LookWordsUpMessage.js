import Message from './Message';

class LookWordsUpMessage extends Message {
  static TITLE = 'LOOK_WORDS_UP';
  constructor(object = {}) {
    object.title = LookWordsUpMessage.TITLE;
    super(object);
  }
}

export default LookWordsUpMessage;