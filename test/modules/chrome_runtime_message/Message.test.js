import Message from '../../../src/modules/chrome_runtime_message/Message';

describe('Test Message', () => {
  test('should create an instance with a random id', () => {
    const message = new Message();
    const messageId = message.getId();
    expect(typeof messageId).toBe('string');
  });

  test('should create an instance with a specific id', () => {
    const id = 'this is a id';
    const message = new Message({ id });
    const messageId = message.getId();
    expect(messageId).toBe(id);
  });

  test('should create an instance with a serialize method', () => {
    const message = new Message();
    expect(message).toHaveProperty('serialize');
    expect(typeof message.serialize).toBe('function');
  });

  test('should create an instance with a match method', () => {
    const message = new Message();
    expect(message).toHaveProperty('match');
    expect(typeof message.match).toBe('function');
  });

  test('should create an instance with specific properties', () => {
    const id = 'this is a id';
    const app = 'this is app id';
    const title = 'this is a title';
    const payload = 'this is payload';
    const message = new Message({
      id,
      app,
      title,
      payload
    });
    const messageId = message.getId();
    const messageApp = message.getApp();
    const messageTitle = message.getTitle();
    const messagePayload = message.getPayload();
    expect(messageId).toBe(id);
    expect(messageApp).toBe(app);
    expect(messageTitle).toBe(title);
    expect(messagePayload).toBe(payload);
  });

  test('should serialize message to a JSON-ifiable object', () => {
    const id = 'this is a id';
    const app = 'this is app id';
    const title = 'this is a title';
    const payload = 'this is payload';
    const message = new Message({
      id,
      app,
      title,
      payload
    });
    const serializedMessage = message.serialize();
    expect(serializedMessage).toHaveProperty('id');
    expect(serializedMessage.id).toBe(id);
    expect(serializedMessage).toHaveProperty('app');
    expect(serializedMessage.app).toBe(app);
    expect(serializedMessage).toHaveProperty('title');
    expect(serializedMessage.title).toBe(title);
    expect(serializedMessage).toHaveProperty('payload');
    expect(serializedMessage.payload).toBe(payload);
    expect(serializedMessage).toHaveProperty('_class');
    expect(typeof serializedMessage._class).toBe('string');
    expect(serializedMessage._class).toBe(Message.name);
  });

  test('should match', () => {
    const id = 'this is a id';
    const app = 'this is app id';
    const title = 'this is a title';
    const message1 = new Message({
      id,
      app,
      title
    });
    const message2 = new Message({
      id,
      app,
      title
    });
    expect(message1.match(message1.serialize())).toBe(true);
    expect(message2.match(message2.serialize())).toBe(true);
    expect(message1.match(message2)).toBe(true);
    expect(message1.match(message2.serialize())).toBe(true);
    expect(message2.match(message1.serialize())).toBe(true);
  });

  test('should not match', () => {
    const id = 'this is a id';
    const app = 'this is app id';
    const title = 'this is a title';
    const message1 = new Message({
      id,
      app,
      title
    });
    const message2 = new Message({
      app,
      title
    });
    const message3 = new Message({ id });
    expect(message1.match()).toBe(false);
    expect(message1.match(message2)).toBe(false);
    expect(message2.match(message3)).toBe(false);
    expect(message3.match(message1)).toBe(false);
  });
});