import Message from '../../../../src/modules/chrome_runtime_message/Message';
import MessageSender from '../../../../src/modules/chrome_runtime_message/MessageSender';

describe('Test MessageSender', () => {
  test('should throw an error if no parameter is passed when creating an instance', () => {
    const createInstance = () => {
      new MessageSender();
    };
    expect(createInstance).toThrow();
  });

  test('should throw an error if an invalid parameter is passed when creating an instance', () => {
    const mockChrome = {};
    const createInstance = () => {
      new MessageSender(mockChrome);
    };
    expect(createInstance).toThrow();
  });

  test('should create an instance with a send method', () => {
    const mockChrome = {
      runtime: {
        sendMessage: () => {}
      }
    };
    const messageSender = new MessageSender(mockChrome);
    expect(messageSender).toHaveProperty('send');
    expect(typeof messageSender.send).toBe('function');
  });

  test('should throw an error if a parameter which is not a Message is passed into the send method', async () => {
    const mockChrome = {
      runtime: {
        sendMessage: () => {}
      }
    };
    const messageSender = new MessageSender(mockChrome);
    await expect(messageSender.send()).rejects.toThrow();
  });

  test('should throw an error if not getting a response after calling the send method', async () => {
    const mockChrome = {
      runtime: {
        sendMessage: () => {}
      }
    };
    const messageSender = new MessageSender(mockChrome);
    const message = new Message();
    await expect(messageSender.send(message)).rejects.toThrow();
  });

  test('should throw an error if the response does not match the sent message', async () => {
    const mockResponse = {};
    const mockChrome = {
      runtime: {
        sendMessage: () => mockResponse
      }
    };
    const messageSender = new MessageSender(mockChrome);
    const message = new Message();
    await expect(messageSender.send(message)).rejects.toThrow();
  });

  test('should return the response', async () => {
    const message = new Message();
    const mockResponse = message;
    const mockChrome = {
      runtime: {
        sendMessage: () => mockResponse
      }
    };
    const messageSender = new MessageSender(mockChrome);
    await expect(messageSender.send(message)).resolves.toBe(message);
  });
});