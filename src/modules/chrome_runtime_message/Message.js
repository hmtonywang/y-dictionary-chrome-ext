import { v4 } from 'uuid';

class Message {
  #app;
  #title;
  #payload;
  #id;

  constructor(object = {}) {
    const { id, app, title, payload } = object;
    if (id) {
      if (typeof id !== 'string') {
        throw new TypeError('The id field of message must be a string');
      }
      this.#id = id;
    } else {
      this.#id = v4();
    }
    if (app) {
      if (typeof app !== 'string') {
        throw new TypeError('The app field of message must be a string');
      }
      this.#app = app;
    }
    if (title) {
      if (typeof title !== 'string') {
        throw new TypeError('The title field of message must be a string');
      }
      this.#title = title;
    }
    if (payload) {
      this.setPayload(payload);
    }
  }

  getId() {
    return this.#id;
  }

  getApp() {
    return this.#app;
  }

  getTitle() {
    return this.#title;
  }

  getPayload() {
    return this.#payload;
  }

  setPayload(payload) {
    this.#payload = payload;
  }

  match(message) {
    if (!message) {
      return false;
    }
    const isMessage = message instanceof Message;
    let id;
    let app;
    let title;
    if (!isMessage) {
      id = message.id;
      app = message.app;
      title = message.title;
    } else {
      id = message.getId();
      app = message.getApp();
      title = message.getTitle();
    }
    return id === this.#id && app === this.#app && title === this.#title;
  }

  serialize() {
    let serializedPayload;
    if (typeof this.#payload !== 'undefined') {
      try {
        serializedPayload = JSON.parse(JSON.stringify(this.#payload));
      } catch (error) {
        console.error(error);
      }
    }
    return {
      _class: this.constructor.name,
      id: this.#id,
      app: this.#app,
      title: this.#title,
      payload: serializedPayload
    };
  }
}

export default Message;