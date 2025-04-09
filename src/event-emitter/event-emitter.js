// Створити клас Chat, який наслідує EventEmitter, і має подію message
// chat.send('Привіт') → має викликати 'message' з переданим текстом

const EventEmitter = require('events');

class Chat extends EventEmitter {
  constructor() {
    super();
  }

  send(messageText) {
    this.emit('message', messageText);
  }
}



// Використання:
const chat = new Chat();

chat.on('message', (text) => {
  console.log(`Отримано повідомлення: ${text}`);
});

chat.send('Повітряна тривога');
chat.send('Відбій тривоги');