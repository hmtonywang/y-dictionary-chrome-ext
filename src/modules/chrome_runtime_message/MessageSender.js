import Message from './Message';

class MessageSender {
  #chrome;
  
  constructor(chrome) {
    if (!chrome) {
      throw new TypeError('Missing required parameter in constructor of MessageSender');
    }
    if (!chrome.runtime || !chrome.runtime.sendMessage || typeof chrome.runtime.sendMessage !== 'function') {
      throw new TypeError('The passed parameter must have the .runtime.sendMessage() function');
    }
    this.#chrome = chrome;
  }

  async send(message) {
    const isMessage = message instanceof Message;
    if (!isMessage) {
      throw new TypeError('The input message must be an instance of Message');
    }
    const serializedMessage = message.serialize();
    const res = await this.#chrome.runtime.sendMessage(serializedMessage);
    if (!res) {
      throw new Error(this.#chrome.runtime.lastError
        ? this.#chrome.runtime.lastError.message
        : 'No response received');
    }
    if (!message.match(res)) {
      throw new Error('Response does not match the sent message');
    }
    return res;
  }
}

export default MessageSender;