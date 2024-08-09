import Message from './Message';

class OpenPageMessage extends Message {
  static TITLE = 'OPEN_PAGE';
  constructor(object = {}) {
    object.title = OpenPageMessage.TITLE;
    super(object);
  }
}

export default OpenPageMessage;