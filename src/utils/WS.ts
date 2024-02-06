import constants from './../constants';

export type IOldMessage = {
  offset: number;
};
export type IWebSocket = {
  userId: number;
  chatId: number;
  token: string;
};

enum WebSockets {
  OPEN = 'open',
  MESSAGE = 'message',
  ERROR = 'error',
  CLOSE = 'close',
  PING = 'ping',
  OLD = 'get old',
}

class MessageService {
  private _webSocket!: WebSocket;
  private _chatId!: number;
  private _userId!: number;
  private _pingInterval: NodeJS.Timeout | number;
  private _token!: string;

  constructor() {
    this._pingInterval = constants.PING_INTERVAL;
  }

  public getMessages(options: IOldMessage) {
    this._webSocket.send(
      JSON.stringify({
        content: options.offset.toString(),
        type: WebSockets.OLD,
      }),
    );
  }

  public connect(options: IWebSocket) {
    this._chatId = options.chatId;
    this._userId = options.userId;
    this._token = options.token;
    this._webSocket = new WebSocket(`${constants.WS}/${options.userId}/${options.chatId}/${options.token}`);
    this._subscribe();
  }

  public disconnect() {
    clearInterval(this._pingInterval);
    this._webSocket.close();
    this._unsubscribe();
  }

  public sendMessage(message: string) {
    this._webSocket.send(
      JSON.stringify({
        content: message,
        type: WebSockets.MESSAGE,
      }),
    );
  }

  private _subscribe() {
    this._webSocket.addEventListener(WebSockets.OPEN, this._handleOpen);
    this._webSocket.addEventListener(WebSockets.CLOSE, this._handleClose);
    this._webSocket.addEventListener(WebSockets.MESSAGE, this._handleMessage);
    this._webSocket.addEventListener(WebSockets.ERROR, this._handleError);
  }

  private _unsubscribe() {
    this._webSocket.removeEventListener(WebSockets.OPEN, this._handleOpen);
    this._webSocket.removeEventListener(WebSockets.CLOSE, this._handleClose);
    this._webSocket.removeEventListener(WebSockets.MESSAGE, this._handleMessage);
    this._webSocket.removeEventListener(WebSockets.ERROR, this._handleError);
  }

  private readonly _handleMessage = (e: MessageEvent) => {
    try {
      const data = JSON.parse(e.data);
      if (Array.isArray(data)) {
        if (!data.length) {
          window.store.set({ messages: [] });
        } else if (data[0].id === 0) {
          window.store.set({ messages: data });
        } else {
          const messages = [...data];
          window.store.set({ messages: messages });
        }
      } else if (typeof data === 'object' && data.type === 'message') {
        const messages = [data, ...window.store.getState().messages];
        window.store.set({ messages: messages });
      }
    } catch (error) {
      console.error('Ошибка при обработке данных:', error);
    }
  };
  private readonly _handleOpen = () => {
    this.getMessages({ offset: 0 });
    this._pingInterval = setInterval(() => {
      this._webSocket.send(
        JSON.stringify({
          type: WebSockets.PING,
        }),
      );
    }, constants.PING_INTERVAL);
  };
  private readonly _handleError = (e: Event) => {
    const errorEvent = e as ErrorEvent;
    console.error('Ошибка в WebSocket:', errorEvent.message);
  };
  private readonly _handleClose = (e: CloseEvent) => {
    this._unsubscribe();
    if (e.code === 1006) {
      this._reconnect();
    }
    if (e.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
    console.log(`Код: ${e.code} | Причина: ${e.reason}`);
  };

  private _reconnect() {
    this.connect({
      token: this._token,
      userId: this._userId,
      chatId: this._chatId,
    });
  }
}

export default MessageService;
