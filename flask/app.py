from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('message')
def message(data):
    print('test', data)

if __name__ == '__main__':
    socketio.run(app)