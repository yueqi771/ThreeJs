class Event {
    constructor(sender) {
        this._sender = sender;
        this._listeners = [];
    }

    attach(callback) {
        this._listeners.push(callback)
    }

    notify(args) {
        for(var i = 0; i < this._listeners.length; i++ ){
            this._listeners[i](sender, args)
        }
    }
}

export default Event;