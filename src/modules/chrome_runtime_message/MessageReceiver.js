import Message from './Message';

class MessageReceiver {
  #chrome;
  #listeningList = [];
  
  constructor(chrome) {
    if (!chrome) {
      throw new TypeError('Missing required parameter in constructor of MessageReceiver');
    }
    if (!chrome.runtime || !chrome.runtime.onMessage || !chrome.runtime.onMessage.addListener || typeof chrome.runtime.onMessage.addListener !== 'function') {
      throw new TypeError('The passed parameter must have the .runtime.onMessage.addListener() function');
    }
    this.#chrome = chrome;
  }

  listen(MessageClass, callback) {
    const isMessageClass = MessageClass.prototype instanceof Message || MessageClass === Message;
    if (!isMessageClass) {
      throw new TypeError('The first argument must be a subclass of Message');
    }
    if (callback && typeof callback !== 'function') {
      throw new TypeError('The second argument must be a callback function or undefined');
    }
    this.#listeningList.push([MessageClass, callback]);
    return this;
  }

  start() {
    if (this.#listeningList.length === 0) {
      throw new Error('Not listening to any message');
    }
    this.#chrome.runtime.onMessage.addListener((serializedMessage, sender, sendResponse) => {
      this.#listeningList.forEach(([MessageClass, callback]) => {
        if (serializedMessage._class === MessageClass.name) {
          const message = new MessageClass(serializedMessage);
          if (callback) {
            const payload = callback(message, sender);
            if (typeof payload !== 'undefined') {
              message.setPayload(payload);
            }
          }
          sendResponse(message.serialize());
        }
      });
    });
  }
}

export default MessageReceiver;