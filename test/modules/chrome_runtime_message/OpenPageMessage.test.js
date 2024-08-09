import Message from '../../../src/modules/chrome_runtime_message/Message';
import OpenPageMessage from '../../../src/modules/chrome_runtime_message/OpenPageMessage';

describe('Test OpenPageMessage', () => {
  test('should create a message', () => {
    const message = new OpenPageMessage();
    const isMessage = message instanceof Message;
    expect(isMessage).toBe(true);
  });

  test('should create a message with immutable title', () => {
    const title = 'this is a title';
    const message = new OpenPageMessage({ title });
    const messageTitle = message.getTitle();
    expect(messageTitle).toBe(OpenPageMessage.TITLE);
  });

  test('should serialize message to an object with the correct _class field', () => {
    const message = new OpenPageMessage();
    const serializedMessage = message.serialize();
    expect(serializedMessage).toHaveProperty('_class');
    expect(typeof serializedMessage._class).toBe('string');
    expect(serializedMessage._class).toBe(OpenPageMessage.name);
  });
});