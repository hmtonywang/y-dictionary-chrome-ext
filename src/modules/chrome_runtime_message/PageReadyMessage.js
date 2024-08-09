import Message from './Message';

class PageReadyMessage extends Message {
  static TITLE = 'OPEN_PAGE';
  constructor(object = {}) {
    object.title = PageReadyMessage.TITLE;
    super(object);
  }
}

export default PageReadyMessage;