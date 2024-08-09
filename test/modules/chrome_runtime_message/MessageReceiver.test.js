import Message from '../../../src/modules/chrome_runtime_message/Message';
import MessageReceiver from '../../../src/modules/chrome_runtime_message/MessageReceiver';

describe('Test MessageReceiver', () => {
  test('should throw an error if no parameter is passed when creating an instance', () => {
    const createInstance = () => {
      new MessageReceiver();
    };
    expect(createInstance).toThrow();
  });

  test('should throw an error if an invalid parameter is passed when creating an instance', () => {
    const mockChrome = {};
    const createInstance = () => {
      new MessageReceiver(mockChrome);
    };
    expect(createInstance).toThrow();
  });

  test('should create an instance with a listen method and a start method', () => {
    const mockChrome = {
      runtime: {
        onMessage: {
          addListener: () => {}
        }
      }
    };
    const messageReceiver = new MessageReceiver(mockChrome);
    expect(messageReceiver).toHaveProperty('listen');
    expect(typeof messageReceiver.listen).toBe('function');
    expect(messageReceiver).toHaveProperty('start');
    expect(typeof messageReceiver.start).toBe('function');
  });

  test('should throw an error if a parameter which is not a Message is passed into the listen method', () => {
    const mockChrome = {
      runtime: {
        onMessage: {
          addListener: () => {}
        }
      }
    };
    const messageReceiver = new MessageReceiver(mockChrome);
    const listen = () => {
      return messageReceiver.listen();
    };
    expect(listen).toThrow();
  });

  test('should throw an error if not listening to any message', () => {
    const mockChrome = {
      runtime: {
        onMessage: {
          addListener: () => {}
        }
      }
    };
    const messageReceiver = new MessageReceiver(mockChrome);
    expect(messageReceiver.start).toThrow();
  });

  test('should pass the message to callback', () => {
    const mockMessage = new Message();
    const mockSender = {};
    const fakeSendResponse = () => {};
    const mockChrome = {
      runtime: {
        onMessage: {
          addListener: (listener) => listener(mockMessage.serialize(), mockSender, fakeSendResponse)
        }
      }
    };
    const fakeCallback = jest.fn().mockImplementation((message, sender) => {
      const id = message.getId();
      const mockId = mockMessage.getId();
      expect(id).toBe(mockId);
      expect(sender).toBe(mockSender);
    });
    const messageReceiver = new MessageReceiver(mockChrome);
    messageReceiver.listen(Message, fakeCallback).start();
    expect(fakeCallback).toBeCalledTimes(1);
  });
});