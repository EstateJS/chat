import {createUuid, saveData, sendMessage, Message, Data, Worker} from "./estate-runtime";

class User extends Data {
    constructor(name) {
        super(name);
        this._creationDate = new Date();
        this._history = [];
        this._activeChannel = null;
        this._chatServer = null;
    }
    get creationDate() { return this._creationDate; }
    get history() { return this._history; }
    get chatServer() {
        return this._chatServer;
    }
    set chatServer(value) {
        this._chatServer = value;
    }
    setServer(chatServer) {
        this._chatServer = chatServer;
    }

}

class ChatServer extends Worker {
    constructor(name) {
        super(name);
        this._history = [];
    }

    say(userName, text) {
        const chatText = new ChatEntry(userName, text);
        this._history.push(chatText);
        saveData(chatText); // Save data object to datastore
        sendMessage(this, new ChatTextSaid(chatText)); // Send SSE to listening clients
    }

    getHistory() {
        return this._history;
    }

    getTime() {
        return new Date();
    }
}

class ChatEntry extends Data {
    constructor(userName, text) {
        super(createUuid());
        this._userName = userName;
        this._text = text;
        this._timestamp = new Date();
    }
    get userName() {
        return this._userName;
    }
    get timestamp() {
        return this._timestamp;
    }
    get text() {
        return this._text;
    }
}

class ChatMessage extends Message {
    constructor(chatText) {
        super();
        this._chatText = chatText;
    }
    get chatText() {
        return this._chatText;
    }
}