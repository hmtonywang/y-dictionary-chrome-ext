import Message from '../../../src/modules/chrome_runtime_message/Message';
import PageReadyMessage from '../../../src/modules/chrome_runtime_message/PageReadyMessage';

describe('Test PageReadyMessage', () => {
  test('should create a message', () => {
    const message = new PageReadyMessage();
    const isMessage = message instanceof Message;
    expect(isMessage).toBe(true);
  });

  test('should create a message with immutable title', () => {
    const title = 'this is a title';
    const message = new PageReadyMessage({ title });
    const messageTitle = message.getTitle();
    expect(messageTitle).toBe(PageReadyMessage.TITLE);
  });

  test('should serialize message to an object with the correct _class field', () => {
    const message = new PageReadyMessage();
    const serializedMessage = message.serialize();
    expect(serializedMessage).toHaveProperty('_class');
    expect(typeof serializedMessage._class).toBe('string');
    expect(serializedMessage._class).toBe(PageReadyMessage.name);
  });
});