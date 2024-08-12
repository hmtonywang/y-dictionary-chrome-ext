import Message from '../../../../src/modules/chrome_runtime_message/Message';
import LookWordsUpMessage from '../../../../src/modules/chrome_runtime_message/LookWordsUpMessage';

describe('Test LookWordsUpMessage', () => {
  test('should create a message', () => {
    const message = new LookWordsUpMessage();
    const isMessage = message instanceof Message;
    expect(isMessage).toBe(true);
  });

  test('should create a message with immutable title', () => {
    const title = 'this is a title';
    const message = new LookWordsUpMessage({ title });
    const messageTitle = message.getTitle();
    expect(messageTitle).toBe(LookWordsUpMessage.TITLE);
  });

  test('should serialize message to an object with the correct _class field', () => {
    const message = new LookWordsUpMessage();
    const serializedMessage = message.serialize();
    expect(serializedMessage).toHaveProperty('_class');
    expect(typeof serializedMessage._class).toBe('string');
    expect(serializedMessage._class).toBe(LookWordsUpMessage.name);
  });
});